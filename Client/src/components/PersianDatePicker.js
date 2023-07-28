import React, { useState } from "react";
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker from '@hassanmojab/react-modern-calendar-datepicker';

const PersianDatePicker = ({ setSelectedDate }) => {
  const [selectedDay, setSelectedDay] = useState({ year: 1399, month: 4, day: 21 });
  console.log("selected Date = ", selectedDay);

  const date = new Date(Date.UTC(selectedDay.year, selectedDay.month - 1, selectedDay.day));
  const result = date.toISOString();
  console.log('Date (ISO):', result);
  setSelectedDate(result)

  console.log();
  return (
    <DatePicker
      open={true}
      value={selectedDay}
      showPopperIcon={false}
      onChange={setSelectedDay}
      shouldHighlightWeekends
      locale="fa"
    />
  );
};

export default PersianDatePicker;