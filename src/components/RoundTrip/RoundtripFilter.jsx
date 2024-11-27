import { RoundtripCitySearch } from "./RoundtripCitySearch";
import { RoundtripDatePicker } from "./RoundtripDatePicker";
import PropTypes from "prop-types";

export const RoundtripFilter = ({
  onOriginChange,
  onDestinationChange,
  onDateChange,
}) => {
  return (
    <div className="lg:inline-flex lg:flex-row flex-col gap-4 w-full">
      <RoundtripCitySearch
        onOriginChange={onOriginChange}
        onDestinationChange={onDestinationChange}
      />
      <RoundtripDatePicker onDateChange={onDateChange} />
    </div>
  );
};

 RoundtripFilter.propTypes = {
   onOriginChange: PropTypes.func.isRequired,
   onDestinationChange: PropTypes.func.isRequired,
   onDateChange: PropTypes.func.isRequired,
 };
