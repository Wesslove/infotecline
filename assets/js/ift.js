
    // Mobile menu toggle
    function toggleMenu() {
      const menu = document.getElementById('mobileMenu');
      menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    }

    // Scroll to top button
    const scrollTop = document.getElementById('scrollTop');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 600) {
        scrollTop.classList.add('show');
      } else {
        scrollTop.classList.remove('show');
      }
    });

    // Update year
    document.getElementById('year').textContent = new Date().getFullYear();

    // ROI Calculator
    function calcROI() {
      const time = parseFloat(document.getElementById('time').value || 0);
      const people = parseInt(document.getElementById('people').value || 0, 10);
      const rate = parseFloat(document.getElementById('rate').value || 0);
      const weeks = parseInt(document.getElementById('weeks').value || 0, 10);
      const hours = time * people * weeks;
      const euros = hours * rate;
      document.getElementById('hours').textContent = new Intl.NumberFormat('fr-FR').format(hours) + ' h';
      document.getElementById('savings').textContent = new Intl.NumberFormat('fr-FR', {style:'currency', currency:'EUR'}).format(euros);
    }
    calcROI();

    // Contact form
    function sendForm(e) {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      const mailto = `mailto:contact@infotecline.fr?subject=Demande%20site%20web%20-%20${encodeURIComponent(name)}&body=${encodeURIComponent(message)}%0A%0AEmail:%20${encodeURIComponent(email)}`;
      window.location.href = mailto;
    }

    // Testimonials slider
    const slider = document.querySelector('.testimonials-slider');
    const dotsContainer = document.getElementById('dots');
    const testimonials = document.querySelectorAll('.testimonial');
    let currentIndex = 0;

    function createDots() {
      dotsContainer.innerHTML = '';
      testimonials.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
      });
    }

    function updateDots() {
      const dots = document.querySelectorAll('.dot');
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
      });
    }

    function goToSlide(index) {
      currentIndex = index;
      const slideWidth = testimonials[0].offsetWidth + 24; // 24px gap
      slider.scrollTo({
        left: slideWidth * index,
        behavior: 'smooth'
      });
      updateDots();
    }

    function updateCurrentIndex() {
      const slideWidth = testimonials[0].offsetWidth + 24;
      currentIndex = Math.round(slider.scrollLeft / slideWidth);
      updateDots();
    }

    slider.addEventListener('scroll', updateCurrentIndex);
    createDots();
