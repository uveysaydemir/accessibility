//ACCESSIBLE
import { Calendar, PlaneLanding, PlaneTakeoff, User } from "lucide-react";
import React, { useState, useRef } from "react";
import HeaderLogo from "../../assets/GoodFlightLogoHeader.png";
import { useNavigate } from "react-router-dom";
import airports from "../../data/airports";

const SearchFlight = () => {
  const navigate = useNavigate();
  const [tripType, setTripType] = useState("one-way");
  const [departureDate, setDepartureDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [returnDate] = useState();
  const [passengers, setPassengers] = useState("1");
  // New state for From and To input values
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  // New state for search results
  const [errors, setErrors] = useState({});

  // Refs for inputs
  const fromRef = useRef(null);
  const toRef = useRef(null);
  const departureRef = useRef(null);
  const returnRef = useRef(null);

  // Handler for searching flights
  const handleSearch = () => {
    const newErrors = {};
    if (!from) newErrors.from = "Required input field";
    if (!to) newErrors.to = "Required input field";
    if (!departureDate) newErrors.departureDate = "Required input field";
    if (tripType === "round-trip" && !returnDate)
      newErrors.returnDate = "Required input field";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Focus first errored field
      if (newErrors.from && fromRef.current) {
        fromRef.current.focus();
      } else if (newErrors.to && toRef.current) {
        toRef.current.focus();
      } else if (newErrors.departureDate && departureRef.current) {
        departureRef.current.focus();
      } else if (newErrors.returnDate && returnRef.current) {
        returnRef.current.focus();
      }
      return false;
    }
    return true;
  };

  // Function to clear a field's error
  const clearFieldError = (field) => {
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[field];
      return newErrors;
    });
  };

  return (
    <div className="bg-[#effff0] min-h-screen flex flex-col items-center">
      <div className="w-full h-[400px]">
        <img
          className=" w-full h-[40vh] rounded-xl"
          src={HeaderLogo}
          alt="Good Flight Logo"
        />
      </div>
      <div className="relative z-10 -mt-20 px-5">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-screen-xl mx-auto">
          <h1 className="text-xl font-semibold mb-6">
            Erişilebilir Uçuş Arama
          </h1>
          {/* Trip Type Selection */}
          <div className="flex space-x-6 mb-6">
            <label className="flex items-center space-x-2 text-gray-700">
              <input
                type="radio"
                name="tripType"
                value="one-way"
                checked={tripType === "one-way"}
                onChange={() => setTripType("one-way")}
                className="accent-blue-600"
              />
              <span>Tek Yön</span>
            </label>
          </div>

          {/* Input Fields */}
          <div className="grid grid-cols-5 gap-4">
            {/* From */}
            <div className="flex flex-col space-y-1 bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center space-x-2">
                <PlaneTakeoff className="text-gray-500" />
                <InputArea
                  label={Labels.FROM}
                  type="text"
                  data={airports}
                  value={from}
                  setValue={setFrom}
                  error={errors.from}
                  ref={fromRef}
                  clearError={() => clearFieldError("from")}
                />
              </div>
            </div>

            {/* To */}
            <div className="flex flex-col space-y-1 bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center space-x-2">
                <PlaneLanding className="text-gray-500" />
                <InputArea
                  label={Labels.TO}
                  type="text"
                  data={airports}
                  value={to}
                  setValue={setTo}
                  error={errors.to}
                  ref={toRef}
                  clearError={() => clearFieldError("to")}
                />
              </div>
            </div>

            {/* Departure */}
            <div className="flex flex-col space-y-1 bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center space-x-2" lang="tr">
                <Calendar className="text-gray-500" />
                <InputArea
                  label={Labels.DEPARTURE}
                  placeholder="Select"
                  type="date"
                  value={
                    departureDate
                      ? departureDate
                      : new Date().toISOString().split("T")[0]
                  }
                  setValue={setDepartureDate}
                  error={errors.departureDate}
                  ref={departureRef}
                  clearError={() => clearFieldError("departureDate")}
                />
              </div>
            </div>

            {/* Passengers */}
            <div
              className="flex items-center space-x-2 bg-gray-50 p-3 rounded-lg"
              lang="tr"
            >
              <User className="text-gray-500" />
              <InputArea
                label={Labels.PASSENGERS}
                placeholder="1"
                type="number"
                data={airports}
                value={passengers}
                setValue={setPassengers}
              />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              className="bg-blue-500 text-white rounded-lg px-6 py-2 hover:bg-blue-600"
              onClick={() => {
                if (!handleSearch()) return;
                navigate(
                  `/accessible/availability?from=${getPortCode(
                    from
                  )}&to=${getPortCode(
                    to
                  )}&departure=${departureDate}&return=${returnDate}&passengers=${passengers}&tripType=${tripType}`
                );
              }}
            >
              Uçuş Ara
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFlight;

const InputArea = React.forwardRef(
  (
    { label, placeholder, type, data = [], value, setValue, error, clearError },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(0);
    const listRef = useRef(null);

    // Use controlled value if provided, otherwise use internal state
    const inputValue = typeof value === "string" ? value : internalValue;
    const setInputValue =
      typeof setValue === "function" ? setValue : setInternalValue;

    const filteredOptions =
      type === "text" && inputValue
        ? data?.filter((item) => {
            const q = inputValue.toLocaleLowerCase("tr");
            return (
              item.city.toLocaleLowerCase("tr").includes(q) ||
              item.name.toLocaleLowerCase("tr").includes(q) ||
              item.code.toLocaleLowerCase("tr").includes(q)
            );
          })
        : [];
    const errorId = error ? `${label}-error` : undefined;
    return (
      <div className="flex flex-col rounded-lg p-2">
        <label htmlFor={label} className="text-gray-600 text-sm">
          {label}
        </label>
        <div className="relative">
          <input
            id={label}
            placeholder={placeholder}
            className="rounded-md p-2 w-full"
            type={type}
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setShowDropdown(true);
            }}
            onBlur={(e) => {
              setTimeout(() => {
                if (!listRef.current?.contains(document.activeElement)) {
                  setShowDropdown(false);
                }
              }, 100);
            }}
            min={
              label === "Yolcu Sayısı"
                ? 1
                : type === "date"
                ? new Date().toISOString().split("T")[0]
                : undefined
            }
            onInput={(e) => {
              if (label === "Yolcu Sayısı" && parseInt(e.target.value) < 1) {
                e.target.value = 1;
                setInputValue("1");
              }
            }}
            autoComplete="off"
            ref={ref}
            aria-invalid={error ? "true" : undefined}
            aria-describedby={errorId}
            lang="tr"
            role="combobox"
            aria-haspopup="listbox"
            aria-expanded={showDropdown}
            aria-controls="airport-list"
            aria-activedescendant={
              showDropdown ? `option-${highlightedIndex}` : undefined
            }
            onKeyDown={(e) => {
              if (filteredOptions.length === 0) return;

              if (e.key === "ArrowDown") {
                e.preventDefault();
                setShowDropdown(true);
                setHighlightedIndex(
                  (prev) => (prev + 1) % filteredOptions.length
                );
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setShowDropdown(true);
                setHighlightedIndex((prev) =>
                  prev === 0 ? filteredOptions.length - 1 : prev - 1
                );
              } else if (e.key === "Enter" && showDropdown) {
                e.preventDefault();
                const selectedItem = filteredOptions[highlightedIndex];
                if (selectedItem) {
                  setInputValue(
                    `${selectedItem.name}, ${selectedItem.city}, ${selectedItem.code}`
                  );
                  setShowDropdown(false);
                  if (typeof clearError === "function") clearError();
                }
              }
            }}
          />
          {showDropdown && filteredOptions.length > 0 && (
            <ul
              ref={listRef}
              role="listbox"
              className="absolute left-0 right-0 top-full bg-white border border-gray-200 rounded-md shadow-md mt-1 max-h-48 overflow-y-auto z-10"
              id="airport-list"
              tabIndex="0"
            >
              {filteredOptions.map((item, index) => (
                <li
                  key={index}
                  id={`option-${index}`}
                  role="option"
                  aria-selected={highlightedIndex === index}
                  className={`px-3 py-2 cursor-pointer text-sm ${
                    highlightedIndex === index
                      ? "bg-blue-100"
                      : "hover:bg-gray-100"
                  }`}
                  onMouseDown={() => {
                    setInputValue(`${item.name}, ${item.city}, ${item.code}`);
                    setShowDropdown(false);
                    if (typeof clearError === "function") clearError();
                  }}
                  aria-label={`${item.name}, ${item.city}, ${item.code}`}
                  lang="tr"
                  tabIndex={-1}
                >
                  {item.name}, {item.city}, {item.code}
                </li>
              ))}
            </ul>
          )}
        </div>
        {error && (
          <p
            id={errorId}
            className="text-sm text-red-500 mt-1"
            aria-live="polite"
          >
            {label === "Kalkış"
              ? "Lütfen kalkış noktasını giriniz"
              : label === "Varış"
              ? "Lütfen varış noktasını giriniz"
              : label === "Tarih"
              ? "Lütfen kalkış tarihini giriniz"
              : "Lütfen gerekli alanı doldurun"}
          </p>
        )}
      </div>
    );
  }
);

const getPortCode = (info) => {
  const portCode = info.split(",")[2];
  if (portCode) {
    return portCode.trim();
  }
  return null;
};

class Labels {
  static FROM = "Kalkış";
  static TO = "Varış";
  static DEPARTURE = "Tarih";
  static RETURN = "Dönüş";
  static PASSENGERS = "Yolcu Sayısı";
}
