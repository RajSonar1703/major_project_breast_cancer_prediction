# from sklearn.datasets import load_breast_cancer
# from sklearn.model_selection import train_test_split
# from sklearn.ensemble import RandomForestClassifier
# import joblib

# # Load dataset
# data = load_breast_cancer()
# X, y = data.data, data.target

# # Train-test split
# X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# # Train RandomForest model
# model = RandomForestClassifier(n_estimators=100, random_state=42)
# model.fit(X_train, y_train)

# # Save model
# joblib.dump(model, "breast_cancer_model.pkl")
# print("✅ Model trained and saved successfully!")

from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from xgboost import XGBClassifier
import joblib

# Load dataset
data = load_breast_cancer()
X, y = data.data, data.target

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Train XGBoost model
model = XGBClassifier(
    use_label_encoder=False,
    eval_metric="logloss",
    random_state=42,
    n_estimators=300,      # more trees for better learning
    learning_rate=0.05,    # smaller learning rate = more precise
    max_depth=4,           # controls complexity
    subsample=0.8,         # prevents overfitting
    colsample_bytree=0.8   # use subset of features for each tree
)

model.fit(X_train, y_train)

# Evaluate accuracy
y_pred = model.predict(X_test)
acc = accuracy_score(y_test, y_pred)
print(f"⚡ XGBoost Accuracy: {acc:.4f}")

# Save model
joblib.dump(model, "breast_cancer_model.pkl")
print("✅ XGBoost model trained and saved successfully!")
