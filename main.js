document.addEventListener('DOMContentLoaded', () => {
  // Hamburger Menu
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.header__nav');

  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('is-open');
      nav.classList.toggle('is-open');
    });

    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('is-open');
        nav.classList.remove('is-open');
      });
    });
  }

  // Fade-in Animation on Scroll
  const fadeElements = document.querySelectorAll('.fade-in');

  const checkFade = () => {
    const triggerBottom = window.innerHeight * 0.85;

    fadeElements.forEach(element => {
      const boxTop = element.getBoundingClientRect().top;
      if (boxTop < triggerBottom) {
        element.classList.add('is-visible');
      }
    });
  };

  window.addEventListener('scroll', checkFade);
  checkFade(); // Check on load

  // Hero Slider
  const slides = document.querySelectorAll('.slide');
  const dotsContainer = document.querySelector('.dots');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  let currentIndex = 0;
  let slideInterval;
  const slideDuration = 4000; // 4秒ごとに自動再生

  if (slides.length > 0) {
    // Create dots
    slides.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(index));
      dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    const updateSlider = () => {
      slides.forEach((slide, index) => {
        slide.classList.remove('active');
        dots[index].classList.remove('active');
      });
      slides[currentIndex].classList.add('active');
      dots[currentIndex].classList.add('active');
    };

    const nextSlide = () => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateSlider();
    };

    const prevSlide = () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateSlider();
    };

    const goToSlide = (index) => {
      currentIndex = index;
      updateSlider();
      resetInterval();
    };

    const resetInterval = () => {
      clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, slideDuration);
    };

    if(nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetInterval(); });
    if(prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetInterval(); });

    // Touch events for mobile swipe
    let touchStartX = 0;
    let touchEndX = 0;
    const sliderWrapper = document.querySelector('.slider');
    
    if (sliderWrapper) {
      sliderWrapper.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
      }, {passive: true});
      
      sliderWrapper.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      }, {passive: true});
    }
    
    const handleSwipe = () => {
      if (touchEndX < touchStartX - 50) {
        nextSlide();
        resetInterval();
      }
      if (touchEndX > touchStartX + 50) {
        prevSlide();
        resetInterval();
      }
    };

    // Auto start
    slideInterval = setInterval(nextSlide, slideDuration);
  }
});
