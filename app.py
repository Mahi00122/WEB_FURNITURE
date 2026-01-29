from flask import Flask, request, jsonify
from flask import send_from_directory
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER


@app.route("/")
def home():
    return "ML Image Service is running"


# ================= IMAGE UPLOAD API =================
@app.route("/upload", methods=["POST"])
def upload_images():
    if "room" not in request.files or "furniture" not in request.files:
        return jsonify({"error": "Both images are required"}), 400

    room_image = request.files["room"]
    furniture_image = request.files["furniture"]

    room_path = os.path.join(app.config["UPLOAD_FOLDER"], room_image.filename)
    furniture_path = os.path.join(app.config["UPLOAD_FOLDER"], furniture_image.filename)

    room_image.save(room_path)
    furniture_image.save(furniture_path)

    return jsonify(
        {"message": "Images uploaded successfully", "result_image": room_path}
    )


@app.route("/uploads/<filename>")
def uploaded_file(filename):
    return send_from_directory("uploads", filename)


if __name__ == "__main__":
    app.run(debug=True)
