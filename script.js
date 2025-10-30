function toggleMenu() {
  const navLinks = document.getElementById("nav-links");
  navLinks.classList.toggle("active");
}

// Close mobile menu when clicking a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    const navLinks = document.getElementById("nav-links");
    if (navLinks.classList.contains("active")) {
      navLinks.classList.remove("active");
    }
  });
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  const nav = document.querySelector("nav");
  const navLinks = document.getElementById("nav-links");

  if (!nav.contains(e.target) && navLinks.classList.contains("active")) {
    navLinks.classList.remove("active");
  }
});

// Smooth scroll with offset for fixed header
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function(e) {
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
