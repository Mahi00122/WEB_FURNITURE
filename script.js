/* ================= SLIDESHOW ================= */
const slides = document.querySelectorAll(".slide");
let slideIndex = 0;

if (slides.length > 0) {
  function changeSlide() {
    slides.forEach(s => s.classList.remove("active"));
    slides[slideIndex].classList.add("active");
    slideIndex = (slideIndex + 1) % slides.length;
  }
  setInterval(changeSlide, 3000);
}

/* ================= WISHLIST COUNTER ================= */
const countElement = document.getElementById("wishlistCount");
const wishlistIcon = document.querySelector(".wishlist");

if (wishlistIcon && countElement) {
  wishlistIcon.addEventListener("click", () => {
    let current = parseInt(countElement.textContent) || 0;
    countElement.textContent = current + 1;
  });
}

/* ================= HERO SLIDESHOW ================= */
const heroSlides = document.querySelectorAll(".hero-slide");
let heroIndex = 0;

if (heroSlides.length > 0) {
  function changeHeroSlide() {
    heroSlides.forEach(s => s.classList.remove("active"));
    heroSlides[heroIndex].classList.add("active");
    heroIndex = (heroIndex + 1) % heroSlides.length;
  }
  setInterval(changeHeroSlide, 4000);
}

/* ================= LOGO TRANSITION ================= */
const logos = document.querySelectorAll(".logo-img");
let logoIndex = 0;

if (logos.length > 0) {
  setInterval(() => {
    logos.forEach(logo => logo.classList.remove("active"));
    logoIndex = (logoIndex + 1) % logos.length;
    logos[logoIndex].classList.add("active");
  }, 3000);
}

/* ================= LOGIN FORM — only runs on login.html ================= */
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const email    = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (email === "test@gmail.com" && password === "123456") {
      alert("Login successful");
    } else {
      alert("Invalid email or password");
    }
  });
}