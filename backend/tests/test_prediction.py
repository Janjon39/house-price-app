from fastapi.testclient import TestClient

from app.main import app


def test_predict_success():
    with TestClient(app) as client:
        response = client.post(
            "/predict",
            json={
                "location": "new-delhi",
                "carpet_area_sqft": 1000,
                "floor_num": 3,
                "bathroom": 2,
                "balcony": 2,
                "furnishing": "Semi-Furnished",
                "transaction": "Resale",
                "ownership": "Freehold",
                "facing": "East"
            }
        )

        assert response.status_code == 200
        assert "predicted_price" in response.json()


def test_predict_invalid_input():
    with TestClient(app) as client:
        response = client.post(
            "/predict",
            json={
                "location": "new-delhi"
            }
        )

        assert response.status_code == 422