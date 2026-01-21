/* ================= SLIDESHOW ================= */
let slides = document.querySelectorAll(".slide");
let index = 0;

function changeSlide() {
  slides.forEach(slide => slide.classList.remove("active"));
  slides[index].classList.add("active");
  index = (index + 1) % slides.length;
}
setInterval(changeSlide, 3000);

/* ================= WISHLIST COUNTER ================= */
let wishlistCount = 0;
const countElement = document.getElementById("wishlistCount");
const wishlistIcon = document.querySelector(".wishlist");

if (wishlistIcon && countElement) {
  wishlistIcon.addEventListener("click", () => {
    wishlistCount++;
    countElement.textContent = wishlistCount;
  });
}

/* ================= HERO SLIDESHOW ================= */
let heroSlides = document.querySelectorAll(".hero-slide");
let heroIndex = 0;

function changeHeroSlide() {
  heroSlides.forEach(slide => slide.classList.remove("active"));
  heroSlides[heroIndex].classList.add("active");
  heroIndex = (heroIndex + 1) % heroSlides.length;
}

setInterval(changeHeroSlide, 4000);

/* ================= LOGO TRANSITION ================= */
const logos = document.querySelectorAll(".logo-img");
let logoIndex = 0;

setInterval(() => {
  logos.forEach(logo => logo.classList.remove("active"));
  logoIndex = (logoIndex + 1) % logos.length;
  logos[logoIndex].classList.add("active");
}, 3000);
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (email === "test@gmail.com" && password === "123456") {
    alert("Login successful");
  } else {
    alert("Invalid email or password");
  }
});

