import { useLocation } from "react-router-dom";
import BadFlightLogoHeader from "../../assets/BadFlightLogoHeader.png";
import { getAirport, getFlight } from "../../utils";
import { Calendar, Plane, Users } from "lucide-react";
import { useEffect } from "react";

export default function PassengerInfo() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const flightId = params.get("flightId");
  const fareType = params.get("fareType");

  const from = getFlight(flightId)?.fromLoc;
  const to = getFlight(flightId)?.toLoc;
  const departure = getFlight(flightId)?.fromTime;
  const duration = getFlight(flightId)?.duration || { hours: 0, minutes: 0 };
  const price =
    fareType === "BASIC"
      ? getFlight(flightId)?.price
      : fareType === "FLEX"
      ? getFlight(flightId)?.flexPrice
      : fareType === "PREMIUM"
      ? getFlight(flightId)?.premiumPrice
      : null;
  useEffect(() => {
    console.log(getFlight(flightId));
  }, [flightId]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="flex justify-center mt-4 gap-8">
        <FlightInfo
          from={from}
          to={to}
          departure={departure}
          passengers="1"
          duration={duration}
          fareType={fareType}
          price={price}
        />
        <PaymentForm price={price} />
      </div>
    </div>
  );
}

function FlightInfo({
  from,
  to,
  departure,
  passengers,
  duration,
  fareType,
  price,
}) {
  return (
    <div className="min-w-60 border rounded-xl h-[60vh] w-[17vw] flex flex-col justify-between">
      <div className="flex justify-center">
        <img
          className="h-16 w-full rounded-t-xl"
          src={BadFlightLogoHeader}
          alt="logo"
        />
      </div>
      <div className="">
        <div className="flex-1 grid grid-cols-3 px-10 mb-4">
          <div className="items-center justify-center flex flex-col text-center">
            <div className="rounded-lg w-auto flex flex-col items-center justify-center">
              <div className="h-[3em] w-[3em] bg-gray-300 rounded-md flex items-center justify-center text-2xl mb-2">
                {from}
              </div>
              <p>{getAirportName(from)}</p>
              <p>
                {new Date(departure).toLocaleTimeString("tr-TR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center flex-col text-center mb-16">
            <Plane className="w-[4em] opacity-50" />
            <div className="text-center">
              <p className="">
                {duration.hours}s {duration.minutes}dk
              </p>
            </div>
          </div>
          <div className="items-center justify-center flex flex-col text-center">
            <div className="rounded-lg w-auto flex flex-col items-center justify-center">
              <div className="h-[3em] w-[3em] bg-gray-300 rounded-md flex items-center justify-center text-2xl mb-2">
                {to}
              </div>
              <p>{getAirportName(to)}</p>
              <p>
                {new Date(
                  new Date(departure).getTime() +
                    (duration.hours * 60 + duration.minutes) * 60 * 1000
                ).toLocaleTimeString("tr-TR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center flex-col gap-4">
          <div className="flex items-center justify-between w-full px-6 flex-col">
            <p className="text-lg font-bold">Uçuş Tipi</p>
            <p className="text-lg text-bold">{fareType}</p>
          </div>
        </div>
      </div>
      <div className="h-20 bg-gray-200 rounded-b-xl border-t-2 border-dashed border-gray-400">
        <div className="flex items-center justify-between h-full px-6">
          <p className=" text-lg font-bold flex items-center gap-2">
            <span>
              <Users />
            </span>
            {passengers}
          </p>
          <p className=" text-lg font-bold flex items-center gap-2">
            <span>
              <Calendar />
            </span>
            {new Date(departure).toLocaleDateString("tr-TR")}
          </p>
        </div>
      </div>
    </div>
  );
}
function getAirportName(code) {
  return getAirport(code).name.replace("Havalimanı", "");
}

function PaymentForm({ price }) {
  return (
    <div className="min-w-60 border rounded-xl h-[60vh] w-[20vw] flex flex-col justify-between p-6 bg-white shadow-md">
      <div className="text-xl font-bold mb-4 text-center">Ödeme Bilgileri</div>
      <div className="mb-6 text-center">
        <p className="text-lg mb-2">Toplam Tutar</p>
        <p className="font-bold text-lg">{price} TRY</p>
      </div>
      <form
        className="flex flex-col gap-4"
        autoComplete="off"
        name="payment-form"
      >
        <div>
          <label className="block text-sm font-medium mb-1">
            Kart Numarası
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="1234 5678 9012 3456"
            autoComplete="off"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Ad Soyad</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Adınız Soyadınız"
            autoComplete="off"
          />
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">SKT</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="AA/YY"
              autoComplete="off"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">CVV</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="123"
              autoComplete="off"
            />
          </div>
        </div>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded mt-4"
          onClick={(e) => {
            e.preventDefault();
            alert("Ödeme işlemi başarıyla tamamlandı!");
            window.location.href = "/";
          }}
        >
          Ödemeyi Tamamla
        </button>
      </form>
    </div>
  );
}
