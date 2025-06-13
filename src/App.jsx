import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AccessibleSearchFlight from "./pages/accessible/SearchFlight";
import NonAccessibleSearchFlight from "./pages/nonaccessible/SearchFlight";
import NonAccessibleAvailability from "./pages/nonaccessible/Availability";
import NonAccessiblePassengerInfo from "./pages/nonaccessible/PassengerInfo";
import WelcomePage from "./pages/WelcomePage";
import Availability from "./pages/accessible/Availability";
import PassengerInfo from "./pages/accessible/PassengerInfo";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route
          path="/accessible/SearchFlight"
          element={<AccessibleSearchFlight />}
        />
        <Route path="/accessible/availability" element={<Availability />} />
        <Route path="/accessible/passenger-info" element={<PassengerInfo />} />
        <Route
          path="/nonaccessible/SearchFlight"
          element={<NonAccessibleSearchFlight />}
        />
        <Route
          path="/nonaccessible/availability"
          element={<NonAccessibleAvailability />}
        />
        <Route
          path="/nonaccessible/passenger-info"
          element={<NonAccessiblePassengerInfo />}
        />
      </Routes>
    </Router>
  );
}

export default App;
