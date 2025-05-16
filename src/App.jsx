import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AccessibleSearchFlight from "./pages/accessible/SearchFlight";
import NonAccessibleSearchFlight from "./pages/nonaccessible/SearchFlight";
import WelcomePage from "./pages/WelcomePage";
import Availability from "./pages/accessible/Availability";

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
        <Route
          path="/nonaccessible/SearchFlight"
          element={<NonAccessibleSearchFlight />}
        />
      </Routes>
    </Router>
  );
}

export default App;
