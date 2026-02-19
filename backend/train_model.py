
import json
import joblib
import numpy as np
import pandas as pd
import xgboost as xgb
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from imblearn.over_sampling import SMOTE   # <--- ADDED

# 1. LOAD ORIGINAL DATASET
data = load_breast_cancer()
X = data.data
y = data.target

print("\n===== Original Dataset Loaded =====")
print(f"Rows: {X.shape[0]}, Columns: {X.shape[1]}")

# 2. EXPAND DATASET TO 5000 SAMPLES USING SMOTE
print("\n===== Applying SMOTE to Expand Dataset to 5000 Samples =====")

sm = SMOTE(random_state=42)
X_resampled, y_resampled = sm.fit_resample(X, y)

desired_count = 5000
if X_resampled.shape[0] > desired_count:
    idx = np.random.choice(X_resampled.shape[0], desired_count, replace=False)
    X_resampled = X_resampled[idx]
    y_resampled = y_resampled[idx]

print(f"New Dataset Size: {X_resampled.shape}")

df = pd.DataFrame(X_resampled, columns=data.feature_names)
df["target"] = y_resampled

# Save expanded dataset
df.to_csv("expanded_dataset.csv", index=False)
print("Expanded dataset saved as expanded_dataset.csv")

print("\n===== First 5 Rows of Expanded Dataset =====")
print(df.head())

# 3. TRAIN-TEST SPLIT
X_train, X_test, y_train, y_test = train_test_split(
    X_resampled, y_resampled, test_size=0.2, random_state=42
)

print("\n===== Data Split =====")
print("X_train:", X_train.shape)
print("X_test :", X_test.shape)
print("y_train:", y_train.shape)
print("y_test :", y_test.shape)

# 4. CONVERT TO DMatrix
dtrain = xgb.DMatrix(X_train, label=y_train)
dtest = xgb.DMatrix(X_test, label=y_test)

# 5. TRAINING PARAMETERS
params = {
    "objective": "binary:logistic",
    "eval_metric": "logloss",
    "eta": 0.05,
    "max_depth": 4,
    "subsample": 0.8,
    "colsample_bytree": 0.8,
    "seed": 42
}

# 6. STORAGE FOR LOGS
eval_results = {}

# 7. TRAIN XGBOOST (Native API)
print("\n===== Training XGBoost Model =====")

model = xgb.train(
    params=params,
    dtrain=dtrain,
    num_boost_round=100,
    evals=[(dtrain, "train"), (dtest, "test")],
    evals_result=eval_results,
    verbose_eval=True
)

print("\n===== Training Completed =====")

# 8. SAVE MODEL
model.save_model("breast_cancer_model.json")
print("Model saved as breast_cancer_model.json")

# 9. TEST ACCURACY
y_pred = (model.predict(dtest) > 0.5).astype(int)
acc = accuracy_score(y_test, y_pred)

print(f"\nModel Accuracy: {acc:.4f}")

# 10. SAVE ALL INTERMEDIATE OUTPUTS
output_data = {
    "dataset_info": {
        "original_rows": int(X.shape[0]),
        "expanded_rows": int(X_resampled.shape[0]),
        "columns": int(X.shape[1]),
        "feature_names": data.feature_names.tolist(),
        "first_expanded_rows": df.head().to_dict(orient="records")
    },
    "split_info": {
        "X_train": X_train.shape,
        "X_test": X_test.shape,
        "y_train": y_train.shape,
        "y_test": y_test.shape
    },
    "training_logs": eval_results,
    "accuracy": acc
}

with open("training_details.json", "w") as f:
    json.dump(output_data, f, indent=4)

print("\nAll intermediate logs saved to training_details.json\n")
