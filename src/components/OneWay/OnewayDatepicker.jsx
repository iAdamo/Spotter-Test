import { useState } from "react";
import { SingleDatePicker } from "react-google-flight-datepicker";
import PropTypes from "prop-types";

import "react-google-flight-datepicker/dist/main.css";

export const OnewayDatepicker = ({ onDateChange }) => {
  const [selectedDates, setSelectedDates] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const handleDateChange = (startDate, endDate) => {
    setSelectedDates({ startDate, endDate });
    onDateChange(startDate, endDate);
  };

  return (
    <div className=" w-full">
      <SingleDatePicker
        startDate={selectedDates.startDate}
        // endDate={selectedDates.endDate}
        onChange={handleDateChange}
        minDate={new Date(1900, 0, 1)}
        maxDate={new Date(2100, 0, 1)}
        dateFormat="D MMM YYYY"
        monthFormat="MMMM YYYY"
        startDatePlaceholder="Start Date"
        endDatePlaceholder="End Date"
        disabled={false}
        className="my-date-picker"
        startWeekDay="monday"
      />
    </div>
  );
};

OnewayDatepicker.propTypes = {
  onDateChange: PropTypes.func.isRequired,
};
