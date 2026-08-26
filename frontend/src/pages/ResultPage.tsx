import { Link, useLocation } from "react-router-dom";


export default function ResultPage() {
  const location = useLocation();

  const predictedPrice = location.state?.predictedPrice;

  if (predictedPrice === undefined) {
    return (
      <main>
        <h2>No prediction available</h2>
        <Link to="/">Go back</Link>
      </main>
    );
  }

  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(predictedPrice);

  return (
    <main>
      <h2>Predicted House Price</h2>

      <h1>{formattedPrice}</h1>

      <Link to="/">Make another prediction</Link>
    </main>
  );
}