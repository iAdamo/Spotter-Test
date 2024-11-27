import Flight from "../assets/flight.jpg";
import { useState } from "react";
import PassengerSelector from "../components/PassengerSelector";
import { ClassSelector } from "../components/ClassSelector";
import { MultiCityFilters } from "../components/MultiCity/MultiCityFilters";
import { RoundtripFilter } from "../components/RoundTrip/RoundtripFilter";
import { OneWayFilter } from "../components/OneWay/OneWayFilter";
import Explore from "../components/Explore";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { flightSearch } from "../endpoints/flightHelper";

const Homepage = () => {
  const [selectedOption, setSelectedOption] = useState("Multi-city");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [flights, setFlights] = useState([]); No API call to set flights
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  // const [endDate, setEndDate] = useState(new Date()); No End Date in API call
  const [passengers, setPassengers] = useState(1);
  const [travelClass, setTravelClass] = useState("Economy");

  const navigate = useNavigate();

  const options = ["Round trip", "One way", "Multi-city"];

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleOriginChange = (origin) => {
    setOrigin(origin);
  };

  const handleDestinationChange = (destination) => {
    setDestination(destination);
  };

  const handleDateChange = (startDate) => {
    setStartDate(startDate);
    // setEndDate(endDate); No End Date in API call
  };

  const handlePassengersChange = (passengers) => {
    setPassengers(passengers);
  };

  const handleClassChange = (travelClass) => {
    setTravelClass(travelClass);
  };

  // Function to render the appropriate filter component
  const renderFilterComponent = () => {
    switch (selectedOption) {
      case "Multi-city":
        return (
          <MultiCityFilters
            onOriginChange={handleOriginChange}
            onDestinationChange={handleDestinationChange}
            onDateChange={handleDateChange}
          />
        );
      case "One way":
        return (
          <OneWayFilter
            onOriginChange={handleOriginChange}
            onDestinationChange={handleDestinationChange}
            onDateChange={handleDateChange}
          />
        );
      case "Round trip":
        return (
          <RoundtripFilter
            onOriginChange={handleOriginChange}
            onDestinationChange={handleDestinationChange}
            onDateChange={handleDateChange}
          />
        );
      default:
        return <MultiCityFilters />;
    }
  };

  const searchFlights = async () => {
    setIsLoading(true);
    try {
      const flightData = await flightSearch({
        origin,
        destination,
        startDate,
        passengers,
        travelClass,
      });
      if (flightData) {
        setIsLoading(false);
      }
      navigate("/FlightDetails", { state: { flights: flightData } });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="lg:px-36 p-2">
      <img src={Flight} className="h-[40vh] w-full" />
      <h1 className="text-center font-semibold text-5xl py-6">Flights</h1>
      <div className="bg-white rounded-md p-8 shadow-2xl flex flex-col space-y-6">
        <div className="inline-flex gap-4">
          <div className="relative w-40">
            <button
              className="w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="flex justify-between items-center">
                <span>{selectedOption}</span>
                {isOpen ? (
                  <FaChevronUp className="text-gray-500" />
                ) : (
                  <FaChevronDown className="text-gray-500" />
                )}
              </div>
            </button>

            {isOpen && (
              <ul className="absolute left-0 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                {options.map((option) => (
                  <li
                    key={option}
                    className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${
                      option === selectedOption
                        ? "text-blue-500 font-semibold"
                        : ""
                    }`}
                    onClick={() => handleOptionClick(option)}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <PassengerSelector onPassengerChange={handlePassengersChange} />
          <ClassSelector onClassChange={handleClassChange} />
        </div>

        {/* Render the appropriate filter component based on selection */}
        {renderFilterComponent()}
        <button
          loading={isLoading}
          disabled={isLoading}
          type="submit"
          className="flex justify-center gap-2 items-center mx-auto shadow-xl text-lg bg-gray-50 backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-blue-500 hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group"
          onClick={searchFlights}
        >
          {isLoading ? "..." : "Search"}
          <svg
            className="w-8 h-8 justify-end group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-none p-2 rotate-45"
            viewBox="0 0 16 19"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
              className="fill-gray-800 group-hover:fill-gray-800"
            ></path>
          </svg>
        </button>
      </div>

      <Explore />
    </div>
  );
};

export default Homepage;
