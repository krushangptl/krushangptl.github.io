// ~/krushangptl/krushangptl.github.io/script.js

// smooth scrolling for navigation links

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = decument.querySelector(this.getAttrubyte("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// fade in animation on scroll

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

document.querySelectorAll(".fade-in").forEach((el => {
    observer.observe(el);
});

