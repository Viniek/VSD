from flask import Flask, request, jsonify
import joblib
import numpy as np
import os

app = Flask(__name__)

# Load the model
MODEL_FILE = "vsd_model.pkl"
if os.path.exists(MODEL_FILE):
    model = joblib.load(MODEL_FILE)
    print("✅ Model loaded successfully")
else:
    model = None
    print("❌ Model file not found!")

# Required features
feature_names = ["age", "gender", "heartRate", "bloodPressure", "cholesterol", "oxygenLevel"]

@app.route("/predict", methods=["POST"])
def predict():
    try:
        # Extract form data
        data = request.form.to_dict()
        image_file = request.files.get("imageFile")

        print("📥 Received Data:", data)

        # Validate required fields
        missing_fields = [field for field in feature_names if field not in data or data[field] == ""]
        if missing_fields:
            return jsonify({"error": f"Missing values for: {', '.join(missing_fields)}"}), 400

        # Convert gender to numeric
        if "gender" in data:
            data["gender"] = 1 if data["gender"].lower() == "male" else 0

        # Convert inputs to float
        try:
            for key in feature_names:
                data[key] = float(data[key])
        except ValueError:
            return jsonify({"error": f"Invalid value for {key}"}), 400

        # Ensure model is loaded
        if not model:
            return jsonify({"error": "Model not loaded"}), 500

        # Prepare input for prediction
        input_features = np.array([[data[feature] for feature in feature_names]])
        prediction = model.predict(input_features)[0]

        # Construct response
        result = {
            "vsd_status": "Detected" if prediction == 1 else "Not Detected",
            "severity": "Severe" if prediction > 0.7 else "Mild",
            "condition": "VSD",
            "treatment": "Refer to a cardiologist"
        }

        return jsonify(result)

    except Exception as e:
        print(f"❌ Prediction Error: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
