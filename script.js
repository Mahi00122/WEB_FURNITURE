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
const roomInput = document.getElementById("roomImage");
const furnitureInput = document.getElementById("furnitureImage");
const generateBtn = document.getElementById("generateBtn");
const previewArea = document.getElementById("previewArea");

let roomFile = null;
let furnitureFile = null;

// Utility: preview image
function previewImage(file, label) {
  const reader = new FileReader();

  reader.onload = () => {
    const img = document.createElement("img");
    img.src = reader.result;
    img.alt = label;
    img.style.maxWidth = "300px";
    img.style.margin = "10px";
    img.style.borderRadius = "12px";

    previewArea.appendChild(img);
  };

  reader.readAsDataURL(file);
}

// Clear preview
function resetPreview() {
  previewArea.innerHTML = "";
}

// Enable button only if both images exist
function toggleButton() {
  generateBtn.disabled = !(roomFile && furnitureFile);
}

// Room image upload
roomInput.addEventListener("change", (e) => {
  roomFile = e.target.files[0];
  resetPreview();
  if (roomFile) previewImage(roomFile, "Room Image");
  toggleButton();
});

// Furniture image upload
furnitureInput.addEventListener("change", (e) => {
  furnitureFile = e.target.files[0];
  resetPreview();
  if (roomFile) previewImage(roomFile, "Room Image");
  if (furnitureFile) previewImage(furnitureFile, "Furniture Image");
  toggleButton();
});

// Button click (for now just test flow)
generateBtn.addEventListener("click", () => {
  alert("Images ready. Next step: Firebase upload.");
});

