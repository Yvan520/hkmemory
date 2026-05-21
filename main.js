// ================================
// 🎨 粒子系统 (V1)
// ================================
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 50;

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedX = Math.random() * 0.5 - 0.25;
    this.speedY = Math.random() * 0.5 - 0.25;
    this.opacity = Math.random() * 0.5 + 0.2;
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
    ctx.shadowBlur = 15;
    ctx.shadowColor = this.color;
    ctx.fill();
    ctx.shadowBlur = 0;
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

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

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
// 📱 导航栏
// ================================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  navbar.classList.toggle('scrolled', currentScroll > 100);

  if (currentScroll > lastScroll && currentScroll > 500) {
    navbar.style.transform = 'translateY(-100%)';
  } else {
    navbar.style.transform = 'translateY(0)';
  }

  lastScroll = currentScroll;

  // Active nav link
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
// 🌐 语言切换
// ================================
const langButtons = document.querySelectorAll('.lang-btn');

langButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    langButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    localStorage.setItem('language', btn.getAttribute('data-lang'));
  });
});

const savedLang = localStorage.getItem('language');
if (savedLang) {
  langButtons.forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === savedLang);
  });
}

// ================================
// ⌨️ 打字机效果 (V1)
// ================================
const typingText = document.getElementById('typing-text');
const text = '每件產品背後，都有一個消失中的香港';
let index = 0;

function typeWriter() {
  if (index < text.length) {
    typingText.textContent += text.charAt(index);
    index++;
    setTimeout(typeWriter, 80);
  }
}
setTimeout(typeWriter, 1500);

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
  const step = target / 60;
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

// Autoplay
let autoplay = setInterval(() => {
  currentSlide = currentSlide < totalSlides - 1 ? currentSlide + 1 : 0;
  updateCarousel();
}, 5000);

const carousel = document.querySelector('.stories-carousel');
if (carousel) {
  carousel.addEventListener('mouseenter', () => clearInterval(autoplay));
  carousel.addEventListener('mouseleave', () => {
    autoplay = setInterval(() => {
      currentSlide = currentSlide < totalSlides - 1 ? currentSlide + 1 : 0;
      updateCarousel();
    }, 5000);
  });
}

window.addEventListener('resize', updateCarousel);
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
// 🎬 视差
// ================================
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroImage = document.querySelector('.hero-image');
  if (heroImage) {
    heroImage.style.transform = `translateY(${scrolled * 0.3}px) scale(1.15)`;
  }
});

// ================================
// 🎨 3D 卡片倾斜
// ================================
document.querySelectorAll('.category-card, .story-card, .creator-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rx = ((y - cy) / cy) * 5;
    const ry = ((x - cx) / cx) * 5;
    card.style.transform = `perspective(1000px) rotateX(${-rx}deg) rotateY(${ry}deg) translateY(-8px)`;

    const glow = card.querySelector('.card-glow');
    if (glow) {
      glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0, 217, 255, 0.2) 0%, transparent 70%)`;
    }
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

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
      const nav = performance.getEntriesByType('navigation')[0];
      console.log('⚡ Page Load Time:', Math.round(nav.loadEventEnd - nav.fetchStart), 'ms');
    }, 0);
  });
}
