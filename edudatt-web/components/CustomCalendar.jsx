"use client";

import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, addMonths, subMonths, getDay } from 'date-fns';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import EventList from './home/EventList';
import moment from 'moment';

const Day = ({ date, data, onClick }) => {
    const eventCount = data?.length || 0;
    const isToday = format(date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');

    return (
        <div
            className={`p-2 rounded-lg border text-center cursor-pointer transition 
                ${isToday ? 'bg-yellow-lighter border-yellow font-bold' : 'hover:bg-gray-100'}`}
            onClick={() => onClick(date)}
        >
            <div className="text-sm" style={{ color: data?.text_color || '#000' }}>
                {format(date, 'd')}
            </div>
            <div className="text-xs text-gray-600" style={{ color: data?.text_color || '#666' }}>
                {format(date, 'EEE')}
            </div>

            {/* Dot indicators */}
            {eventCount > 0 && (
                <div className="flex justify-center gap-1 mt-1">
                    {Array(Math.min(eventCount, 3)).fill().map((_, idx) => (
                        <span key={idx} className="w-1.5 h-1.5 bg-yellow rounded-full" />
                    ))}
                    {eventCount > 3 && (
                        <span className="text-[10px] font-bold text-blue-600 ml-1">+{eventCount - 3}</span>
                    )}
                </div>
            )}
        </div>
    );
};

const CustomCalendar = ({ dataMap = {}, onDateSelect }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(moment(new Date()).format('YYYY-MM-DD'));

    const handleNextMonth = () => setCurrentMonth(prev => addMonths(prev, 1));
    const handlePrevMonth = () => setCurrentMonth(prev => subMonths(prev, 1));

    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    const allDays = eachDayOfInterval({ start, end });

    const getPaddingStart = () => {
        const startDay = getDay(start);
        return Array(startDay).fill(null);
    }

    const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const handleClick = (date) => {
        const formatted = format(date, 'yyyy-MM-dd');
        setSelectedDate(formatted);
        if (onDateSelect) onDateSelect(formatted, dataMap[formatted]);
    };

    return (
        <div className="p-4 border rounded-xl shadow-sm bg-white">
            <div className="flex items-center justify-between mb-10">
                <button onClick={handlePrevMonth} className="p-2 rounded-full"><FaChevronLeft /></button>
                <h2 className="text-lg font-semibold">{format(currentMonth, 'MMMM yyyy')}</h2>
                <button onClick={handleNextMonth} className="p-2 rounded-full"><FaChevronRight /></button>
            </div>

            <div className="grid grid-cols-7 text-center font-semibold text-sm mb-2">
                {dayHeaders.map(day => (
                    <div key={day}>{day}</div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
                {getPaddingStart().map((_, idx) => <div key={`pad-${idx}`}></div>)}
                {allDays.map(date => {
                    const key = format(date, 'yyyy-MM-dd');
                    const data = dataMap[key];
                    return (
                        <Day key={key} date={date} data={data} onClick={handleClick} />
                    );
                })}
            </div>

            {selectedDate && (
                 <div className="mt-8 border border-gray-500 px-2 pt-3 rounded-xl">
                 <EventList selectedDate={selectedDate || new Date()} events={dataMap[selectedDate]} isCalendar={true} />
               </div>
            )}
        </div>
    );
};

export default CustomCalendar;
