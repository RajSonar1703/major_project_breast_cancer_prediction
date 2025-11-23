from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import joblib
import pdfplumber
import re
import numpy as np
import tempfile
from fastapi import Body

app = FastAPI()

# Allow all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # React app can run anywhere
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load trained model
model = joblib.load("breast_cancer_model.pkl")

# List of 30 features
FEATURES = [
    "mean radius", "mean texture", "mean perimeter", "mean area", "mean smoothness",
    "mean compactness", "mean concavity", "mean concave points", "mean symmetry", "mean fractal dimension",
    "radius error", "texture error", "perimeter error", "area error", "smoothness error",
    "compactness error", "concavity error", "concave points error", "symmetry error", "fractal dimension error",
    "worst radius", "worst texture", "worst perimeter", "worst area", "worst smoothness",
    "worst compactness", "worst concavity", "worst concave points", "worst symmetry", "worst fractal dimension"
]

# Extract text from PDF
def extract_text_from_pdf(pdf_file_path):
    text = ""
    with pdfplumber.open(pdf_file_path) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"
    return text

# Extract numeric values from text
def extract_features(text):
    features = []
    for keyword in FEATURES:
        match = re.search(rf"{keyword}\s*[:=]?\s*([\d\.]+)", text, re.IGNORECASE)
        if match:
            features.append(float(match.group(1)))
        else:
            features.append(0.0)  # default if not found
    return features

















import json
import os
from fastapi.responses import JSONResponse

@app.get("/preprocess-steps/")
def get_preprocessing_steps():
    log_path = "training_details.json"

    if not os.path.exists(log_path):
        return {"error": "training_logs.json not found — run train_model.py first."}

    with open(log_path, "r") as f:
        logs = json.load(f)

    return JSONResponse(content=logs)

# @app.get("/preprocess-steps/")
# def get_preprocessing_steps():
#     steps = [
#         "1️⃣ Load the Breast Cancer Wisconsin dataset from scikit-learn.",
#         "2️⃣ Perform data cleaning and ensure all 30 numeric features are consistent.",
#         "3️⃣ Split the dataset into training and testing sets.",
#         "4️⃣ Apply StandardScaler to normalize feature values for better model performance.",
#         "5️⃣ Train a classifier (RandomForest or Logistic Regression) on the scaled data.",
#         "6️⃣ Save the trained model as 'breast_cancer_model.pkl' using joblib.",
#         "7️⃣ During prediction, scale incoming feature data using the same StandardScaler.",
#         "8️⃣ The model outputs class (Benign / Malignant) and associated probabilities."
#     ]
#     return {"preprocessing_steps": steps}



from fastapi.responses import JSONResponse
from sklearn.datasets import load_breast_cancer
import pandas as pd

# @app.get("/show-dataset/")
# def show_dataset():
#     # Load dataset
#     data = load_breast_cancer()
#     df = pd.DataFrame(data.data, columns=data.feature_names)
#     df["target"] = data.target

#     # Convert DataFrame to JSON
#     dataset_json = df.to_dict(orient="records")

#     return JSONResponse(content=dataset_json)


@app.get("/show-dataset/")
def show_dataset(limit: int = 1000):
    data = load_breast_cancer()
    df = pd.DataFrame(data.data, columns=data.feature_names)
    df["target"] = data.target

    # Limit the number of rows
    df_limited = df.head(limit)

    dataset_json = df_limited.to_dict(orient="records")

    return JSONResponse(content=dataset_json)


@app.get("/get-dataset/")
def get_dataset(limit: int = 1000):
    data = load_breast_cancer()
    df = pd.DataFrame(data.data, columns=data.feature_names)
    df["target"] = data.target

    df_limited = df.head(limit)
    dataset_json = df_limited.to_dict(orient="records")

    return JSONResponse(content=dataset_json)




@app.post("/predict-pdf/")
async def predict_pdf(file: UploadFile = File(...)):
    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
        tmp.write(await file.read())
        pdf_path = tmp.name

    text = extract_text_from_pdf(pdf_path)
    features = extract_features(text)

    if len(features) != 30:
        return {"error": "Could not extract all required features"}

    # Ensure model input is numpy array of shape (1, 30)
    features_array = np.array(features).reshape(1, -1)

    prediction = model.predict(features_array)
    prediction_value = int(prediction[0])  # convert numpy.int64 → int
    result = "Malignant" if prediction_value == 0 else "Benign"

    probs = model.predict_proba(features_array)[0]
    benign_prob = float(round(probs[1] * 100, 2))       # convert numpy.float32 → float
    malignant_prob = float(round(probs[0] * 100, 2))    # convert numpy.float32 → float

    # Optional feature importance
    importance = None
    if hasattr(model, "feature_importances_"):
        importance = [float(x) for x in model.feature_importances_.tolist()]

    return {
        "prediction": result,
        "features": [float(x) for x in features],  # ensure all floats
        "benign_probability": benign_prob,
        "malignant_probability": malignant_prob,
        "importance": importance
    }



from fastapi import FastAPI
from pydantic import BaseModel
import numpy as np
import joblib

model = joblib.load("breast_cancer_model.pkl")

class ManualFeatures(BaseModel):
    features: list[float]  # expect 30 numbers

@app.post("/predict-manual/")
def predict_manual(data: ManualFeatures):
    if len(data.features) != 30:
        return {"error": "Please provide exactly 30 features."}

    features_array = np.array(data.features).reshape(1, -1)
    prediction = model.predict(features_array)[0]
    probs = model.predict_proba(features_array)[0]

    result = "Malignant" if int(prediction) == 0 else "Benign"

    return {
        "prediction": result,
        "benign_probability": float(round(probs[1]*100, 2)),
        "malignant_probability": float(round(probs[0]*100, 2)),
        "features": [float(x) for x in data.features]
    }











import json
import os
from fastapi.responses import JSONResponse

@app.get("/training-logs/")
def get_training_logs():
    log_path = "training_logs.json"

    if not os.path.exists(log_path):
        return {"error": "Training logs not found. Run train_model.py first."}

    with open(log_path, "r") as f:
        logs = json.load(f)

    return JSONResponse(content=logs)
