import { OnewayCitySearch } from "./OnewayCitySearch";
import  { OnewayDatepicker } from "./OnewayDatepicker";
import PropTypes from "prop-types";

export const OneWayFilters = ({
  onOriginChange,
  onDestinationChange,
  onDateChange,
}) => {
  return (
    <div>
      <div className="lg:inline-flex lg:flex-row flex-col gap-4 w-full">
        <OnewayCitySearch
          onOriginChange={onOriginChange}
          onDestinationChange={onDestinationChange}
        />
        <OnewayDatepicker onDateChange={onDateChange} />
      </div>
    </div>
  );
};

OneWayFilters.propTypes = {
  onOriginChange: PropTypes.func.isRequired,
  onDestinationChange: PropTypes.func.isRequired,
  onDateChange: PropTypes.func.isRequired,
};
