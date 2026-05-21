// ========================================
// Shofiyatul Nur Ghilbah - Personal Website
// JavaScript Functionality
// ========================================

// ========== NAVBAR FUNCTIONALITY ==========
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

// Navbar scroll effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Mobile menu toggle
if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close menu when clicking a link
  const navItems = navLinks.querySelectorAll('a');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
}

// ========== SKILL BARS ANIMATION ==========
const animateSkillBars = () => {
  const skillFills = document.querySelectorAll('.skill-fill');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const width = fill.getAttribute('data-width');
        fill.style.setProperty('--width', width + '%');
        fill.classList.add('animate');
        observer.unobserve(fill);
      }
    });
  }, { threshold: 0.5 });

  skillFills.forEach(fill => observer.observe(fill));
};

// ========== SKILL CIRCLES ANIMATION ==========
const animateSkillCircles = () => {
  const skillCircles = document.querySelectorAll('.skill-circle .progress');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const circle = entry.target;
        const percent = circle.getAttribute('data-percent');
        circle.style.setProperty('--percent', percent);
        circle.classList.add('animate');
        observer.unobserve(circle);
      }
    });
  }, { threshold: 0.5 });

  skillCircles.forEach(circle => observer.observe(circle));
};

// ========== CV SKILL BARS ANIMATION ==========
const animateCVSkillBars = () => {
  const cvSkillFills = document.querySelectorAll('.cv-skill-fill');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const width = fill.getAttribute('data-width');
        fill.style.setProperty('--width', width);
        fill.classList.add('animate');
        observer.unobserve(fill);
      }
    });
  }, { threshold: 0.5 });

  cvSkillFills.forEach(fill => observer.observe(fill));
};

// ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ========== FADE IN ANIMATION ON SCROLL ==========
const fadeInElements = () => {
  const elements = document.querySelectorAll('.card-item, .project-card, .timeline-item, .hobi-item, .skills-category, .skill-card');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 100);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
  });
};

// ========== INITIALIZE ALL ANIMATIONS ==========
const initAnimations = () => {
  animateSkillBars();
  animateSkillCircles();
  animateCVSkillBars();
  fadeInElements();
};

// ========== PAGE LOAD ==========
window.addEventListener('DOMContentLoaded', () => {
  initAnimations();
  
  // Add active class to current page nav link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navItems = document.querySelectorAll('.nav-links a');
  
  navItems.forEach(item => {
    const href = item.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      item.classList.add('active');
    }
  });
});

// ========== SCROLL TO TOP BUTTON (Optional Enhancement) ==========
const createScrollToTop = () => {
  const scrollBtn = document.createElement('button');
  scrollBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
  scrollBtn.className = 'scroll-to-top';
  scrollBtn.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--pastel-pink), var(--pastel-purple));
    color: white;
    border: none;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    box-shadow: 0 5px 20px rgba(244, 167, 185, 0.4);
    font-size: 1.2rem;
  `;
  
  document.body.appendChild(scrollBtn);
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      scrollBtn.style.opacity = '1';
      scrollBtn.style.visibility = 'visible';
    } else {
      scrollBtn.style.opacity = '0';
      scrollBtn.style.visibility = 'hidden';
    }
  });
  
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  scrollBtn.addEventListener('mouseenter', () => {
    scrollBtn.style.transform = 'translateY(-5px)';
  });
  
  scrollBtn.addEventListener('mouseleave', () => {
    scrollBtn.style.transform = 'translateY(0)';
  });
};

// Initialize scroll to top button
createScrollToTop();

// ========== TYPING EFFECT FOR TAGLINE (Optional Enhancement) ==========
const typingEffect = (element, text, speed = 100) => {
  if (!element) return;
  
  let i = 0;
  element.textContent = '';
  
  const type = () => {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  };
  
  type();
};

// Apply typing effect to hero tagline on homepage
const heroTagline = document.querySelector('.hero-tagline');
if (heroTagline && window.location.pathname.includes('index.html') || window.location.pathname === '/') {
  const originalText = heroTagline.textContent;
  setTimeout(() => {
    typingEffect(heroTagline, originalText, 80);
  }, 500);
}

// ========== CONSOLE MESSAGE ==========
console.log('%c👋 Hello! Welcome to my website!', 'color: #f4a7b9; font-size: 20px; font-weight: bold;');
console.log('%c✨ Made with love by Shofiyatul Nur Ghilbah', 'color: #c9b8e8; font-size: 14px;');
console.log('%c🚀 just me, improving every day.', 'color: #a8d8ea; font-size: 14px; font-style: italic;');

// ========== CUSTOM CURSOR - PINK BUTTERFLY ==========
// Create cursor elements
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

const follower = document.createElement('div');
follower.className = 'cursor-follower';
document.body.appendChild(follower);

let mouseX = 0;
let mouseY = 0;
let followerX = 0;
let followerY = 0;

// Update cursor position
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
  
  // Create heart trail effect
  if (Math.random() > 0.92) {
    createHeart(mouseX, mouseY);
  }
});

// Smooth follower animation
function animateFollower() {
  const distX = mouseX - followerX;
  const distY = mouseY - followerY;
  
  followerX += distX * 0.08;
  followerY += distY * 0.08;
  
  follower.style.left = followerX + 'px';
  follower.style.top = followerY + 'px';
  
  requestAnimationFrame(animateFollower);
}
animateFollower();

// Create heart particles
function createHeart(x, y) {
  const heart = document.createElement('div');
  heart.className = 'cursor-trail';
  heart.style.left = x + (Math.random() - 0.5) * 30 + 'px';
  heart.style.top = y + (Math.random() - 0.5) * 30 + 'px';
  document.body.appendChild(heart);
  
  setTimeout(() => {
    heart.remove();
  }, 1500);
}

// Hover effect on interactive elements
const interactiveElements = document.querySelectorAll('a, button, .btn, .portfolio-card, .card-item, .slider-btn, .dot, input, textarea, .modal-close, .modal-slider-btn, .clickable-card');

interactiveElements.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('hover');
    follower.classList.add('hover');
  });
  
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('hover');
    follower.classList.remove('hover');
  });
});

// Hide cursor when leaving window
document.addEventListener('mouseleave', () => {
  cursor.style.opacity = '0';
  follower.style.opacity = '0';
});

document.addEventListener('mouseenter', () => {
  cursor.style.opacity = '1';
  follower.style.opacity = '0.6';
});

// ========== PORTFOLIO SLIDER ==========
function changeSlide(button, direction) {
  const slider = button.closest('.portfolio-card-slider');
  const images = slider.querySelectorAll('.slider-img');
  const dots = slider.querySelectorAll('.dot');
  let currentIndex = 0;
  
  // Find current active image
  images.forEach((img, index) => {
    if (img.classList.contains('active')) {
      currentIndex = index;
    }
  });
  
  // Remove active class
  images[currentIndex].classList.remove('active');
  dots[currentIndex].classList.remove('active');
  
  // Calculate new index
  currentIndex += direction;
  if (currentIndex >= images.length) currentIndex = 0;
  if (currentIndex < 0) currentIndex = images.length - 1;
  
  // Add active class to new image
  images[currentIndex].classList.add('active');
  dots[currentIndex].classList.add('active');
}

function currentSlide(dot, index) {
  const slider = dot.closest('.portfolio-card-slider');
  const images = slider.querySelectorAll('.slider-img');
  const dots = slider.querySelectorAll('.dot');
  
  // Remove all active classes
  images.forEach(img => img.classList.remove('active'));
  dots.forEach(d => d.classList.remove('active'));
  
  // Add active class to selected
  images[index].classList.add('active');
  dots[index].classList.add('active');
}


// ========== PHOTO MODAL GALLERY ==========
const modalData = {
  pendidikan: {
    images: [
      'https://i.imgur.com/placeholder1.jpg',
      'https://i.imgur.com/placeholder2.jpg',
      'https://i.imgur.com/placeholder3.jpg'
    ],
    captions: [
      'Kegiatan di SMKN 7 Semarang',
      'Praktik Jurusan SIJA',
      'Suasana Belajar'
    ]
  },
  hobi: {
    images: [
      'https://i.imgur.com/placeholder4.jpg',
      'https://i.imgur.com/placeholder5.jpg',
      'https://i.imgur.com/placeholder6.jpg',
      'https://i.imgur.com/placeholder7.jpg',
      'https://i.imgur.com/placeholder8.jpg'
    ],
    captions: [
      'Menonton Film Favorit',
      'Mendengarkan Musik',
      'Hasil Baking',
      'Traveling ke Tempat Baru',
      'Eksplorasi Kuliner'
    ]
  }
};

let currentModalCategory = '';
let currentModalIndex = 0;

function openModal(category) {
  currentModalCategory = category;
  currentModalIndex = 0;
  
  const modal = document.getElementById('photoModal');
  const modalImg = document.getElementById('modalImg');
  const modalCaption = document.getElementById('modalCaption');
  const modalDots = document.getElementById('modalDots');
  
  const data = modalData[category];
  
  // Set first image
  modalImg.src = data.images[0];
  modalCaption.textContent = data.captions[0];
  
  // Create dots
  modalDots.innerHTML = '';
  data.images.forEach((img, index) => {
    const dot = document.createElement('span');
    dot.className = 'dot' + (index === 0 ? ' active' : '');
    dot.onclick = () => goToModalSlide(index);
    
    // Add hover effect for cursor
    dot.addEventListener('mouseenter', () => {
      const cursor = document.querySelector('.custom-cursor');
      const follower = document.querySelector('.cursor-follower');
      if (cursor) cursor.classList.add('hover');
      if (follower) follower.classList.add('hover');
    });
    
    dot.addEventListener('mouseleave', () => {
      const cursor = document.querySelector('.custom-cursor');
      const follower = document.querySelector('.cursor-follower');
      if (cursor) cursor.classList.remove('hover');
      if (follower) follower.classList.remove('hover');
    });
    
    modalDots.appendChild(dot);
  });
  
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  
  // Add hover effect to modal buttons
  setTimeout(() => {
    const modalBtns = document.querySelectorAll('.modal-slider-btn, .modal-close');
    modalBtns.forEach(btn => {
      btn.addEventListener('mouseenter', () => {
        const cursor = document.querySelector('.custom-cursor');
        const follower = document.querySelector('.cursor-follower');
        if (cursor) cursor.classList.add('hover');
        if (follower) follower.classList.add('hover');
      });
      
      btn.addEventListener('mouseleave', () => {
        const cursor = document.querySelector('.custom-cursor');
        const follower = document.querySelector('.cursor-follower');
        if (cursor) cursor.classList.remove('hover');
        if (follower) follower.classList.remove('hover');
      });
    });
  }, 100);
}

function closeModal() {
  const modal = document.getElementById('photoModal');
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

function changeModalSlide(direction) {
  const data = modalData[currentModalCategory];
  const dots = document.querySelectorAll('#modalDots .dot');
  
  // Remove active class
  dots[currentModalIndex].classList.remove('active');
  
  // Calculate new index
  currentModalIndex += direction;
  if (currentModalIndex >= data.images.length) currentModalIndex = 0;
  if (currentModalIndex < 0) currentModalIndex = data.images.length - 1;
  
  // Update image and caption
  const modalImg = document.getElementById('modalImg');
  const modalCaption = document.getElementById('modalCaption');
  
  modalImg.src = data.images[currentModalIndex];
  modalCaption.textContent = data.captions[currentModalIndex];
  
  // Add active class to new dot
  dots[currentModalIndex].classList.add('active');
}

function goToModalSlide(index) {
  const data = modalData[currentModalCategory];
  const dots = document.querySelectorAll('#modalDots .dot');
  
  // Remove active class
  dots[currentModalIndex].classList.remove('active');
  
  // Set new index
  currentModalIndex = index;
  
  // Update image and caption
  const modalImg = document.getElementById('modalImg');
  const modalCaption = document.getElementById('modalCaption');
  
  modalImg.src = data.images[currentModalIndex];
  modalCaption.textContent = data.captions[currentModalIndex];
  
  // Add active class to new dot
  dots[currentModalIndex].classList.add('active');
}

// Close modal when clicking outside
window.onclick = function(event) {
  const modal = document.getElementById('photoModal');
  if (event.target === modal) {
    closeModal();
  }
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
});
