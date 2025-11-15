import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.calibration import CalibratedClassifierCV
from sklearn.metrics import classification_report, roc_auc_score
import joblib
import os

# Create synthetic dataset if none exists

def make_synthetic(n=1000):
    import random
    rows = []
    for i in range(n):
        amt = abs(int(np.random.exponential(5) * 10000))
        prior = np.random.binomial(2, 0.2)
        days = int(np.random.uniform(10, 1000))
        kw = np.random.binomial(1, 0.1)
        # simple fraud rule to generate labels
        prob = 0.2
        if amt > 200000:
            prob += 0.4
        if prior >= 1:
            prob += 0.2
        if kw:
            prob += 0.2
        label = 1 if np.random.rand() < prob else 0
        rows.append([amt, prior, days, kw, label])
    df = pd.DataFrame(rows, columns=['amount','prior','days','kw','label'])
    return df

if __name__ == '__main__':
    df = make_synthetic(2000)
    X = df[['amount','prior','days','kw']]
    # feature transform: log(amount)
    X['log_amt'] = np.log1p(X['amount'])
    X = X[['log_amt','prior','days','kw']]
    y = df['label']

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    base = RandomForestClassifier(n_estimators=100, random_state=42)
    calib = CalibratedClassifierCV(base, cv=3, method='sigmoid')

    calib.fit(X_train, y_train)

    y_pred = calib.predict(X_test)
    print('Classification report:')
    print(classification_report(y_test, y_pred))
    try:
        y_prob = calib.predict_proba(X_test)[:,1]
        print('ROC AUC:', roc_auc_score(y_test, y_prob))
    except Exception:
        pass

    models_dir = os.path.join(os.path.dirname(__file__), 'models')
    os.makedirs(models_dir, exist_ok=True)
    joblib.dump(calib, os.path.join(models_dir, 'fraud_model.joblib'))
    print('Saved calibrated model to', models_dir)
