import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import FlightDetails from "./Pages/FlightDetails";
import { Navbar}  from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />

          <Route path="/FlightDetails" element={<FlightDetails />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
