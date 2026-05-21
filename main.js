// ================================
// 🎨 简洁粒子系统
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

  particles.forEach(particle => {
    particle.update();
    particle.draw();
  });

  requestAnimationFrame(animateParticles);
}

animateParticles();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// ================================
// 🎯 鼠标光晕
// ================================
const cursorGlow = document.querySelector('.cursor-glow');
let mouseX = 0;
let mouseY = 0;
let glowX = 0;
let glowY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateGlow() {
  glowX += (mouseX - glowX) * 0.1;
  glowY += (mouseY - glowY) * 0.1;

  cursorGlow.style.left = glowX + 'px';
  cursorGlow.style.top = glowY + 'px';

  requestAnimationFrame(animateGlow);
}

animateGlow();

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

  if (currentScroll > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  if (currentScroll > lastScroll && currentScroll > 500) {
    navbar.style.transform = 'translateY(-100%)';
  } else {
    navbar.style.transform = 'translateY(0)';
  }

  lastScroll = currentScroll;
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
const body = document.body;

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  body.classList.add('light-mode');
  themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

themeToggle.addEventListener('click', () => {
  body.classList.toggle('light-mode');
  const theme = body.classList.contains('light-mode') ? 'light' : 'dark';
  localStorage.setItem('theme', theme);
  themeToggle.innerHTML = body.classList.contains('light-mode')
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

    const lang = btn.getAttribute('data-lang');
    localStorage.setItem('language', lang);
  });
});

const savedLang = localStorage.getItem('language');
if (savedLang) {
  langButtons.forEach(btn => {
    if (btn.getAttribute('data-lang') === savedLang) {
      langButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    }
  });
}

// ================================
// ⌨️ 打字机效果
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
// 🎯 平滑滚动
// ================================
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');

    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    }
  });
});

const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;

    if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// ================================
// ❤️ 点赞功能
// ================================
const likeButtons = document.querySelectorAll('.story-like');

likeButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    btn.classList.toggle('active');

    const icon = btn.querySelector('i');
    const countSpan = btn.querySelector('span');
    let count = parseInt(countSpan.textContent);

    if (btn.classList.contains('active')) {
      icon.classList.remove('far');
      icon.classList.add('fas');
      count++;
    } else {
      icon.classList.remove('fas');
      icon.classList.add('far');
      count--;
    }

    countSpan.textContent = count;
  });
});

// ================================
// 📮 Newsletter 表单
// ================================
const newsletterForm = document.getElementById('newsletter-form');

if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = newsletterForm.querySelector('input[type="email"]').value;
    const btn = newsletterForm.querySelector('button');
    const originalHTML = btn.innerHTML;

    btn.innerHTML = '<span class="btn-text">已訂閱！</span><span class="btn-icon">✓</span>';
    btn.style.pointerEvents = 'none';

    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.style.pointerEvents = '';
      newsletterForm.reset();
    }, 3000);
  });
}

// ================================
// ✨ 滚动动画
// ================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.cat-card, .story-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
  observer.observe(el);
});

// ================================
// 🎬 视差效果
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
const cards3D = document.querySelectorAll('.product-frame, .designer-card');

cards3D.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * 8;
    const rotateY = ((x - centerX) / centerX) * 8;

    card.style.transform = `perspective(1200px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ================================
// 🎯 性能优化
// ================================
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

window.addEventListener('resize', debounce(() => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}, 250));

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.style.scrollBehavior = 'auto';

  document.querySelectorAll('*').forEach(el => {
    el.style.animation = 'none !important';
    el.style.transition = 'none !important';
  });
}

// ================================
// 🎉 页面加载完成
// ================================
window.addEventListener('load', () => {
  document.body.classList.add('loaded');

  const statNums = document.querySelectorAll('.stat-num');
  statNums.forEach(num => {
    if (num.textContent !== '∞') {
      const target = parseInt(num.textContent.replace('+', '').replace('%', ''));
      const suffix = num.textContent.includes('+') ? '+' : num.textContent.includes('%') ? '%' : '';
      let current = 0;
      const increment = target / 50;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          num.textContent = target + suffix;
          clearInterval(timer);
        } else {
          num.textContent = Math.floor(current) + suffix;
        }
      }, 30);
    }
  });
});

// ================================
// 🎨 控制台彩蛋
// ================================
console.log('%c👋 Hello Designer!', 'font-size: 28px; font-weight: bold; background: linear-gradient(135deg, #ff006e, #00d9ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent;');
console.log('%c如果你睇到呢個訊息，代表你對代碼有興趣！', 'font-size: 16px; color: #00d9ff;');
console.log('%c我哋誠邀設計師合作 💌', 'font-size: 14px; color: #ff006e;');
console.log('%cemail: hello@memorymosaic.hk', 'font-size: 12px; font-family: monospace; color: #ffbe0b;');

if ('performance' in window) {
  window.addEventListener('load', () => {
    setTimeout(() => {
      const perfData = performance.getEntriesByType('navigation')[0];
      console.log('%c⚡ Page Load Time:', 'color: #06ffa5; font-weight: bold;', Math.round(perfData.loadEventEnd - perfData.fetchStart), 'ms');
    }, 0);
  });
}
