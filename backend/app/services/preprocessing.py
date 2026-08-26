import json
import pandas as pd


with open("models/locations.json", "r") as f:
    allowed_locations = set(json.load(f))


def build_input_dataframe(request):
    location_value = (
        request.location
        if request.location in allowed_locations
        else "other"
    )

    data = {
        "carpet_area_sqft": [request.carpet_area_sqft],
        "floor_num": [request.floor_num],
        "bathroom": [request.bathroom],
        "balcony": [request.balcony],
        "location_grouped": [location_value],
        "Furnishing": [request.furnishing],
        "Transaction": [request.transaction],
        "Ownership": [request.ownership],
        "facing": [request.facing],
    }

    return pd.DataFrame(data)