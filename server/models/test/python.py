from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import cv2
import joblib
import os

app = Flask(__name__)
CORS(app)

# Load the trained image model
try:
    image_model = joblib.load("image_model.pkl")  # Ensure this model is pre-trained
except Exception as e:
    image_model = None
    print("Error loading model:", str(e))

# Class labels for heart conditions
HEART_CONDITIONS = {
    0: "Normal Heart",
    1: "Ventricular Septal Defect (VSD)",
    2: "Atrial Septal Defect (ASD)",
    3: "Arrhythmia",
    4: "Cardiomyopathy"
}

TREATMENT_RECOMMENDATIONS = {
    "Normal Heart": "No immediate treatment required, but regular check-ups are recommended.",
    "Ventricular Septal Defect (VSD)": "Surgical repair or catheter-based intervention may be required.",
    "Atrial Septal Defect (ASD)": "Closure via catheter-based procedure or surgery may be required.",
    "Arrhythmia": "Medication or an implanted device (pacemaker) may be needed.",
    "Cardiomyopathy": "Lifestyle changes, medication, or surgery may be required."
}

UPLOAD_FOLDER = "uploads"
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        if 'imageFile' not in request.files:
            return jsonify({"error": "No image uploaded"}), 400

        file = request.files['imageFile']
        file_path = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(file_path)

        # Load and preprocess the image
        img = cv2.imread(file_path, cv2.IMREAD_GRAYSCALE)
        if img is None:
            return jsonify({"error": "Invalid image. Please upload a valid heart X-ray."}), 400
        
        img = cv2.resize(img, (128, 128)).flatten().reshape(1, -1)

        # Make a prediction
        prediction = image_model.predict(img)[0]
        condition = HEART_CONDITIONS.get(prediction, "Unknown Condition")
        treatment = TREATMENT_RECOMMENDATIONS.get(condition, "No treatment information available.")

        return jsonify({
            "condition": condition,
            "treatment": treatment
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
