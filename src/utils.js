import airports from "./data/airports";
import mockFlights from "./data/mockFlights";

export const getAirport = (code) => {
  const airport = airports.find((airport) => airport.code === code);
  return airport ? airport : null;
};

export const searchFlight = (fromLoc, toLoc, departureDate) => {
  return mockFlights.filter(
    (flight) =>
      flight.fromLoc === fromLoc &&
      flight.toLoc === toLoc &&
      flight.fromDate === departureDate
  );
};

export const getFlight = (flightId) => {
  const flight = mockFlights.find((flight) => flight.id === Number(flightId));
  return flight || null;
};

export const calculateLandingTime = (departureTime, duration) => {
  const hours = duration["hours"];
  const minutes = duration["minutes"];
  const landingTime = new Date(departureTime);
  landingTime.setHours(departureTime.getHours() + hours);
  landingTime.setMinutes(departureTime.getMinutes() + minutes);
  return landingTime;
};
