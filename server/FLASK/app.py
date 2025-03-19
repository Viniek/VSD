from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import pickle
import numpy as np

app = Flask(__name__)
CORS(app)  # Allow requests from frontend

# Load trained models
vsd_model = pickle.load(open("vsd_model.pkl", "rb"))
severity_model = pickle.load(open("severity_model.pkl", "rb"))
condition_model = pickle.load(open("condition_model.pkl", "rb"))

# Function to determine treatment recommendation
def get_treatment_recommendation(condition, severity):
    if condition == "Tetralogy of Fallot":
        return "Surgical repair is recommended."
    elif condition == "Ventricular Septal Defect" and severity == "Mild":
        return "Regular monitoring; surgery may not be necessary."
    elif condition == "Ventricular Septal Defect" and severity == "Severe":
        return "Surgical intervention required."
    else:
        return "Consult a cardiologist for a detailed evaluation."

# Function to make predictions
def make_prediction(data):
    # Remove "cholesterol" from the data if it wasn't in the training data
    if "cholesterol" in data:
        del data["cholesterol"]
    
    # Rename input fields to match training dataset
    column_mapping = {
        "age": "Age",
        "gender": "Gender",
        "oxygenSaturation": "Oxygen Saturation (%)",
        "ejectionFraction": "Ejection Fraction (%)",
        "weight": "Weight (kg)",
        "height": "Height (cm)",
        "heartRate": "Heart Rate (bpm)",
        "cyanosis": "Cyanosis",
        "murmur": "Murmur",
        "systolic": "Systolic",
        "diastolic": "Diastolic",
        "vsdSize": "VSD Size (mm)",
        "familyHistory": "Family History"
    }

    # Convert received data to DataFrame
    df = pd.DataFrame([data])

    # Rename columns to match the training data
    df.rename(columns=column_mapping, inplace=True)

    # Encode Gender as a numeric value (Male -> 1, Female -> 0)
    df["Gender"] = df["Gender"].map({"Male": 1, "Female": 0})

    # Ensure columns are in the correct order expected by the model
    expected_columns = [
        "Age", "Gender", "Weight (kg)", "Height (cm)", "VSD Size (mm)", "Oxygen Saturation (%)", 
        "Ejection Fraction (%)", "Heart Rate (bpm)", "Cyanosis", "Murmur", "Systolic", "Diastolic", 
        "Family History"
    ]
    df = df[expected_columns]

    # Predict VSD
    vsd_pred = vsd_model.predict(df)[0]
    vsd_status = "Has VSD" if vsd_pred == 1 else "VSD absent"

    # Predict Severity
    severity_pred = severity_model.predict(df)[0]

    # Predict Other Condition
    condition_pred = condition_model.predict(df)[0]

    # Get Treatment Recommendation
    treatment = get_treatment_recommendation(condition_pred, severity_pred)

    return {
        "vsd_status": vsd_status,
        "severity": severity_pred,
        "condition": condition_pred,
        "treatment": treatment  # Include treatment recommendation in response
    }

# API Endpoint to receive patient data
@app.route('/predict', methods=['POST'])
def predict():
    data = request.json  # Get JSON data from frontend

    # Validate required fields
    required_fields = ["age", "gender", "oxygenSaturation", "ejectionFraction", "weight",
                       "cholesterol", "height", "heartRate", "cyanosis", "murmur",
                       "systolic", "diastolic", "vsdSize", "familyHistory"]

    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Missing field: {field}"}), 400

    # Make Prediction
    prediction = make_prediction(data)
    return jsonify(prediction)

if __name__ == '__main__':
    app.run(debug=True)