import { useLocation } from "react-router-dom";

export default function PassangerInfo() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const flightId = params.get("flightId");
  const fareType = params.get("fareType");

  return (
    <div>
      <h1>Flight ID: {flightId}</h1>
      <p>Fare Type: {fareType || "?"}</p>
    </div>
  );
}
