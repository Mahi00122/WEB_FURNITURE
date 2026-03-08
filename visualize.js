/* ============================================================
   visualize.js  —  Mansoor Furniture Room Visualizer
   Works with Flask backend at http://127.0.0.1:5000
   ============================================================ */

const FLASK_URL = "http://127.0.0.1:5000";

const roomInput      = document.getElementById("roomImage");
const furnitureInput = document.getElementById("furnitureImage");
const generateBtn    = document.getElementById("generateBtn");
const resultImg      = document.getElementById("resultImage");
const resultBox      = document.querySelector(".result-box");

/* ── Preview uploaded images instantly ── */
roomInput.addEventListener("change", () => {
  showPreview(roomInput, "roomPreview");
});

furnitureInput.addEventListener("change", () => {
  showPreview(furnitureInput, "furniturePreview");
});

function showPreview(input, previewId) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    const el = document.getElementById(previewId);
    el.src = e.target.result;
    el.style.display = "block";
  };
  reader.readAsDataURL(file);
}

/* ── Generate Preview button ── */
generateBtn.addEventListener("click", function (e) {
  e.preventDefault();
  e.stopPropagation();

  const roomFile      = roomInput.files[0];
  const furnitureFile = furnitureInput.files[0];

  if (!roomFile) {
    alert("Please upload a Room Image first.");
    return;
  }
  if (!furnitureFile) {
    alert("Please upload a Furniture Image first.");
    return;
  }

  /* Loading state */
  generateBtn.disabled    = true;
  generateBtn.textContent = "⏳ Generating...";
  resultImg.style.display = "none";
  removeOldDownloadBtn();

  const formData = new FormData();
  formData.append("room",      roomFile);
  formData.append("furniture", furnitureFile);

  fetch(`${FLASK_URL}/upload`, {
    method: "POST",
    body:   formData
  })
  .then(function (response) {
    if (!response.ok) {
      /* Read error text from Flask */
      return response.text().then(function(text) {
        throw new Error(text || "Server returned an error.");
      });
    }
    /* ✅ Flask sends raw image blob — read it as blob, not JSON */
    return response.blob();
  })
  .then(function (blob) {
    /* Convert blob to object URL and show in <img> */
    const objectURL = URL.createObjectURL(blob);

    resultImg.src           = objectURL;
    resultImg.style.display = "block";

    addDownloadBtn(objectURL);

    /* Scroll to result */
    setTimeout(function () {
      resultImg.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 400);
  })
  .catch(function (err) {
    console.error("Visualizer error:", err);

    const msg = err.message || "";
    if (msg.toLowerCase().includes("failed to fetch")) {
      alert(
        "❌ Cannot connect to Flask.\n\n" +
        "Steps to fix:\n" +
        "1. Open a terminal / command prompt\n" +
        "2. Run:  pip install flask flask-cors Pillow\n" +
        "3. Run:  python app.py\n" +
        "4. You should see: Running on http://127.0.0.1:5000\n" +
        "5. Then click Generate Preview again."
      );
    } else {
      alert("❌ Error: " + msg);
    }
  })
  .finally(function () {
    generateBtn.disabled    = false;
    generateBtn.textContent = "Generate Preview";
  });
});

/* ── Download button helpers ── */
function addDownloadBtn(url) {
  removeOldDownloadBtn();

  const a       = document.createElement("a");
  a.id          = "vizDownloadBtn";
  a.href        = url;
  a.download    = "mansoor_room_preview.png";
  a.textContent = "⬇ Download Preview";
  a.style.cssText = [
    "display:inline-block",
    "margin-top:16px",
    "padding:12px 30px",
    "border-radius:30px",
    "background:#6b3f2a",
    "color:#fff",
    "font-size:15px",
    "text-decoration:none",
    "font-family:Arial,sans-serif",
    "cursor:pointer"
  ].join(";");

  resultBox.appendChild(a);
}

function removeOldDownloadBtn() {
  const old = document.getElementById("vizDownloadBtn");
  if (old) old.remove();
}