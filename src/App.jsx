import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AccessibleSearchFlight from "./pages/accessible/SearchFlight";
import NonAccessibleSearchFlight from "./pages/nonaccessible/SearchFlight";
import WelcomePage from "./pages/WelcomePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route
          path="/accessible/SearchFlight"
          element={<AccessibleSearchFlight />}
        />
        <Route
          path="/nonaccessible/SearchFlight"
          element={<NonAccessibleSearchFlight />}
        />
      </Routes>
    </Router>
  );
}

export default App;
