"use client";

import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import LayoutWrapper from "@/components/hocs/LayoutWrapper";
import DashboardWrapper from "@/components/hocs/DashboardWrapper";
import { useDispatch, useSelector } from "react-redux";
import { getEvents } from "@/store/slices/event.slice";
import Input from "@/components/Input";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import EventList from "@/components/home/EventList";
import CustomCalendar from "@/components/CustomCalendar";

const localizer = momentLocalizer(moment);

const CustomToolbar = ({ label, onNavigate }) => {
  return (
    <div className="flex justify-between items-center p-2 bg-gray-100 rounded-lg">
      <button
        onClick={() => onNavigate("PREV")}
        className="px-4 py-2 bg-primary text-white rounded-lg transition-all duration-300"
      >
        <FaChevronLeft className="text-lg" />
      </button>

      <span className="text-lg font-semibold">{label}</span>

      <button
        onClick={() => onNavigate("NEXT")}
        className="px-4 py-2 bg-primary text-white rounded-lg transition-all duration-300"
      >
        <FaChevronRight className="text-lg" />
      </button>
    </div>
  );
};

const MyCalendar = () => {
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.event);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const formatEvents = (events) => {
    const formattedEvents = [];
    for (let date in events) {
      events[date].forEach((event) => {
        formattedEvents.push({
          title: event.title,
          details: event.details,
          start: new Date(event.start_date),
          end: new Date(event.start_date),
          date: date,
        });
      });
    }
    return formattedEvents;
  };

  const fetchEvents = () => {
    dispatch(getEvents());
  };

  const calendarEvents = formatEvents(events);

  const handleDayClick = ({ start }) => {
    const dateStr = moment(start).format("YYYY-MM-DD");
    setSelectedDate(dateStr);

    const eventsForDay = events[dateStr] || [];
    setSelectedEvents(eventsForDay);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query) {
      const filtered = calendarEvents.filter((event) =>
        event.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredEvents(filtered);
      setIsSearchOpen(true);
    } else {
      setFilteredEvents([]);
      setIsSearchOpen(false);
    }
  };

  const handleSearchResultClick = (event) => {
    setIsSearchOpen(false);
    setSearchQuery("");
  };

  const groupEventsByDate = (events) => {
    const grouped = events.reduce((acc, event) => {
      const eventDate = moment(event.start).format("YYYY-MM-DD");
      if (!acc[eventDate]) acc[eventDate] = [];
      acc[eventDate].push(event);
      return acc;
    }, {});
    return grouped;
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const groupedFilteredEvents = groupEventsByDate(filteredEvents);

  const handleNavigate = (action) => {
    let newDate;
    if (action === "PREV") {
      newDate = moment(currentDate).subtract(1, "month").toDate();
    } else if (action === "NEXT") {
      newDate = moment(currentDate).add(1, "month").toDate();
    }

    setCurrentDate(newDate);
  };

  return (
    <LayoutWrapper>
      <DashboardWrapper>
        <div className="mb-4">
          <Input
            placeholder="Search events..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full"
          />

          {isSearchOpen && filteredEvents.length > 0 && (
            <div className="absolute bg-white shadow-md border border-gray-300 w-full mt-2 rounded-lg z-10">
              {Object.keys(groupedFilteredEvents).map((date, index) => (
                <div key={index} className="px-4 py-2">
                  <h4 className="font-semibold text-sm text-gray-700">
                    {moment(date).format("MMMM D, YYYY")}
                  </h4>
                  <ul className="mt-2">
                    {groupedFilteredEvents[date].map((event, idx) => (
                      <li
                        key={idx}
                        onClick={() => handleSearchResultClick(event)}
                        className="py-1 ps-3 cursor-pointer hover:bg-gray-100"
                      >
                        {event.title}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>

        <CustomCalendar dataMap={events} />
       
      </DashboardWrapper>
    </LayoutWrapper>
  );
};

export default MyCalendar;
