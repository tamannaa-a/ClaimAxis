import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
import joblib
import os

# Expect a CSV 'document_training_data.csv' with columns: text,label (label is integer 0..7)
if __name__ == '__main__':
    path = os.path.join(os.path.dirname(__file__), '..', 'data', 'document_training_data.csv')
    if not os.path.exists(path):
        print('No training CSV found at', path)
        print('Please add a dataset or use synthetic generation script')
    else:
        df = pd.read_csv(path)
        vectorizer = TfidfVectorizer(max_features=5000)
        X = vectorizer.fit_transform(df['text'])
        y = df['label']
        model = LogisticRegression(max_iter=2000)
        model.fit(X, y)
        models_dir = os.path.join(os.path.dirname(__file__), 'models')
        os.makedirs(models_dir, exist_ok=True)
        joblib.dump(vectorizer, os.path.join(models_dir, 'doc_vectorizer.joblib'))
        joblib.dump(model, os.path.join(models_dir, 'doc_classifier.joblib'))
        print('Saved document classifier models')
