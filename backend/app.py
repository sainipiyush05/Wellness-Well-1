import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import joblib
import numpy as np
from pathlib import Path

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Get the absolute path to the models directory
BASE_DIR = Path(__file__).resolve().parent.parent
MODELS_DIR = BASE_DIR / "models"

# Define feature orders for each model
FEATURE_ORDERS = {
    'parkinsons': [
        'fo', 'fhi', 'flo', 'jitter', 'shimmer', 'nhr',
        'hnr', 'rpde', 'dfa', 'spread1', 'spread2', 'd2'
    ],
    'diabetes': [
        'pregnancies', 'glucose', 'bloodPressure', 'skinThickness',
        'insulin', 'bmi', 'diabetesPedigree', 'age'
    ],
    'heart': [
        'age', 'sex', 'chestPainType', 'restingBP', 'cholesterol',
        'fastingBS', 'restingECG', 'maxHR', 'exerciseAngina',
        'oldpeak', 'stSlope', 'majorVessels', 'thalassemia'
    ],
    'cancer': [
        'radiusMean', 'textureMean', 'perimeterMean', 'areaMean',
        'smoothnessMean', 'compactnessMean', 'concavityMean',
        'concavePointsMean', 'symmetryMean', 'fractalDimensionMean',
        'worstRadius', 'worstTexture'
    ]
}

# Load models
models = {}
for disease in FEATURE_ORDERS.keys():
    model_path = MODELS_DIR / f"{disease}.pred.pkl"
    try:
        if model_path.exists():
            models[disease] = joblib.load(model_path)
            print(f"✓ Successfully loaded {disease} model from {model_path}")
        else:
            print(f"✗ Model file not found: {model_path}")
    except Exception as e:
        print(f"✗ Error loading {disease} model: {e}")

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "models_loaded": list(models.keys()),
        "models_dir": str(MODELS_DIR),
        "models_found": [f.name for f in MODELS_DIR.glob("*.pkl") if f.is_file()]
    }

def get_prediction_message(disease_type: str, prediction: int, probability: float) -> str:
    messages = {
        'cancer': {
            0: "Benign - No signs of malignancy detected",
            1: "Malignant - Signs of potential malignancy detected"
        },
        'heart': {
            0: "Low risk of heart disease",
            1: "Elevated risk of heart disease"
        },
        'diabetes': {
            0: "Low risk of diabetes",
            1: "Elevated risk of diabetes"
        },
        'parkinsons': {
            0: "No significant indicators of Parkinson's",
            1: "Potential indicators of Parkinson's detected"
        }
    }
    return messages.get(disease_type, {}).get(prediction, "Analysis complete")

@app.post("/predict/{disease_type}")
async def predict(disease_type: str, data: dict):
    if disease_type not in models:
        raise HTTPException(status_code=404, detail=f"Model for {disease_type} not found")
    
    try:
        # Get feature order for this disease
        feature_order = FEATURE_ORDERS.get(disease_type)
        if not feature_order:
            raise ValueError(f"Feature order not defined for {disease_type}")
        
        # Create feature array in correct order
        features = np.array([[data[feature] for feature in feature_order]])
        print(f"Received data for {disease_type}:", data)
        print(f"Features shape: {features.shape}")
        
        # Make prediction
        model = models[disease_type]
        prediction = model.predict(features)[0]
        probabilities = model.predict_proba(features)[0]
        
        # Get the probability for the predicted class
        probability = probabilities[1] if prediction == 1 else probabilities[0]
        
        result = {
            "prediction": int(prediction),
            "probability": float(probability),
            "message": get_prediction_message(disease_type, prediction, probability)
        }
        
        print(f"Prediction result for {disease_type}:", result)
        return result
        
    except KeyError as e:
        print(f"Missing feature: {e}")
        raise HTTPException(status_code=400, detail=f"Missing feature: {str(e)}")
    except Exception as e:
        print(f"Error during prediction: {e}")
        raise HTTPException(status_code=400, detail=str(e))