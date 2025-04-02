from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf

import numpy as np
from PIL import Image
import os
import io

app = Flask(__name__)
CORS(app)

# Load model 
try:
    image_model = tf.keras.models.load_model("image_model.h5", safe_mode=False)

    print("✅ Model loaded successfully.")
except Exception as e:
    print(f"❌ Error loading model: {e}")
    image_model = None  # Prevent crashes if model loading fails

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/predict", methods=["POST"])
def predict():
    try:
        if "image" not in request.files:
            print("❌ No image uploaded")
            return jsonify({"error": "No image uploaded"}), 400

        file = request.files["image"]
        img_bytes = file.read()

        # Convert bytes to image
        try:
            img = Image.open(io.BytesIO(img_bytes))
            img = img.convert("RGB")  # Convert all images to RGB
            img = img.resize((128, 128))
            img = np.array(img) / 255.0  # Normalize pixel values
            img = img.reshape(1, 128, 128, 3)
        except Exception as e:
            print(f"❌ Image Processing Error: {e}")
            return jsonify({"error": "Invalid image format"}), 400

        if image_model is None:
            print("❌ Model not loaded")
            return jsonify({"error": "Model not loaded"}), 500

        prediction = image_model.predict(img)
        predicted_class = int(np.argmax(prediction))

        print(f"✅ Prediction Successful: {predicted_class}")
        return jsonify({"prediction": predicted_class})

    except Exception as e:
        print(f"❌ Server Error: {e}")  # Debugging info
        return jsonify({"error": "Internal server error"}), 500

if __name__ == "__main__":
    app.run(debug=True)
# import tensorflow as tf

# try:
#     model = tf.keras.models.load_model("image_model.h5")
#     print("✅ Model loaded successfully.")
# except Exception as e:
#     print(f"❌ Model loading error: {e}")
