import { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAirport, searchFlight } from "../../utils";
import GoodFlightLogoHeader from "../../assets/GoodFlightLogoHeader.png";
import { Calendar, Plane, Users } from "lucide-react";

export default function Availibility() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const from = params.get("from");
  const to = params.get("to");
  const departure = params.get("departure");
  const passengers = params.get("passengers");
  const navigate = useNavigate();
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFlights = useCallback(async () => {
    try {
      const response = searchFlight(from, to, departure);
      setFlights(response);
      setLoading(false);
      console.log("Flights:", response);
    } catch (error) {
      setError("Failed to fetch flights");
      setLoading(false);
    }
  }, [from, to, departure]);

  useEffect(() => {
    fetchFlights();
    if (error) {
      console.error("Error fetching flights:", error);
    }
  }, [fetchFlights, error]);
  return (
    <div className="grid grid-cols-4 gap-6 px-6 py-4">
      <div className=" col-span-1">
        <FlightInfo
          from={from}
          to={to}
          departure={departure}
          passengers={passengers}
          navigate={navigate}
        />
      </div>
      <div className="col-span-3 p-4 h-fit space-y-4">
        {!loading &&
          flights.map((flight) => (
            <Flight key={flight.id} flight={flight} navigate={navigate} />
          ))}
      </div>
    </div>
  );
}

function Flight({ flight, navigate }) {
  const [showOptions, setShowOptions] = useState(false);
  if (!flight) return null;

  const { fromLoc, toLoc, fromTime, duration, price } = flight;

  const departureTime = new Date(fromTime);
  const arrivalTime = new Date(
    departureTime.getTime() +
      duration.hours * 60 * 60 * 1000 +
      duration.minutes * 60 * 1000
  );

  return (
    <section
      className="flex flex-col gap-4 rounded-lg border-2 p-4"
      aria-labelledby={`flight-${flight.id}-heading`}
      lang="tr"
    >
      <h2 id={`flight-${flight.id}-heading`} className="sr-only">
        {`Uçuş Bilgisi: ${getAirport(fromLoc).name} - ${
          getAirport(toLoc).name
        }, Kalkış: ${departureTime.toLocaleTimeString("tr-TR", {
          hour: "2-digit",
          minute: "2-digit",
        })} - Varış: ${arrivalTime.toLocaleTimeString("tr-TR", {
          hour: "2-digit",
          minute: "2-digit",
        })}, Süre: ${duration.hours} saat ${
          duration.minutes
        } dakika, Fiyat: ${price} Türk Lirası`}
      </h2>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-xl font-semibold" aria-hidden="true">
            {departureTime.toLocaleTimeString("tr-TR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          <p className="font-medium text-xl" aria-hidden="true">
            {fromLoc}
          </p>
        </div>

        <div className="text-center text-sm text-gray-700">
          <p aria-hidden="true">
            {duration.hours}s {duration.minutes}dk
          </p>
        </div>

        <div>
          <p className="text-xl font-semibold text-right" aria-hidden="true">
            {arrivalTime.toLocaleTimeString("tr-TR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          <p className="font-medium text-xl" aria-hidden="true">
            {toLoc}
          </p>
        </div>

        <div className="text-right">
          <p className="text-lg font-bold" aria-hidden="true">
            {price} TRY
          </p>
          <button
            onClick={() => setShowOptions(!showOptions)}
            className="text-blue-600 hover:underline text-sm w-36 text-left px-1"
            aria-expanded={showOptions}
            aria-controls="fare-options"
          >
            {showOptions ? (
              <span className="text-blue-600">
                <span aria-hidden="true">▲</span> Seçenekleri gizle
              </span>
            ) : (
              <span className="text-blue-600">
                <span aria-hidden="true">▼</span> Seçenekleri göster
              </span>
            )}
          </button>
        </div>
      </div>
      {showOptions && (
        <div
          id="fare-options"
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6"
        >
          <FareCard
            type="BASIC"
            packageOption="15 kg bagaj hakkı"
            price={flight.price}
            onClick={() => {
              navigate(
                `/accessible/passenger-info?flightId=${flight.id}&fareType=BASIC`
              );
            }}
          />
          <FareCard
            type="FLEX"
            packageOption={`20 kg bagaj hakkı`}
            price={flight.flexPrice}
            onClick={() => {
              // Handle Flex fare selection
              navigate(
                `/accessible/passenger-info?flightId=${flight.id}&fareType=FLEX`
              );
            }}
          />
          <FareCard
            type="PREMIUM"
            badge="En Popüler"
            packageOption={`25 kg bagaj hakkı
Premium koltuk seçimi
Esnek İade ve Değişiklik`}
            price={flight.premiumPrice}
            onClick={() => {
              // Handle Premium fare selection
              navigate(
                `/accessible/passenger-info?flightId=${flight.id}&fareType=PREMIUM`
              );
            }}
          />
        </div>
      )}
    </section>
  );
}

function FareCard({ onClick, type, packageOption, price, badge }) {
  return (
    <div
      onClick={onClick}
      className="border rounded-md p-4 shadow bg-gray-50 relative h-full flex flex-col justify-between"
    >
      {badge && (
        <div className="absolute top-2 right-2 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded">
          {badge}
        </div>
      )}
      <h3 className="text-lg font-bold mb-2">{type}</h3>
      <ul className="text-sm text-gray-700 mb-4 list-disc pl-4">
        {packageOption.split("\n").map((option, index) => (
          <li key={index}>{option}</li>
        ))}
      </ul>
      <div className="flex items-end">
        <button
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          aria-label={`${type} seçeneği için ödeme yapın ${price} Türk Lirası`}
          onClick={onClick}
        >
          {price} TRY
        </button>
      </div>
    </div>
  );
}

function FlightInfo({ from, to, departure, passengers }) {
  return (
    <section
      className="min-w-60 border rounded-xl h-[60vh] w-[17vw] flex flex-col justify-between"
      aria-labelledby="flight-info-heading"
      lang="tr"
    >
      <h1 id="flight-info-heading" className="sr-only">
        Uçuş Bilgisi Kartı
      </h1>
      <div className="flex justify-center">
        <img
          className="h-16 w-full rounded-t-xl"
          src={GoodFlightLogoHeader}
          alt="Good Flight Logo"
          aria-hidden="true"
        />
      </div>

      <div
        className="flex-1 grid grid-cols-3 px-10"
        role="group"
        aria-label="Kalkış ve varış noktaları"
      >
        <div className="items-center justify-center flex flex-col text-center">
          <div
            className="rounded-lg w-auto flex flex-col items-center justify-center"
            aria-label={`Kalkış noktası: ${getAirportName(from)} havalimanı`}
          >
            <div
              className="h-[3em] w-[3em] bg-gray-300 rounded-md flex items-center justify-center text-2xl mb-2"
              aria-hidden="true"
            >
              {from}
            </div>
            <p aria-hidden="true">{getAirportName(from)}</p>
          </div>
        </div>

        <div className="flex items-center justify-center" aria-hidden="true">
          <Plane className="mb-12 w-[4em] opacity-50" />
        </div>

        <div className="items-center justify-center flex flex-col text-center">
          <div
            className="rounded-lg w-auto flex flex-col items-center justify-center"
            aria-label={`Varış noktası: ${getAirportName(to)} havalimanı`}
          >
            <div
              className="h-[3em] w-[3em] bg-gray-300 rounded-md flex items-center justify-center text-2xl mb-2"
              aria-hidden="true"
            >
              {to}
            </div>
            <p aria-hidden="true">{getAirportName(to)}</p>
          </div>
        </div>
      </div>

      <div
        className="h-20 bg-gray-200 rounded-b-xl border-t-2 border-dashed border-gray-400"
        role="contentinfo"
        aria-label="Yolcu ve tarih bilgisi"
      >
        <div className="flex items-center justify-between h-full px-6">
          <p
            className="text-lg font-bold flex items-center gap-2"
            aria-label={`Yolcu sayısı: ${passengers}`}
          >
            <Users aria-hidden="true" />
            <div aria-hidden="true">{passengers}</div>
          </p>
          <p
            className="text-lg font-bold flex items-center gap-2"
            aria-label={`Tarih: ${new Date(departure).toLocaleDateString(
              "tr-TR"
            )}`}
          >
            <Calendar aria-hidden="true" />
            <div aria-hidden="true">
              {new Date(departure).toLocaleDateString("tr-TR")}
            </div>
          </p>
        </div>
      </div>
    </section>
  );
}

function getAirportName(code) {
  return getAirport(code).name.replace("Havalimanı", "");
}
