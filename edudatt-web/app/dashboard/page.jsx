"use client"

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getEvents } from '@/store/slices/event.slice';
import LayoutWrapper from '@/components/hocs/LayoutWrapper';
import DashboardWrapper from '@/components/hocs/DashboardWrapper';
import DashboardItems from '@/components/home/DashboardItems';
import EventList from '@/components/home/EventList';
import moment from 'moment';

export default function Dashboard() {
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.event);
  const { currentChild } = useSelector((state) => state.auth);

  const [todayEvents, setTodayEvents] = useState([]);

  const fetchEvents = () => {
    dispatch(getEvents());
  };

  useEffect(() => {
    if(currentChild?._id){
      fetchEvents();
    }
  }, [currentChild?._id]);

  return (
    <LayoutWrapper>
      <DashboardWrapper>
        <DashboardItems />

        {/* Display Upcoming Events */}
        {Object.keys(events).length > 0 ? (
          <div className="mt-8 border border-gray-500 px-2 pt-3 rounded-xl">
            <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
            {Object.keys(events).map((key) => (
              <EventList
                key={key}
                selectedDate={key}
                events={events[key]}
                isCalendar={false}
              />
            ))}
          </div>
        ) : (
          <>
            <p>No events found</p>
          </>
        )}

      </DashboardWrapper>
    </LayoutWrapper>
  );
}
