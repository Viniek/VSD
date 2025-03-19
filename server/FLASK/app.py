from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pandas as pd  # Add Pandas for named DataFrame input
import joblib

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS

# Load trained model
try:
    model = joblib.load("vsd_model.pkl")
    feature_names = ["age", "gender", "oxygenSaturation", "ejectionFraction", 
                     "weight", "cholesterol", "height", "heartRate", "cyanosis",
                     "murmur", "systolic", "diastolic", "vsdSize", "familyHistory"]
except Exception as e:
    model = None
    print("Error loading model:", str(e))

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json

        # Convert categorical fields
        data["gender"] = 1 if data["gender"].lower() == "male" else 0

        # Create DataFrame with proper feature names
        input_df = pd.DataFrame([data], columns=feature_names)

        # Ensure model is loaded
        if model is None:
            return jsonify({"error": "Model not found"}), 500

        # Make prediction
        prediction = model.predict(input_df)[0]

        # Map results to readable format
        status = "Has VSD" if prediction == 1 else "No VSD"
        severity = "Mild" if prediction == 1 else "None"
        condition = "Tetralogy of Fallot" if prediction == 1 else "Normal"
        treatment = "Medication & Monitoring" if prediction == 1 else "No treatment needed"

        return jsonify({
            "vsd_status": status,
            "severity": severity,
            "condition": condition,
            "treatment": treatment
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
