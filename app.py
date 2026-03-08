# jenkins url -- http://localhost:8080
from flask import Flask, request, send_file
from flask_cors import CORS
from PIL import Image
import os, uuid, io

app = Flask(__name__)
CORS(app)  # allow all origins


# ------------------------------------------------------------------ #
@app.route("/")
def home():
    return "Mansoor Furniture – ML Image Service is running ✅"


# ------------------------------------------------------------------ #
@app.route("/upload", methods=["POST"])
def upload_images():
    """
    Receive room + furniture images, overlay furniture on room,
    and return the merged image FILE directly (not a JSON URL).
    The frontend reads it as a blob — no URL path issues at all.
    """

    # ── Validate inputs ──
    if "room" not in request.files or "furniture" not in request.files:
        return "Both 'room' and 'furniture' files are required.", 400

    room_file = request.files["room"]
    furniture_file = request.files["furniture"]

    if room_file.filename == "" or furniture_file.filename == "":
        return "Filenames cannot be empty.", 400

    try:
        # ── Open images ──
        room = Image.open(room_file.stream).convert("RGBA")
        furniture = Image.open(furniture_file.stream).convert("RGBA")

        # ── Remove white / near-white background from furniture ──
        furniture = remove_white_bg(furniture, threshold=230)

        # ── Resize furniture (35 % of room width, keep aspect ratio) ──
        fw = int(room.width * 0.35)
        fh = int(fw * furniture.height / furniture.width)
        furniture = furniture.resize((fw, fh), Image.Resampling.LANCZOS)

        # ── Position: horizontally centred, 58 % down ──
        fx = (room.width - fw) // 2
        fy = int(room.height * 0.58)
        fy = min(fy, room.height - fh - 5)  # clamp so it stays inside

        # ── Composite ──
        canvas = room.copy()
        canvas.paste(furniture, (fx, fy), furniture)

        # ── Save to in-memory buffer ──
        buf = io.BytesIO()
        canvas.save(buf, format="PNG")
        buf.seek(0)

        # ── Send file directly — no filesystem, no URL path confusion ──
        return send_file(buf, mimetype="image/png", download_name="merged_preview.png")

    except Exception as e:
        return f"Error processing images: {e}", 500


# ------------------------------------------------------------------ #
def remove_white_bg(img: Image.Image, threshold: int = 230) -> Image.Image:
    """Turn near-white pixels transparent (works for product-photo backgrounds)."""
    data = img.getdata()
    new = []
    for r, g, b, a in data:
        if r > threshold and g > threshold and b > threshold:
            new.append((255, 255, 255, 0))  # transparent
        else:
            new.append((r, g, b, a))
    img.putdata(new)
    return img


# ------------------------------------------------------------------ #
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)

Copy

from flask import Flask, request, send_file
from flask_cors import CORS
from PIL import Image
import io

app = Flask(__name__)
CORS(app)  # allow all origins


# ------------------------------------------------------------------ #
@app.route("/")
def home():
    return "Mansoor Furniture – ML Image Service is running ✅"


# ------------------------------------------------------------------ #
@app.route("/upload", methods=["POST"])
def upload_images():
    """
    Receive room + furniture images, overlay furniture on room,
    and return the merged image FILE directly (not a JSON URL).
    """

    # ── Validate inputs ──
    if "room" not in request.files or "furniture" not in request.files:
        return "Both 'room' and 'furniture' files are required.", 400

    room_file = request.files["room"]
    furniture_file = request.files["furniture"]

    if room_file.filename == "" or furniture_file.filename == "":
        return "Filenames cannot be empty.", 400

    try:
        # ── Open images ──
        room = Image.open(room_file.stream).convert("RGBA")
        furniture = Image.open(furniture_file.stream).convert("RGBA")

        # ── Remove white / near-white background from furniture ──
        furniture = remove_white_bg(furniture, threshold=230)

        # ── Resize furniture (35% of room width, keep aspect ratio) ──
        fw = int(room.width * 0.35)
        fh = int(fw * furniture.height / furniture.width)
        furniture = furniture.resize((fw, fh), Image.Resampling.LANCZOS)

        # ── Position: horizontally centred, 58% down ──
        fx = (room.width - fw) // 2
        fy = int(room.height * 0.58)
        fy = min(fy, room.height - fh - 5)  # clamp so it stays inside

        # ── Composite ──
        canvas = room.copy()
        canvas.paste(furniture, (fx, fy), furniture)

        # ── Save to in-memory buffer ──
        buf = io.BytesIO()
        canvas.save(buf, format="PNG")
        buf.seek(0)

        # ── Send file directly ──
        return send_file(buf, mimetype="image/png", download_name="merged_preview.png")

    except Exception as e:
        return f"Error processing images: {e}", 500


# ------------------------------------------------------------------ #
def remove_white_bg(img: Image.Image, threshold: int = 230) -> Image.Image:
    """Turn near-white pixels transparent."""
    data = img.getdata()
    new = []
    for r, g, b, a in data:
        if r > threshold and g > threshold and b > threshold:
            new.append((255, 255, 255, 0))  # transparent
        else:
            new.append((r, g, b, a))
    img.putdata(new)
    return img


# ------------------------------------------------------------------ #
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
