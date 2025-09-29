# from fastapi import FastAPI, UploadFile, File
# from fastapi.middleware.cors import CORSMiddleware
# import joblib
# import pdfplumber
# import re
# import numpy as np
# import tempfile

# app = FastAPI()

# # Allow all origins
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # React app can run anywhere
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Load trained model
# model = joblib.load("breast_cancer_model.pkl")

# # List of 30 features
# FEATURES = [
#     "mean radius", "mean texture", "mean perimeter", "mean area", "mean smoothness",
#     "mean compactness", "mean concavity", "mean concave points", "mean symmetry", "mean fractal dimension",
#     "radius error", "texture error", "perimeter error", "area error", "smoothness error",
#     "compactness error", "concavity error", "concave points error", "symmetry error", "fractal dimension error",
#     "worst radius", "worst texture", "worst perimeter", "worst area", "worst smoothness",
#     "worst compactness", "worst concavity", "worst concave points", "worst symmetry", "worst fractal dimension"
# ]

# # Extract text from PDF
# def extract_text_from_pdf(pdf_file_path):
#     text = ""
#     with pdfplumber.open(pdf_file_path) as pdf:
#         for page in pdf.pages:
#             page_text = page.extract_text()
#             if page_text:
#                 text += page_text + "\n"
#     return text

# # Extract numeric values from text
# def extract_features(text):
#     features = []
#     for keyword in FEATURES:
#         match = re.search(rf"{keyword}\s*[:=]?\s*([\d\.]+)", text, re.IGNORECASE)
#         if match:
#             features.append(float(match.group(1)))
#         else:
#             features.append(0.0)  # default if not found
#     return features

# @app.post("/predict-pdf/")
# async def predict_pdf(file: UploadFile = File(...)):
#     # Save uploaded PDF to temporary file
#     with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
#         tmp.write(await file.read())
#         pdf_path = tmp.name

#     # Extract text and features
#     text = extract_text_from_pdf(pdf_path)
#     features = extract_features(text)

#     if len(features) != 30:
#         return {"error": "Could not extract all required features"}

#     # Predict
#     prediction = model.predict([np.array(features)])
#     result = "Malignant" if prediction[0] == 0 else "Benign"

#     return {"prediction": result, "features": features}

from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import joblib
import numpy as np
import tempfile
from PyPDF2 import PdfReader

# Load trained XGBoost model
model = joblib.load("breast_cancer_xgb_model.pkl")

app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dummy feature extractor from PDF text (replace with real parser if needed)
def extract_text_from_pdf(pdf_path):
    reader = PdfReader(pdf_path)
    text = ""
    for page in reader.pages:
        text += page.extract_text() or ""
    return text

def extract_features(text):
    # Placeholder: in real scenario, parse lab values/features
    # For now, return dummy random features (length must be 30 for sklearn breast cancer dataset)
    return np.random.rand(30)

@app.post("/predict-pdf/")
async def predict_pdf(file: UploadFile = File(...)):
    # Save uploaded PDF temporarily
    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
        tmp.write(await file.read())
        pdf_path = tmp.name

    # Extract features
    text = extract_text_from_pdf(pdf_path)
    features = extract_features(text)

    if len(features) != 30:
        return {"error": "Could not extract all required features"}

    # Predict with XGBoost model
    prediction = model.predict([features])
    proba = model.predict_proba([features])[0]  # [malignant_prob, benign_prob]

    # sklearn dataset: 0 = malignant, 1 = benign
    malignant_prob = float(proba[0]) * 100
    benign_prob = float(proba[1]) * 100
    result = "Malignant" if prediction[0] == 0 else "Benign"

    return {
        "prediction": result,
        "malignant_probability": round(malignant_prob, 2),
        "benign_probability": round(benign_prob, 2),
        "features": features.tolist()
    }
