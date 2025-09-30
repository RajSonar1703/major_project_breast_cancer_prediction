from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import joblib
import pdfplumber
import re
import numpy as np
import tempfile

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

@app.post("/predict-pdf/")
async def predict_pdf(file: UploadFile = File(...)):
    # Save uploaded PDF to temporary file
    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
        tmp.write(await file.read())
        pdf_path = tmp.name

    # Extract text and features
    text = extract_text_from_pdf(pdf_path)
    features = extract_features(text)

    if len(features) != 30:
        return {"error": "Could not extract all required features"}

    # Predict
    prediction = model.predict([np.array(features)])
    result = "Malignant" if prediction[0] == 0 else "Benign"

    return {"prediction": result, "features": features}
