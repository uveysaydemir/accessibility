//ACCESSIBLE

import { useState } from "react";

const SearchFlight = () => {
  return (
    <div
      className="container"
      style={{ backgroundColor: "#f0f0f0", padding: "20px" }}
    >
      <h1>Accessible Search Flight</h1>
      <div className="search-flight">
        <form>
          <InputArea label="Departure" id="departure" name="departure" />
          <InputArea label="Arrival" id="arrival" name="arrival" />
          <InputArea label="Date" id="date" name="date" />

          <button type="submit">Search</button>
        </form>
        <div className="flight-results">
          <h2>Flight Results</h2>
          <ul>
            <li>Flight 1: Departure - Arrival - Date</li>
            <li>Flight 2: Departure - Arrival - Date</li>
            <li>Flight 3: Departure - Arrival - Date</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SearchFlight;

const InputArea = ({ label, id, name }) => {
  return (
    <div
      style={{
        marginBottom: "10px",
        display: "flex",
        alignItems: "center",
        backgroundColor: "#ff0",
      }}
    >
      <label htmlFor={id}>{label}</label>
      <input type="text" id={id} name={name} />
    </div>
  );
};
