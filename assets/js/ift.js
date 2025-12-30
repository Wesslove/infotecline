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

// Contact form avec envoi vers Power Automate
async function sendForm(e) {
  e.preventDefault();

  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;

  // Récupération des valeurs
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  // Validation
  if (!name || name.length < 2) {
    alert('Veuillez entrer un nom valide (minimum 2 caractères).');
    return;
  }

  if (!email || !isValidEmail(email)) {
    alert('Veuillez entrer une adresse email valide.');
    return;
  }

  if (!message || message.length < 10) {
    alert('Veuillez entrer un message plus détaillé (minimum 10 caractères).');
    return;
  }

  // Désactiver le bouton
  submitBtn.disabled = true;
  submitBtn.textContent = 'Envoi en cours...';

  // Préparer les données
  const data = {
    name: name,
    email: email,
    message: message,
    timestamp: new Date().toISOString(),
    source: 'site_web_infotecline'
  };

  try {
    // SOLUTION PROFESSIONNELLE : Power Automate HTTP Trigger sécurisé
    const POWER_AUTOMATE_URL = 'VOTRE_URL_HTTP_POWER_AUTOMATE';
    
    // Clé API générée (changez-la pour votre sécurité)
    const API_KEY = 'infotecline-contact-form-2025-secure-key-abc123xyz789';
    
    const response = await fetch(POWER_AUTOMATE_URL, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'X-API-Key': API_KEY
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      const result = await response.json();
      alert('✅ ' + (result.message || 'Merci ! Votre demande a été envoyée avec succès.'));
      form.reset();
    } else {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

  } catch (error) {
    console.error('Erreur:', error);
    // Fallback sécurisé
    const mailto = `mailto:contact@infotecline.fr?subject=Demande site web&body=${encodeURIComponent('Nom: ' + name + '\nEmail: ' + email + '\n\nMessage:\n' + message)}`;
    window.location.href = mailto;
    alert('⚠️ Envoi automatique impossible. Votre email s\'ouvre pour finaliser l\'envoi.');
  } finally {
    // Réactiver le bouton
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
  }
}

// Fonction de validation email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
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

// ===== ANIMATIONS DU ROBOT =====

// Animation au clic sur le robot
const robotContainer = document.querySelector('.robot-container');
const robotImg = document.querySelector('.robot');

if (robotContainer && robotImg) {
  robotContainer.addEventListener('click', () => {
    // Réinitialiser l'animation
    robotImg.style.animation = 'none';
    setTimeout(() => {
      robotImg.style.animation = '';
    }, 10);
    
    // Effet de rebond
    robotImg.style.transform = 'scale(1.15) rotate(5deg)';
    setTimeout(() => {
      robotImg.style.transform = '';
    }, 300);
  });

  // Particules supplémentaires au survol
  robotContainer.addEventListener('mouseenter', () => {
    const particles = document.querySelector('.particles');
    if (particles) {
      for (let i = 0; i < 3; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 2 + 's';
        particles.appendChild(particle);
        
        setTimeout(() => particle.remove(), 3000);
      }
    }
  });
}