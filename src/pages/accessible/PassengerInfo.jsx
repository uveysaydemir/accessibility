import { useLocation } from "react-router-dom";
import GoodFlightLogoHeader from "../../assets/GoodFlightLogoHeader.png";
import { getAirport, getFlight } from "../../utils";
import { Calendar, Plane, Users } from "lucide-react";
import { useState, useEffect } from "react";

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
    getFlight(flightId);
  }, [flightId]);
  return (
    <main
      className="flex flex-col items-center justify-center min-h-screen p-4"
      lang="tr"
    >
      <h1 className="sr-only">Ödeme sayfası</h1>
      <div className="flex flex-col lg:flex-row justify-center mt-4 gap-6 w-full px-4 max-w-screen-xl">
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
    </main>
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
    <section
      className="w-full lg:w-[45%] border rounded-xl min-h-[60vh] flex flex-col justify-between"
      aria-labelledby="flight-info-heading"
    >
      <h2 id="flight-info-heading" className="sr-only">
        Uçuş Bilgisi Kartı
      </h2>
      <div className="flex justify-center">
        <img
          className="h-16 w-full rounded-t-xl"
          src={GoodFlightLogoHeader}
          alt="logo"
          aria-hidden="true"
        />
      </div>
      <div className="">
        <div
          className="flex flex-wrap justify-center gap-y-6 gap-x-4 px-6 sm:px-10 mb-4"
          aria-label={`Kalkış noktası: ${getAirportName(
            from
          )} havalimanı, Varış noktası: ${getAirportName(
            to
          )} havalimanı, Kalkış: ${new Date(departure).toLocaleTimeString(
            "tr-TR",
            {
              hour: "2-digit",
              minute: "2-digit",
            }
          )}, 
        Varış: ${new Date(
          new Date(departure).getTime() +
            (duration.hours * 60 + duration.minutes) * 60 * 1000
        ).toLocaleTimeString("tr-TR", {
          hour: "2-digit",
          minute: "2-digit",
        })},
        Uçuş süresi: ${duration.hours} saat ${duration.minutes} dakika`}
        >
          <div className="flex flex-col items-center justify-center text-center space-y-2 flex-1 min-w-[120px]">
            <div className="rounded-lg w-auto flex flex-col items-center justify-center">
              <div
                className="h-[3em] w-[3em] bg-gray-300 rounded-md flex items-center justify-center text-2xl mb-2"
                aria-hidden="true"
              >
                {from}
              </div>
              <p aria-hidden="true">{getAirportName(from)}</p>
              <p aria-hidden="true">
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
              <p className="" aria-hidden="true">
                {duration.hours}s {duration.minutes}dk
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center text-center space-y-2 flex-1 min-w-[120px]">
            <div className="rounded-lg w-auto flex flex-col items-center justify-center">
              <div
                className="h-[3em] w-[3em] bg-gray-300 rounded-md flex items-center justify-center text-2xl mb-2"
                aria-hidden="true"
              >
                {to}
              </div>
              <p aria-hidden="true">{getAirportName(to)}</p>
              <p aria-hidden="true">
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
          <div
            className="flex items-center justify-between w-full px-6 flex-col"
            aria-label={`Uçuş tipi: ${fareType}, Fiyat: ${price} Türk Lirası`}
          >
            <p className="text-lg font-bold" aria-hidden="true">
              Uçuş Tipi
            </p>
            <p className="text-lg text-bold" aria-hidden="true">
              {fareType}
            </p>
          </div>
        </div>
      </div>
      <div className="h-20 bg-gray-200 rounded-b-xl border-t-2 border-dashed border-gray-400">
        <div
          className="flex items-center justify-between h-full px-6"
          aria-label={`Yolcu sayısı: ${passengers}, Tarih: ${new Date(
            departure
          ).toLocaleDateString("tr-TR")}`}
        >
          <p
            className=" text-lg font-bold flex items-center gap-2"
            aria-hidden="true"
          >
            <span>
              <Users />
            </span>
            {passengers}
          </p>
          <p
            className=" text-lg font-bold flex items-center gap-2"
            aria-hidden="true"
          >
            <span>
              <Calendar />
            </span>
            {new Date(departure).toLocaleDateString("tr-TR")}
          </p>
        </div>
      </div>
    </section>
  );
}
function getAirportName(code) {
  return getAirport(code).name.replace("Havalimanı", "");
}

function PaymentForm({ price }) {
  const [expiry, setExpiry] = useState("");

  const handleExpiryChange = (e) => {
    let input = e.target.value.replace(/\D/g, ""); // remove non-digits
    if (input.length >= 3) {
      input = input.slice(0, 2) + "/" + input.slice(2, 4);
    }
    setExpiry(input);
  };

  const blockNonNumeric = (e) => {
    const allowed = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"];
    if (!/^\d$/.test(e.key) && !allowed.includes(e.key)) {
      e.preventDefault();
    }
  };

  const blockNonAlphabetic = (e) => {
    const allowed = [
      "Backspace",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "Tab",
      " ",
    ];
    if (!/^[a-zA-ZğüşöçİĞÜŞÖÇ\s]$/.test(e.key) && !allowed.includes(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <section
      className="border rounded-xl w-full lg:w-[45%] flex flex-col justify-between p-6 bg-white shadow-md min-h-[60vh]"
      aria-labelledby="payment-form-heading"
    >
      <h2
        id="payment-form-heading"
        className="text-xl font-bold mb-3 text-center"
      >
        Ödeme Bilgileri
      </h2>
      <div
        className="mb-6 text-center"
        aria-label={`Toplam tutar: ${price} Türk Lirası`}
      >
        <p className="text-lg mb-2" aria-hidden="true">
          Toplam Tutar
        </p>
        <p className="font-bold text-lg" aria-hidden="true">
          {price} TRY
        </p>
      </div>
      <form
        className="flex flex-col gap-3"
        autoComplete="off"
        name="payment-form"
      >
        <div>
          <label
            id="cardNumber-label"
            htmlFor="cardNumber"
            className="block text-sm font-medium mb-1"
            aria-hidden="true"
          >
            Kart Numarası
          </label>
          <input
            id="cardNumber"
            aria-labelledby="cardNumber-label"
            aria-describedby="cardNumber-hint"
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2"
            autoComplete="off"
            inputMode="numeric"
            maxLength={16}
            onKeyDown={blockNonNumeric}
          />
          <p
            id="cardNumber-hint"
            className="text-xs text-gray-500"
            aria-hidden="true"
          >
            16 haneli kart numarası girin
          </p>
        </div>

        <div>
          <label
            id="nameOnCard-label"
            htmlFor="nameOnCard"
            className="block text-sm font-medium mb-1"
            aria-hidden="true"
          >
            Ad Soyad
          </label>
          <input
            id="nameOnCard"
            aria-labelledby="nameOnCard-label"
            aria-describedby="nameOnCard-hint"
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2"
            autoComplete="off"
            onKeyDown={blockNonAlphabetic}
          />
          <p
            id="nameOnCard-hint"
            className="text-xs text-gray-500"
            aria-hidden="true"
          >
            Kart üzerindeki ad ve soyadı girin
          </p>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label
              id="expiry-label"
              htmlFor="expiry"
              className="block text-sm font-medium mb-1"
              aria-hidden="true"
            >
              Son Kullanma Tarihi
            </label>
            <input
              id="expiry"
              aria-labelledby="expiry-label"
              aria-describedby="expiry-hint"
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2"
              autoComplete="off"
              onKeyDown={blockNonNumeric}
              inputMode="numeric"
              maxLength={5}
              value={expiry}
              onChange={handleExpiryChange}
            />
            <p
              id="expiry-hint"
              className="text-xs text-gray-500"
              aria-hidden="true"
            >
              Son kullanma tarihini AA/YY formatında girin
            </p>
          </div>

          <div className="flex-1">
            <label
              id="cvv-label"
              htmlFor="cvv"
              className="block text-sm font-medium mb-1"
              aria-hidden="true"
            >
              Güvenlik Kodu (CVV)
            </label>
            <input
              id="cvv"
              aria-labelledby="cvv-label"
              aria-describedby="cvv-hint"
              type="password"
              className="w-full border border-gray-300 rounded px-3 py-2"
              autoComplete="off"
              inputMode="numeric"
              maxLength={3}
              onKeyDown={blockNonNumeric}
            />
            <p
              id="cvv-hint"
              className="text-xs text-gray-500"
              aria-hidden="true"
            >
              Kartınızın arkasındaki 3 haneli güvenlik kodunu girin
            </p>
          </div>
        </div>

        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded mt-4"
          onClick={(e) => {
            e.preventDefault();

            const cardNumber = document
              .getElementById("cardNumber")
              .value.trim();
            const nameOnCard = document
              .getElementById("nameOnCard")
              .value.trim();
            const cvv = document.getElementById("cvv").value.trim();

            if (!cardNumber || !nameOnCard || !expiry || !cvv) {
              alert("Lütfen tüm alanları doldurun.");
              return;
            }
            const validCardNumber = "4111 1111 1111 1111";
            const validNameOnCard = "John Doe";
            const validExpiry = "08/26";
            const validCvv = "439";

            if (
              cardNumber === validCardNumber.replaceAll(" ", "").trim() &&
              nameOnCard.toLowerCase() === validNameOnCard.toLowerCase() &&
              expiry === validExpiry &&
              cvv === validCvv
            ) {
              alert("Ödeme işlemi başarıyla tamamlandı!");
              // window.location.href = "/";
              const alertElement = document.createElement("div");
              alertElement.setAttribute("role", "alert");
              alertElement.setAttribute("aria-live", "assertive");
              alertElement.style.position = "absolute";
              alertElement.style.top = "-9999px";
              alertElement.textContent = "Ödeme işlemi başarıyla tamamlandı!";
              document.body.appendChild(alertElement);

              setTimeout(() => {
                document.body.removeChild(alertElement);
              }, 3000);
            } else {
              alert("Ödeme bilgileri geçersiz.");
            }
          }}
        >
          Ödemeyi Tamamla
        </button>
      </form>
    </section>
  );
}
