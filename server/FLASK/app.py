from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import joblib
import pandas as pd

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Define Upload Folder for Images
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

# Load trained model
MODEL_FILE = "expanded_vsd_dataset_updated.csv"

try:
    model = joblib.load(MODEL_FILE)
    print("✅ Model loaded successfully")
except Exception as e:
    model = None
    print(f"❌ Error loading model: {e}")

# Load dataset to extract feature names
DATASET_FILE = "expanded_vsd_dataset_updated.csv"
try:
    df = pd.read_csv(DATASET_FILE)
    feature_names = list(df.columns[:-1])  # Exclude target column
    print(f"✅ Feature names extracted: {feature_names}")
except Exception as e:
    feature_names = []
    print(f"❌ Error loading dataset: {e}")

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Extract form data
        data = request.form.to_dict()
        image_file = request.files.get("imageFile")

        print("📥 Received Data:", data)  # Debugging output

        # Handle image upload
        image_url = data.get("imageUrl", "")
        if image_file:
            image_path = os.path.join(app.config["UPLOAD_FOLDER"], image_file.filename)
            image_file.save(image_path)
            image_url = f"http://localhost:5000/{image_path}"

        # Convert categorical values if necessary
        if "gender" in data:
            data["gender"] = 1 if data["gender"].lower() == "male" else 0

        # Convert all inputs to float
        for key in feature_names:
            if key not in data or data[key] == "":
                return jsonify({"error": f"Missing value for {key}"}), 400
            try:
                data[key] = float(data[key])
            except ValueError:
                return jsonify({"error": f"Invalid value for {key}"}), 400

        # Ensure the model is loaded
        if not model:
            return jsonify({"error": "Model not loaded"}), 500

        # Prepare input for prediction
        input_features = [[data[feature] for feature in feature_names]]
        prediction = model.predict(input_features)[0]

        # Construct response
        result = {
            "vsd_status": "Detected" if prediction == 1 else "Not Detected",
            "severity": "Severe" if prediction > 0.7 else "Mild",
            "condition": "VSD",
            "treatment": "Refer to a cardiologist",
            "image": image_url
        }

        return jsonify(result)

    except Exception as e:
        print(f"❌ Prediction Error: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
