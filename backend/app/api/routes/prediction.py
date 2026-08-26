from fastapi import APIRouter, Request

from app.schemas.prediction import PredictionRequest, PredictionResponse
from app.services.preprocessing import build_input_dataframe
from app.services.inference import predict_price


router = APIRouter()


@router.get("/health")
def health():
    return {"status": "ok"}


@router.post("/predict", response_model=PredictionResponse)
def predict(request_data: PredictionRequest, request: Request):
    model = request.app.state.model

    input_df = build_input_dataframe(request_data)

    predicted_price = predict_price(model, input_df)

    return {
        "predicted_price": predicted_price
    }