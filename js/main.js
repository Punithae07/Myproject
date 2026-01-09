const nav = document.getElementById('nav');
const toggle = document.querySelector('.nav__toggle');
const closeBtn = document.querySelector('.nav__close');

const openNav = () => { 
  nav.classList.add('active');
  document.body.style.overflow = 'hidden';
};
const closeNav = () => { 
  nav.classList.remove('active');
  document.body.style.overflow = '';
};

toggle?.addEventListener('click', openNav);
closeBtn?.addEventListener('click', closeNav);

// Close mobile nav when clicking nav links
nav?.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    // Only handle dropdown on mobile
    if (window.innerWidth < 1024) {
      if (link.parentElement.classList.contains('nav-dropdown')) {
        e.preventDefault();
        const dropdown = link.parentElement.querySelector('.dropdown-menu');
        if (dropdown) {
          dropdown.classList.toggle('active');
        }
      } else {
        closeNav();
      }
    }
  });
});

// Dropdown menus on desktop are handled via CSS :hover
// Mobile dropdowns are handled via click events above

// Close nav on window resize if desktop
window.addEventListener('resize', () => {
  if (window.innerWidth >= 1024) {
    closeNav();
  }
});

// Hero Slider Functionality
const heroSlides = document.querySelectorAll('.hero-slide');
let currentSlide = 0;
let autoSlideInterval;

const showSlide = (index) => {
  // Update slides visibility
  heroSlides.forEach((slide, i) => {
    if (i === index) {
      slide.classList.add('hero-slide--active');
    } else {
      slide.classList.remove('hero-slide--active');
    }
  });
  
  // Update indicators in all slides to keep them in sync
  heroSlides.forEach((slide, slideIndex) => {
    const slideIndicators = slide.querySelectorAll('.indicator');
    slideIndicators.forEach((indicator, indicatorIndex) => {
      if (indicatorIndex === index) {
        indicator.classList.add('indicator--active');
      } else {
        indicator.classList.remove('indicator--active');
      }
    });
  });
  
  currentSlide = index;
};

const nextSlide = () => {
  const next = (currentSlide + 1) % heroSlides.length;
  showSlide(next);
};

const prevSlide = () => {
  const prev = (currentSlide - 1 + heroSlides.length) % heroSlides.length;
  showSlide(prev);
};

const startAutoSlide = () => {
  stopAutoSlide(); // Clear any existing interval
  autoSlideInterval = setInterval(() => {
    nextSlide();
  }, 5000); // Change slide every 5 seconds
};

const stopAutoSlide = () => {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval);
    autoSlideInterval = null;
  }
};

// Initialize slider
if (heroSlides.length > 0) {
  // Set up navigation buttons (if they exist)
  const nextBtn = document.querySelector('.hero-nav--next');
  const prevBtn = document.querySelector('.hero-nav--prev');
  
  nextBtn?.addEventListener('click', () => {
    nextSlide();
    stopAutoSlide();
    startAutoSlide();
  });
  
  prevBtn?.addEventListener('click', () => {
    prevSlide();
    stopAutoSlide();
    startAutoSlide();
  });

  // Set up indicator clicks in all slides
  heroSlides.forEach((slide) => {
    const indicators = slide.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        showSlide(index);
        stopAutoSlide();
        startAutoSlide();
      });
    });
  });

  // Start auto-slide on page load
  startAutoSlide();
  
  // Pause on hover (desktop only)
  const heroCard = document.querySelector('.hero-card');
  if (heroCard) {
    heroCard.addEventListener('mouseenter', stopAutoSlide);
    heroCard.addEventListener('mouseleave', startAutoSlide);
    
    // Also pause on touch/interaction
    heroCard.addEventListener('touchstart', stopAutoSlide);
    heroCard.addEventListener('touchend', () => {
      setTimeout(startAutoSlide, 3000); // Resume after 3 seconds
    });
  }
  
  // Ensure auto-slide works even when tab is not visible
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopAutoSlide();
    } else {
      startAutoSlide();
    }
  });
}

