// ===== INPUT ELEMENTS =====
const roomInput = document.getElementById("roomImage");
const furnitureInput = document.getElementById("furnitureImage");
const generateBtn = document.getElementById("generateBtn");
const resultImg = document.getElementById("resultImage");

// ===== PREVIEW IMAGE FUNCTION =====
function preview(input, targetId) {
  const file = input.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    document.getElementById(targetId).src = reader.result;
  };
  reader.readAsDataURL(file);
}

// ===== SHOW PREVIEWS =====
roomInput.onchange = () => preview(roomInput, "roomPreview");
furnitureInput.onchange = () => preview(furnitureInput, "furniturePreview");

// ===== SEND IMAGES TO FLASK =====
generateBtn.addEventListener("click", async () => {
  const roomFile = roomInput.files[0];
  const furnitureFile = furnitureInput.files[0];

  if (!roomFile || !furnitureFile) {
    alert("Please upload both images");
    return;
  }

  const formData = new FormData();
  formData.append("room", roomFile);
  formData.append("furniture", furnitureFile);

  try {
    const response = await fetch("http://127.0.0.1:5000/upload", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    // Show result image on website
    resultImg.src = `http://127.0.0.1:5000/${data.result_image}`;
    resultImg.style.display = "block";

  } catch (error) {
    console.error(error);
    alert("Error connecting to backend");
  }
});
