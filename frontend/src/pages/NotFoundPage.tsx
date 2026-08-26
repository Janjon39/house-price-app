import { Link } from "react-router-dom";


export default function NotFoundPage() {
  return (
    <main>
      <h2>404 - Page Not Found</h2>
      <Link to="/">Go to Home</Link>
    </main>
  );
}