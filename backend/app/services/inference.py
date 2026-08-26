def predict_price(model, input_df):
    prediction = model.predict(input_df)[0]
    return float(prediction)