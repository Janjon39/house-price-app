import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { predictHousePrice } from "../api/predictionClient";
import type { PredictionRequest } from "../types/prediction";


export default function PredictionForm() {
  const navigate = useNavigate();

  const [locations, setLocations] = useState<string[]>([]);

  const [formData, setFormData] = useState<PredictionRequest>({
    location: "",
    carpet_area_sqft: 0,
    floor_num: 0,
    bathroom: 1,
    balcony: 0,
    furnishing: "Unfurnished",
    transaction: "Resale",
    ownership: "Freehold",
    facing: "East",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  useEffect(() => {
    fetch("/locations.json")
      .then((response) => response.json())
      .then((data) => setLocations(data))
      .catch(() => setError("Could not load locations."));
  }, []);


  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value, type } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: type === "number" ? Number(value) : value,
    }));
  }


  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");

    if (!formData.location) {
      setError("Please select a location.");
      return;
    }

    if (formData.carpet_area_sqft <= 0) {
      setError("Carpet area must be greater than 0.");
      return;
    }

    try {
      setLoading(true);

      const result = await predictHousePrice(formData);

      navigate("/result", {
        state: {
          predictedPrice: result.predicted_price,
        },
      });
    } catch {
      setError("Prediction failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }


  return (
    <form onSubmit={handleSubmit}>
      <h2>House Price Prediction</h2>

      <label>
        Location
        <select
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        >
          <option value="">Select location</option>

          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </label>

      <label>
        Carpet Area (sqft)
        <input
          type="number"
          name="carpet_area_sqft"
          value={formData.carpet_area_sqft}
          onChange={handleChange}
          min="1"
          required
        />
      </label>

      <label>
        Floor Number
        <input
          type="number"
          name="floor_num"
          value={formData.floor_num}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Bathrooms
        <input
          type="number"
          name="bathroom"
          value={formData.bathroom}
          onChange={handleChange}
          min="0"
          required
        />
      </label>

      <label>
        Balconies
        <input
          type="number"
          name="balcony"
          value={formData.balcony}
          onChange={handleChange}
          min="0"
          required
        />
      </label>

      <label>
        Furnishing
        <select
          name="furnishing"
          value={formData.furnishing}
          onChange={handleChange}
        >
          <option value="Furnished">Furnished</option>
          <option value="Semi-Furnished">Semi-Furnished</option>
          <option value="Unfurnished">Unfurnished</option>
        </select>
      </label>

      <label>
        Transaction
        <select
          name="transaction"
          value={formData.transaction}
          onChange={handleChange}
        >
          <option value="Resale">Resale</option>
          <option value="New Property">New Property</option>
        </select>
      </label>

      <label>
        Ownership
        <input
          type="text"
          name="ownership"
          value={formData.ownership}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Facing
        <input
          type="text"
          name="facing"
          value={formData.facing}
          onChange={handleChange}
          required
        />
      </label>

      {error && <p>{error}</p>}

      <button type="submit" disabled={loading}>
        {loading ? "Predicting..." : "Predict Price"}
      </button>
    </form>
  );
}