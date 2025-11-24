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
