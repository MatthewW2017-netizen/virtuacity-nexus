// Nexus OS - Enhanced Interactions & Animations
(function() {
  'use strict';

  // Smooth scroll behavior
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Animate elements on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all sections
  document.querySelectorAll('.content-section, .feature-card, .cta-section').forEach(el => {
    observer.observe(el);
  });

  // Add animation class style dynamically
  const style = document.createElement('style');
  style.textContent = `
    .content-section, .feature-card, .cta-section {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .content-section.animate-in, 
    .feature-card.animate-in,
    .cta-section.animate-in {
      opacity: 1;
      transform: translateY(0);
    }

    .feature-card {
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }

    .feature-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
      transition: left 0.5s ease;
    }

    .feature-card:hover::before {
      left: 100%;
    }

    /* Button hover effects */
    .btn {
      position: relative;
      overflow: hidden;
    }

    .btn::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.3);
      transform: translate(-50%, -50%);
      transition: width 0.6s, height 0.6s;
    }

    .btn:active::after {
      width: 300px;
      height: 300px;
    }

    /* Gradient text animation */
    .page-header h1 {
      background-size: 200% auto;
      animation: gradient-shift 3s linear infinite;
    }

    @keyframes gradient-shift {
      0% { background-position: 0% center; }
      100% { background-position: 200% center; }
    }
  `;
  document.head.appendChild(style);

  // Enhanced button interactions
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      this.style.transform = this.classList.contains('primary') 
        ? 'translateY(-3px)' 
        : 'translateY(-2px)';
    });

    btn.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });

  // Parallax effect for hero section
  const hero = document.querySelector('.hero');
  if (hero) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (scrollY < window.innerHeight) {
        hero.style.backgroundPosition = `center ${scrollY * 0.5}px`;
      }
    });
  }

  // Form validation enhancement
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Show success animation
      const btn = this.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      
      btn.textContent = '✓ Success!';
      btn.style.background = 'linear-gradient(135deg, #10b981, #06b6d4)';
      
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        this.reset();
      }, 2000);
    });
  });

  // Navbar highlight on scroll
  const nav = document.querySelector('.top-actions');
  if (nav) {
    window.addEventListener('scroll', () => {
      const scrollPos = window.scrollY;
      
      nav.querySelectorAll('a').forEach(link => {
        const section = document.querySelector(link.getAttribute('href'));
        if (section && scrollPos >= section.offsetTop - 100 && scrollPos < section.offsetTop + section.offsetHeight) {
          link.style.borderColor = 'rgba(139, 92, 246, 0.6)';
        } else {
          link.style.borderColor = '';
        }
      });
    });
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      // Close any potential modals/overlays
      console.log('Escape pressed');
    }
  });

  // Page load animation
  window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.3s ease';
  });

  // Console Easter Egg
  console.log('%c🌐 Welcome to Nexus OS!', 'font-size: 20px; font-weight: bold; color: #8b5cf6;');
  console.log('%cWe\'re building the future of digital worlds.', 'font-size: 14px; color: #cfd6ff;');
  console.log('%cLike what you see? Join us! nexusos.com/careers', 'font-size: 12px; color: #06b6d4;');

})();
