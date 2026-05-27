// ================================
// 🎨 粒子系统 (V1)
// ================================
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 30;

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 1.5 + 0.5;
    this.speedX = Math.random() * 0.3 - 0.15;
    this.speedY = Math.random() * 0.3 - 0.15;
    this.opacity = Math.random() * 0.4 + 0.1;
    this.color = Math.random() > 0.5 ? '#00d9ff' : '#ff006e';
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x > canvas.width) this.x = 0;
    if (this.x < 0) this.x = canvas.width;
    if (this.y > canvas.height) this.y = 0;
    if (this.y < 0) this.y = canvas.height;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.opacity;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

for (let i = 0; i < particleCount; i++) {
  particles.push(new Particle());
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animateParticles);
}

animateParticles();

// ================================
// 🎯 鼠标光晕 (V1)
// ================================
const cursorGlow = document.querySelector('.cursor-glow');

document.addEventListener('mousemove', (e) => {
  requestAnimationFrame(() => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
  });
});

if ('ontouchstart' in window) {
  cursorGlow.style.display = 'none';
}

// ================================
// 📱 导航栏（节流）
// ================================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

let lastScroll = 0;
let scrollTicking = false;

window.addEventListener('scroll', () => {
  if (!scrollTicking) {
    requestAnimationFrame(() => {
      const currentScroll = window.pageYOffset;
      navbar.classList.toggle('scrolled', currentScroll > 100);

      if (currentScroll > lastScroll && currentScroll > 500) {
        navbar.style.transform = 'translateY(-100%)';
      } else {
        navbar.style.transform = 'translateY(0)';
      }

      lastScroll = currentScroll;

      let current = '';
      document.querySelectorAll('section[id]').forEach(section => {
        const top = section.offsetTop - 100;
        const h = section.clientHeight;
        if (window.pageYOffset >= top && window.pageYOffset < top + h) {
          current = section.getAttribute('id');
        }
      });
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
      });

      scrollTicking = false;
    });
    scrollTicking = true;
  }
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
  document.body.style.overflow = hamburger.classList.contains('active') ? 'hidden' : '';
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
  });
});

document.addEventListener('click', (e) => {
  if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// ================================
// 🌙 主题切换
// ================================
const themeToggle = document.getElementById('theme-toggle');

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  document.body.classList.add('light-mode');
  themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  const theme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
  localStorage.setItem('theme', theme);
  themeToggle.innerHTML = document.body.classList.contains('light-mode')
    ? '<i class="fas fa-sun"></i>'
    : '<i class="fas fa-moon"></i>';
});

// ================================
// 🌐 多语言切换 (V2)
// ================================
const i18n = {
  zh: {
    'nav-categories': '分類',
    'nav-featured': '本月主打',
    'nav-stories': '故事',
    'nav-creators': '設計師',
    'nav-newsletter': '訂閱',
    'hero-badge': '香港記憶 · 文化企劃',
    'hero-cta-explore': '探索藏品',
    'hero-cta-stories': '聽故仔',
    'typing-text': '每件產品背後，都有一個消失中的香港',
    'stat-items': '藏品',
    'stat-supporters': '支持者',
    'stat-rating': '好評 %',
    'section-categories-tag': '分類探索',
    'section-categories-title-accent': '一段香港故事',
    'section-categories-subtitle': '呢啲嘢，唔係為咗賣，係為咗記住。',
    'card-tag': '件藏品',
    'section-featured-tag': '本月主打',
    'section-featured-title-accent': '最後的招牌',
    'section-featured-subtitle': '香港霓虹燈嘅最後一瞥——限量手工鑄造複製品',
    'product-badge': '限量 500 件',
    'product-title': '霓虹·最後的招牌',
    'feature-handmade': '手工吹製玻璃霓虹管',
    'feature-vintage': '還原 1960 年代原有設計',
    'feature-certificate': '每件附獨立編號 + 真品證書',
    'feature-donation': '部分收益捐贈霓虹保育基金',
    'progress-label': '眾籌進度',
    'progress-raised': '已籌: <strong>HK$372,000</strong>',
    'progress-target': '目標: <strong>HK$200,000</strong>',
    'progress-left': '剩餘: <strong>12 日</strong>',
    'price-label': '限量預購價',
    'btn-preorder': '立即預購',
    'section-stories-tag': '香港故事',
    'section-stories-title-accent': '香港記憶',
    'section-stories-subtitle': '每個人都有一段屬於自己嘅香港故事',
    'btn-share-story': '分享你嘅故事',
    'section-creators-tag': '設計師合作',
    'section-creators-title-accent': '香港設計師',
    'creators-desc': '我哋邀請本地設計師同藝術家，將香港記憶轉化為實體產品。每個作品背後都有一個故事，每條線條都係對呢座城市嘅情感。',
    'feature-share-title': '分享你嘅香港記憶',
    'feature-share-desc': '提交一段你對香港某個事物嘅回憶，可以係文字、相片或者錄音。',
    'feature-design-title': '設計師重新演繹',
    'feature-design-desc': '我哋嘅合作設計師會將你嘅記憶轉化為一件產品設計。',
    'feature-limited-title': '限量生產·永久保存',
    'feature-limited-desc': '每件產品限量製作，部分收益用於香港文化保育。',
    'btn-become-designer': '成為設計師',
    'btn-learn-more': '了解更多',
    'newsletter-title': '留住香港記憶',
    'newsletter-desc': '每月收到最新藏品故事同設計師作品資訊',
    'newsletter-placeholder': '輸入你嘅電郵地址',
    'btn-subscribe': '訂閱',
    'footer-desc': '呢啲嘢，唔係為咗賣，係為咗記住。<br />一個記錄香港記憶嘅文化企劃。',
    'footer-explore': '探索',
    'footer-all-items': '全部藏品',
    'footer-categories': '分類',
    'footer-featured': '本月主打',
    'footer-preorder': '限量預購',
    'footer-about': '關於',
    'footer-our-story': '我哋嘅故事',
    'footer-designers': '設計師合作',
    'footer-fund': '保育基金',
    'footer-faq': '常見問題',
    'footer-support': '支援',
    'footer-contact': '聯絡我哋',
    'footer-shipping': '運送資訊',
    'footer-returns': '退換政策',
    'footer-privacy': '私隱條款',
    'footer-quote': '「每件產品背後，都有一個消失中的香港」',
    'subscribed': '已訂閱！',
  },
  cn: {
    'nav-categories': '分类',
    'nav-featured': '本月主打',
    'nav-stories': '故事',
    'nav-creators': '设计师',
    'nav-newsletter': '订阅',
    'hero-badge': '香港记忆 · 文化企划',
    'hero-cta-explore': '探索藏品',
    'hero-cta-stories': '听故事',
    'typing-text': '每件产品背后，都有一个正在消失的香港',
    'stat-items': '藏品',
    'stat-supporters': '支持者',
    'stat-rating': '好评 %',
    'section-categories-tag': '分类探索',
    'section-categories-title-accent': '一段香港故事',
    'section-categories-subtitle': '这些东西，不是为了卖，而是为了记住。',
    'card-tag': '件藏品',
    'section-featured-tag': '本月主打',
    'section-featured-title-accent': '最后的招牌',
    'section-featured-subtitle': '香港霓虹灯的最后一瞥——限量手工铸造复制品',
    'product-badge': '限量 500 件',
    'product-title': '霓虹·最后的招牌',
    'feature-handmade': '手工吹制玻璃霓虹管',
    'feature-vintage': '还原 1960 年代原有设计',
    'feature-certificate': '每件附独立编号 + 真品证书',
    'feature-donation': '部分收益捐赠霓虹保育基金',
    'progress-label': '众筹进度',
    'progress-raised': '已筹: <strong>HK$372,000</strong>',
    'progress-target': '目标: <strong>HK$200,000</strong>',
    'progress-left': '剩余: <strong>12 天</strong>',
    'price-label': '限量预购价',
    'btn-preorder': '立即预购',
    'section-stories-tag': '香港故事',
    'section-stories-title-accent': '香港记忆',
    'section-stories-subtitle': '每个人都有一段属于自己的香港故事',
    'btn-share-story': '分享你的故事',
    'section-creators-tag': '设计师合作',
    'section-creators-title-accent': '香港设计师',
    'creators-desc': '我们邀请本地设计师和艺术家，将香港记忆转化为实体产品。每个作品背后都有一个故事，每条线条都是对这座城市的情感。',
    'feature-share-title': '分享你的香港记忆',
    'feature-share-desc': '提交一段你对香港某个事物的回忆，可以是文字、照片或者录音。',
    'feature-design-title': '设计师重新演绎',
    'feature-design-desc': '我们的合作设计师会将你的记忆转化为一件产品设计。',
    'feature-limited-title': '限量生产·永久保存',
    'feature-limited-desc': '每件产品限量制作，部分收益用于香港文化保育。',
    'btn-become-designer': '成为设计师',
    'btn-learn-more': '了解更多',
    'newsletter-title': '留住香港记忆',
    'newsletter-desc': '每月收到最新藏品故事和设计师作品资讯',
    'newsletter-placeholder': '输入你的邮箱地址',
    'btn-subscribe': '订阅',
    'footer-desc': '这些东西，不是为了卖，而是为了记住。<br />一个记录香港记忆的文化企划。',
    'footer-explore': '探索',
    'footer-all-items': '全部藏品',
    'footer-categories': '分类',
    'footer-featured': '本月主打',
    'footer-preorder': '限量预购',
    'footer-about': '关于',
    'footer-our-story': '我们的故事',
    'footer-designers': '设计师合作',
    'footer-fund': '保育基金',
    'footer-faq': '常见问题',
    'footer-support': '支持',
    'footer-contact': '联系我们',
    'footer-shipping': '运送信息',
    'footer-returns': '退换政策',
    'footer-privacy': '隐私条款',
    'footer-quote': '「每件产品背后，都有一个正在消失的香港」',
    'subscribed': '已订阅！',
  },
  en: {
    'nav-categories': 'Categories',
    'nav-featured': 'Featured',
    'nav-stories': 'Stories',
    'nav-creators': 'Designers',
    'nav-newsletter': 'Subscribe',
    'hero-badge': 'Hong Kong Memory · Cultural Project',
    'hero-cta-explore': 'Explore',
    'hero-cta-stories': 'Hear Stories',
    'typing-text': 'Behind every piece is a disappearing Hong Kong',
    'stat-items': 'Items',
    'stat-supporters': 'Supporters',
    'stat-rating': 'Approval %',
    'section-categories-tag': 'Categories',
    'section-categories-title-accent': 'A Hong Kong Story',
    'section-categories-subtitle': 'These things are not for selling — they are for remembering.',
    'card-tag': 'items',
    'section-featured-tag': 'Featured',
    'section-featured-title-accent': 'The Last Sign',
    'section-featured-subtitle': 'Hong Kong neon\'s last glance — limited handmade replica',
    'product-badge': 'Limited 500 pcs',
    'product-title': 'Neon · The Last Sign',
    'feature-handmade': 'Hand-blown glass neon tube',
    'feature-vintage': 'Recreated 1960s original design',
    'feature-certificate': 'Each piece numbered + certificate of authenticity',
    'feature-donation': 'Partial proceeds donated to neon conservation fund',
    'progress-label': 'Crowdfunding',
    'progress-raised': 'Raised: <strong>HK$372,000</strong>',
    'progress-target': 'Goal: <strong>HK$200,000</strong>',
    'progress-left': 'Left: <strong>12 days</strong>',
    'price-label': 'Limited Pre-order',
    'btn-preorder': 'Pre-order Now',
    'section-stories-tag': 'Stories',
    'section-stories-title-accent': 'Hong Kong Memory',
    'section-stories-subtitle': 'Everyone has a Hong Kong story of their own',
    'btn-share-story': 'Share Your Story',
    'section-creators-tag': 'Designers',
    'section-creators-title-accent': 'Hong Kong Designers',
    'creators-desc': 'We invite local designers and artists to transform Hong Kong memories into physical products. Behind each piece is a story, every line an emotion for this city.',
    'feature-share-title': 'Share Your Memory',
    'feature-share-desc': 'Submit a memory about Hong Kong — text, photo, or voice recording.',
    'feature-design-title': 'Designer Reimagines',
    'feature-design-desc': 'Our partner designers turn your memory into a product design.',
    'feature-limited-title': 'Limited Edition · Forever Preserved',
    'feature-limited-desc': 'Each product is limited edition, with proceeds supporting Hong Kong cultural conservation.',
    'btn-become-designer': 'Become a Designer',
    'btn-learn-more': 'Learn More',
    'newsletter-title': 'Preserve Hong Kong',
    'newsletter-desc': 'Monthly updates on new collection stories and designer works',
    'newsletter-placeholder': 'Enter your email',
    'btn-subscribe': 'Subscribe',
    'footer-desc': 'These things are not for selling — they are for remembering.<br />A cultural project documenting Hong Kong memories.',
    'footer-explore': 'Explore',
    'footer-all-items': 'All Items',
    'footer-categories': 'Categories',
    'footer-featured': 'Featured',
    'footer-preorder': 'Pre-order',
    'footer-about': 'About',
    'footer-our-story': 'Our Story',
    'footer-designers': 'Designers',
    'footer-fund': 'Conservation Fund',
    'footer-faq': 'FAQ',
    'footer-support': 'Support',
    'footer-contact': 'Contact Us',
    'footer-shipping': 'Shipping',
    'footer-returns': 'Returns',
    'footer-privacy': 'Privacy',
    'footer-quote': '"Behind every piece is a disappearing Hong Kong"',
    'subscribed': 'Subscribed!',
  },
};

const applyLanguage = (lang) => {
  const t = i18n[lang];
  if (!t) return;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) {
      el.innerHTML = t[key];
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (t[key]) {
      el.placeholder = t[key];
    }
  });

  document.querySelectorAll('[data-count]').forEach(el => {
    const count = el.getAttribute('data-count');
    const labelEl = el.closest('.stat-item')?.querySelector('.stat-label');
    if (labelEl) {
      const labelKey = labelEl.getAttribute('data-i18n');
      if (labelKey && t[labelKey]) {
        labelEl.textContent = t[labelKey];
      }
    }
  });

  const typingEl = document.getElementById('typing-text');
  if (typingEl && t['typing-text']) {
    typingEl.textContent = '';
    let index = 0;
    const text = t['typing-text'];
    function typeWriter() {
      if (index < text.length) {
        typingEl.textContent += text.charAt(index);
        index++;
        setTimeout(typeWriter, 80);
      }
    }
    setTimeout(typeWriter, 500);
  }
};

const langButtons = document.querySelectorAll('.lang-btn');

langButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    langButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const lang = btn.getAttribute('data-lang');
    localStorage.setItem('language', lang);
    document.documentElement.setAttribute('lang', lang === 'zh' ? 'zh-HK' : lang === 'cn' ? 'zh-CN' : 'en');
    applyLanguage(lang);
  });
});

const savedLang = localStorage.getItem('language') || 'zh';
langButtons.forEach(btn => {
  btn.classList.toggle('active', btn.getAttribute('data-lang') === savedLang);
});
document.documentElement.setAttribute('lang', savedLang === 'zh' ? 'zh-HK' : savedLang === 'cn' ? 'zh-CN' : 'en');
applyLanguage(savedLang);

// ================================
// 🎯 平滑锚点滚动
// ================================
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      const el = document.getElementById(href.substring(1));
      if (el) {
        window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
      }
    }
  });
});

// ================================
// ❤️ 点赞
// ================================
document.querySelectorAll('.story-like').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.classList.toggle('active');
    const icon = btn.querySelector('i');
    const span = btn.querySelector('span');
    let count = parseInt(span.textContent);
    if (btn.classList.contains('active')) {
      icon.classList.replace('far', 'fas');
      count++;
    } else {
      icon.classList.replace('fas', 'far');
      count--;
    }
    span.textContent = count;
  });
});

// ================================
// 📮 Newsletter
// ================================
const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = newsletterForm.querySelector('button');
    const orig = btn.innerHTML;
    btn.innerHTML = '<span>已訂閱！</span><i class="fas fa-check"></i>';
    btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    setTimeout(() => {
      btn.innerHTML = orig;
      btn.style.background = '';
      newsletterForm.reset();
    }, 3000);
  });
}

// ================================
// 🔢 计数器动画
// ================================
const animateCounter = (el, target) => {
  let current = 0;
  el.textContent = '0';
  const step = Math.ceil(target / 60);
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current);
    }
  }, 16);
};

const statsBar = document.querySelector('.stats-bar');
let countersDone = false;

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !countersDone) {
      document.querySelectorAll('.stat-number[data-count]').forEach(el => {
        animateCounter(el, parseInt(el.getAttribute('data-count')));
      });
      countersDone = true;
    }
  });
}, { threshold: 0.5 });

if (statsBar) statsObserver.observe(statsBar);

// ================================
// 🎠 故事轮播
// ================================
const track = document.getElementById('carousel-track');
const prevBtn = document.getElementById('carousel-prev');
const nextBtn = document.getElementById('carousel-next');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;
const totalSlides = dots.length;
let autoplay;

const startAutoplay = () => {
  stopAutoplay();
  autoplay = setInterval(() => {
    currentSlide = currentSlide < totalSlides - 1 ? currentSlide + 1 : 0;
    updateCarousel();
  }, 5000);
};

const stopAutoplay = () => {
  if (autoplay) {
    clearInterval(autoplay);
    autoplay = null;
  }
};

const updateCarousel = () => {
  const isMobile = window.innerWidth < 768;
  const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

  if (!isMobile && !isTablet) {
    track.style.transform = 'translateX(0)';
    dots.forEach((d, i) => d.classList.toggle('active', i === 0));
    return;
  }

  const offset = currentSlide * -100;
  track.style.transform = `translateX(${offset}%)`;
  dots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));

  if (prevBtn && nextBtn) {
    prevBtn.style.opacity = currentSlide === 0 ? '0.5' : '1';
    prevBtn.style.pointerEvents = currentSlide === 0 ? 'none' : 'auto';
    nextBtn.style.opacity = currentSlide === totalSlides - 1 ? '0.5' : '1';
    nextBtn.style.pointerEvents = currentSlide === totalSlides - 1 ? 'none' : 'auto';
  }
};

if (prevBtn && nextBtn) {
  prevBtn.addEventListener('click', () => { if (currentSlide > 0) { currentSlide--; updateCarousel(); } });
  nextBtn.addEventListener('click', () => { if (currentSlide < totalSlides - 1) { currentSlide++; updateCarousel(); } });
}

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => { currentSlide = i; updateCarousel(); });
});

// Keyboard
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft' && currentSlide > 0) { currentSlide--; updateCarousel(); }
  if (e.key === 'ArrowRight' && currentSlide < totalSlides - 1) { currentSlide++; updateCarousel(); }
});

// Touch swipe for mobile
let touchStartX = 0;
let touchEndX = 0;

track.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

track.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  const diff = touchStartX - touchEndX;
  if (Math.abs(diff) > 50) {
    if (diff > 0 && currentSlide < totalSlides - 1) {
      currentSlide++;
      updateCarousel();
    } else if (diff < 0 && currentSlide > 0) {
      currentSlide--;
      updateCarousel();
    }
  }
}, { passive: true });

// Autoplay
startAutoplay();

const carouselEl = document.querySelector('.stories-carousel');
if (carouselEl) {
  carouselEl.addEventListener('mouseenter', stopAutoplay);
  carouselEl.addEventListener('mouseleave', startAutoplay);
  carouselEl.addEventListener('touchstart', stopAutoplay);
  carouselEl.addEventListener('touchend', startAutoplay);
}

updateCarousel();

// ================================
// ✨ Scroll Animations (AOS)
// ================================
const aosObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('aos-animate');
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('[data-aos]').forEach(el => aosObserver.observe(el));

// ================================
// 🎬 视差（节流）
// ================================
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const scrolled = window.pageYOffset;
      const heroImage = document.querySelector('.hero-image');
      if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.2}px) scale(1.1)`;
      }
      ticking = false;
    });
    ticking = true;
  }
});

// ================================
// 🎨 3D 卡片倾斜（低性能模式）
// ================================
if (!('ontouchstart' in window)) {
  document.querySelectorAll('.category-card, .story-card, .creator-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rx = ((y - cy) / cy) * 3;
      const ry = ((x - cx) / cx) * 3;
      card.style.transform = `perspective(1000px) rotateX(${-rx}deg) rotateY(${ry}deg) translateY(-4px)`;

      const glow = card.querySelector('.card-glow');
      if (glow) {
        glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0, 217, 255, 0.15) 0%, transparent 70%)`;
      }
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// ================================
// 🖼️ 图片懒加载
// ================================
if ('IntersectionObserver' in window) {
  const imgObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.add('loaded');
        imgObserver.unobserve(img);
      }
    });
  });
  document.querySelectorAll('img[loading="lazy"]').forEach(img => imgObserver.observe(img));
}

// ================================
// 🎯 性能优化
// ================================
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.style.scrollBehavior = 'auto';
  document.querySelectorAll('[data-aos]').forEach(el => el.classList.add('aos-animate'));
}

const debounce = (fn, wait) => {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), wait); };
};

window.addEventListener('resize', debounce(() => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  updateCarousel();
}, 250));

// ================================
// 🎉 页面加载完成
// ================================
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// ================================
// 🎨 控制台彩蛋
// ================================
console.log('%c👋 Hello Designer!', 'font-size: 24px; font-weight: bold; color: #ff006e;');
console.log('%c如果你睇到呢個訊息，代表你對代碼有興趣！', 'font-size: 14px; color: #00d9ff;');
console.log('%c我哋誠邀設計師合作 💌', 'font-size: 12px; color: #a0a0b0;');
console.log('%cemail: hello@memorymosaic.hk', 'font-size: 12px; font-family: monospace; color: #ffbe0b;');

if ('performance' in window) {
  window.addEventListener('load', () => {
    setTimeout(() => {
      const entries = performance.getEntriesByType('navigation');
      if (entries.length) {
        console.log('⚡ Page Load Time:', Math.round(entries[0].loadEventEnd - entries[0].fetchStart), 'ms');
      }
    }, 0);
  });
}
