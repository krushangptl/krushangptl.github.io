// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// Header scroll effect
window.addEventListener("scroll", () => {
  const header = document.getElementById("header");
  const scrollY = window.scrollY;

  if (scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Fade in animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

document.querySelectorAll(".fade-in").forEach((el) => {
  observer.observe(el);
});

// Enhanced mobile menu functionality
const setupMobileMenu = () => {
  const mobileMenuBtn = document.querySelector(".mobile-menu");
  const navLinks = document.querySelector(".nav-links");

  if (!mobileMenuBtn || !navLinks) return;

  // Create mobile menu overlay
  const overlay = document.createElement("div");
  overlay.className = "mobile-overlay";
  overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                z-index: 999;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
            `;
  document.body.appendChild(overlay);

  // Mobile menu styles are now in CSS

  const styleSheet = document.createElement("style");
  styleSheet.textContent = "/* Mobile menu styles moved to main CSS */";
  document.head.appendChild(styleSheet);

  // Toggle mobile menu
  mobileMenuBtn.addEventListener("click", () => {
    mobileMenuBtn.classList.toggle("active");
    navLinks.classList.toggle("active");

    if (navLinks.classList.contains("active")) {
      overlay.style.opacity = "1";
      overlay.style.visibility = "visible";
      document.body.style.overflow = "hidden";
    } else {
      overlay.style.opacity = "0";
      overlay.style.visibility = "hidden";
      document.body.style.overflow = "";
    }
  });

  // Close menu when clicking overlay
  overlay.addEventListener("click", () => {
    mobileMenuBtn.classList.remove("active");
    navLinks.classList.remove("active");
    overlay.style.opacity = "0";
    overlay.style.visibility = "hidden";
    document.body.style.overflow = "";
  });

  // Close menu when clicking nav links
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenuBtn.classList.remove("active");
      navLinks.classList.remove("active");
      overlay.style.opacity = "0";
      overlay.style.visibility = "hidden";
      document.body.style.overflow = "";
    });
  });
};

// Initialize mobile menu
setupMobileMenu();

// Typing effect for hero subtitle
const typeWriter = (element, text, speed = 100) => {
  let i = 0;
  element.innerHTML = "";

  const type = () => {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  };

  setTimeout(type, 1500);
};

// Initialize typing effect
window.addEventListener("load", () => {
  const heroSubtitle = document.querySelector(".hero-subtitle");
  if (heroSubtitle) {
    const originalText = heroSubtitle.textContent;
    typeWriter(heroSubtitle, originalText);
  }
});

// Add active navigation highlighting
window.addEventListener("scroll", () => {
  let current = "";
  const sections = document.querySelectorAll("section");

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});

// Animate stats on scroll
const animateStats = () => {
  const stats = document.querySelectorAll(".stat-number");
  stats.forEach((stat) => {
    const originalText = stat.textContent;
    if (originalText.includes(".")) {
      // For CGPA, don't animate
      return;
    }
    const target = parseInt(originalText.replace(/[^\d]/g, ""));
    const increment = target / 30;
    let current = 0;

    const updateStat = () => {
      if (current < target) {
        current += increment;
        let displayValue = Math.ceil(current);
        if (originalText.includes("+")) {
          displayValue += "+";
        }
        stat.textContent = displayValue;
        requestAnimationFrame(updateStat);
      } else {
        stat.textContent = originalText;
      }
    };

    updateStat();
  });
};

// Animate stats when hero section is visible
const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      setTimeout(animateStats, 1000);
      heroObserver.unobserve(entry.target);
    }
  });
});

const heroSection = document.querySelector(".hero");
if (heroSection) {
  heroObserver.observe(heroSection);
}

// Enhanced hover effects for cards
const setupCardEffects = () => {
  const cards = document.querySelectorAll(
    ".project-card, .skill-category, .education-card, .experience-card"
  );

  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-5px) scale(1.02)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) scale(1)";
    });
  });
};

// Initialize card effects
setupCardEffects();

// Performance optimization: Debounce scroll events
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

// Dynamic year in footer
const currentYear = new Date().getFullYear();
document.getElementById("current-year").textContent = currentYear;

// Console message for developers
console.log(`
        🚀 Welcome to Krushang's Portfolio!
        
        Built by: Krushang Patel
        Student at: IIIT Surat
        Focus: Software Development & Linux Systems
        
        Check out my projects on GitHub!
        `);

// Initialize page
document.addEventListener("DOMContentLoaded", () => {
  // Force reflow to ensure CSS animations are ready
  document.body.offsetHeight;

  // Add loaded class to trigger animations
  document.body.classList.add("loaded");

  // Set current year
  document.getElementById("current-year").textContent =
    new Date().getFullYear();
});
