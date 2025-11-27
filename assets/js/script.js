// Mobile nav toggle
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav__link");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("show");
  });
}

// Close menu on link click (mobile)
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("show");
  });
});

// Active nav link on scroll
const sections = document.querySelectorAll("section[id]");

function setActiveLink() {
  const scrollY = window.pageYOffset;

  sections.forEach((section) => {
    const height = section.offsetHeight;
    const top = section.offsetTop - 120;
    const id = section.getAttribute("id");
    const link = document.querySelector(`.nav__menu a[href="#${id}"]`);

    if (scrollY > top && scrollY <= top + height) {
      link?.classList.add("active");
    } else {
      link?.classList.remove("active");
    }
  });
}

window.addEventListener("scroll", setActiveLink);

// Footer year
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Scroll reveal when scrolling down only
const revealSections = document.querySelectorAll(".reveal");

let lastScrollY = window.pageYOffset;
let scrollDirection = "down";

// detect scroll direction
window.addEventListener("scroll", () => {
  const currentY = window.pageYOffset;
  scrollDirection = currentY > lastScrollY ? "down" : "up";
  lastScrollY = currentY;
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const section = entry.target;
      const children = section.querySelectorAll("*");

      // if section left viewport completely while scrolling UP → reset
      if (!entry.isIntersecting && scrollDirection === "up") {
        section.classList.remove("visible");
        children.forEach((child) => {
          child.classList.remove("visible-child");
          child.style.transitionDelay = "";
        });
        return;
      }

      // only animate when entering while scrolling DOWN
      if (entry.isIntersecting && scrollDirection === "down") {
        section.classList.add("visible");

        children.forEach((child, index) => {
          child.classList.add("visible-child");
          child.style.transitionDelay = `${index * 0.05}s`;
        });
      }
    });
  },
  {
    threshold: 0.2, // 20% of section visible
  }
);

// observe each reveal section
revealSections.forEach((section) => revealObserver.observe(section));

// make first section (home) visible on load
window.addEventListener("load", () => {
  const first = document.querySelector(".reveal#home") || document.querySelector(".reveal");
  if (!first) return;

  const children = first.querySelectorAll("*");
  first.classList.add("visible");
  children.forEach((child, index) => {
    child.classList.add("visible-child");
    child.style.transitionDelay = `${index * 0.05}s`;
  });
});

// Contact form -> send to Formspree & clear after submit 
const contactForm = document.getElementById("contact-form");
const statusEl = document.getElementById("form-status");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault(); // stop normal page redirect

    const formData = new FormData(contactForm);

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        contactForm.reset(); // clear all inputs
        if (statusEl) {
          statusEl.textContent = "Thanks! Your message has been sent ✅";
        }
      } else {
        if (statusEl) {
          statusEl.textContent = "Oops, something went wrong. Please try again later.";
        }
      }
    } catch (error) {
      if (statusEl) {
        statusEl.textContent = "Network error. Please check your internet and try again.";
      }
    }
  });
}