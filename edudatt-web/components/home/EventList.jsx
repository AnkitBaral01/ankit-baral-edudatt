import React from 'react';
import moment from 'moment';

const EventList = ({ selectedDate, events, isCalendar }) => {
  const formattedDate = moment(selectedDate);

  const dateLabel = formattedDate.isSame(moment(), 'day')
    ? "Today"
    : formattedDate.isSame(moment().add(1, 'days'), 'day')
      ? "Tomorrow"
      : `${isCalendar ? "Events on" : ""} ${formattedDate.format('MMMM D, YYYY')}`;

  return (
    <>
      <h2 className={`text-xl font-semibold ${!isCalendar ? "mt-4" : ""}`}>{dateLabel}</h2>
      <ul>
        {events?.length > 0 ? (
          events?.map((event, index) => (
            <li
              key={index}
              className={`py-2 px-3 bg-green-200 my-2 border-gray-200 rounded-xl ${(index + 1) !== events.length ? 'border-gray-300' : ''}`}
            >
              <h3 className="font-bold">{event.title}</h3>
              <p>{event.details}</p>
            </li>
          ))
        ) : (
          <p className="text-gray-700 my-4 ps-4">No events for this day</p>
        )}
      </ul>
    </>
  );
};

export default EventList;
