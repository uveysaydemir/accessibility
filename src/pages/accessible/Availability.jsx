import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function Availibility() {
  const [showOptions, setShowOptions] = useState(false);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const from = params.get("from");
  const to = params.get("to");
  const departure = params.get("departure");
  const ret = params.get("return");
  const passengers = params.get("passengers");
  const tripType = params.get("tripType");
  const departureTime = new Date();

  return (
    <div className="border rounded-md p-4 max-w-5xl mx-auto my-6 bg-white shadow">
      <div className="mb-4 text-gray-700">
        <p>
          <strong>From:</strong> {from}
        </p>
        <p>
          <strong>To:</strong> {to}
        </p>
        <p>
          <strong>Departure:</strong> {departure}
        </p>
        {tripType === "round-trip" && (
          <p>
            <strong>Return:</strong> {ret}
          </p>
        )}
        <p>
          <strong>Passengers:</strong> {passengers}
        </p>
        <p>
          <strong>Trip Type:</strong> {tripType}
        </p>
      </div>
      {/* Flight Header */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-xl font-semibold">
            {departureTime.toLocaleTimeString("tr-TR", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </p>
          <p className="font-medium">{from}</p>
        </div>

        <div className="text-center text-sm text-gray-700">
          <p>10h 25m</p>
        </div>

        <div>
          <p className="text-xl font-semibold text-right">
            {new Date(
              departureTime.setHours(
                departureTime.getHours() + 3,
                departureTime.getMinutes() + 15
              )
            ).toLocaleTimeString("tr-TR", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </p>
          <p className="font-medium text-right">{to}</p>
        </div>

        <div className="text-right">
          <p className="text-lg font-bold">7.761,89 TRY</p>
          <button
            onClick={() => setShowOptions(!showOptions)}
            className="text-blue-600 hover:underline text-sm"
            aria-expanded={showOptions}
            aria-controls="fare-options"
          >
            {showOptions ? "▲ Hide options" : "▼ Show options"}
          </button>
        </div>
      </div>

      {/* Fare Options */}
      {showOptions && (
        <div
          id="fare-options"
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6"
        >
          <FareCard
            type="BASIC"
            baggage="• 15 kg baggage allowance"
            price="7.761,89 TRY"
          />
          <FareCard
            type="FLEX"
            baggage="• 20 kg baggage allowance \n• Standard seat selection"
            price="8.961,89 TRY"
          />
          <FareCard
            type="PREMIUM"
            badge="RECOMMENDED"
            baggage="• 25 kg baggage allowance\n• Premium seat selection\n• Flexible Refund"
            price="9.311,89 TRY"
          />
        </div>
      )}
    </div>
  );
}

function FareCard({ type, baggage, price, badge }) {
  return (
    <div className="border rounded-md p-4 shadow bg-gray-50 relative">
      {badge && (
        <div className="absolute top-2 right-2 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded">
          {badge}
        </div>
      )}
      <h3 className="text-lg font-bold mb-2">{type}</h3>
      <ul className="text-sm text-gray-700 mb-4 whitespace-pre-line">
        {baggage}
      </ul>
      <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
        {price}
      </button>
    </div>
  );
}
