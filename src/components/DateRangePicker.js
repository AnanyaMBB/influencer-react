import React, { useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from 'date-fns';
import './DateRangePicker.css'; // Import custom CSS for styling

const SingleInputDateRangePicker = () => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);
  const [showPicker, setShowPicker] = useState(false);

  const handleDateRangeChange = (item) => {
    setState([item.selection]);
    setShowPicker(false); // Close the picker after selecting the date range
  };

  const formattedStartDate = state[0].startDate ? format(state[0].startDate, 'MMM d, yyyy') : '';
  const formattedEndDate = state[0].endDate ? format(state[0].endDate, 'MMM d, yyyy') : '';

  return (
    <div className="date-range-picker-container">
      <input
        type="text"
        value={`${formattedStartDate} - ${formattedEndDate}`}
        onClick={() => setShowPicker(!showPicker)}
        readOnly
        style={{ cursor: 'pointer', width: '250px', padding: '5px', textAlign: 'center' }}
      />
      {showPicker && (
        <div className="date-picker-wrapper">
          <DateRange
            editableDateInputs={true}
            onChange={handleDateRangeChange}
            moveRangeOnFirstSelection={false}
            ranges={state}
          />
        </div>
      )}
    </div>
  );
};

export default SingleInputDateRangePicker;
