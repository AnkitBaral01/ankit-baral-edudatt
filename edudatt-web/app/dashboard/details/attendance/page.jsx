"use client"

import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAttendance } from '@/store/slices/attendance.slice'
import { format, parse, startOfMonth, endOfMonth, eachDayOfInterval, addMonths, subMonths, getDay } from 'date-fns'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import DetailsWrapper from '@/components/hocs/DetailsWrapper'
import LeaveApplicationModal from '@/components/attendance/LeaveApplicationModal'
import moment from 'moment'

const Day = ({ date, data, onClick }) => {
    return (
        <div 
            className={`p-2 rounded-lg shadow text-center cursor-pointer`}
            style={{ backgroundColor: data?.bg_color }}
            onClick={() => onClick(date)}
        >
            <div className="text-sm font-semibold" style={{ color: data?.text_color }}>
                {format(date, 'd')}
            </div>
            <div className="text-xs text-gray-600" style={{ color: data?.text_color }}>
                {format(date, 'EEE')}
            </div>
        </div>
    );
};

const Attendance = () => {
    const dispatch = useDispatch();
    const { attendance } = useSelector((state) => state.attendance);
    const { currentChild } = useSelector((state) => state.auth);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [showModal, setShowModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
    
    const dateDetailsRef = useRef(null);

    useEffect(() => {
        dispatch(getAttendance());
    }, [currentChild]);

    const today = new Date();
    const isFutureMonth = format(currentMonth, 'yyyy-MM') >= format(today, 'yyyy-MM');

    const handleNextMonth = () => {
        if (!isFutureMonth) {
            setCurrentMonth(prev => addMonths(prev, 1));
        }
    };
    const handlePrevMonth = () => setCurrentMonth(prev => subMonths(prev, 1));

    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    const allDays = eachDayOfInterval({ start, end });

    const monthKey = format(currentMonth, 'MM/yyyy');
    const monthData = attendance?.attendance?.[monthKey] || []

    const dayMap = new Map();
    monthData.forEach(item => {
        const parsed = parse(item.date, 'dd/MM/yyyy', new Date());
        dayMap.set(format(parsed, 'yyyy-MM-dd'), { ...item, day: format(parsed, 'EEE') });
    });

    const getPaddingStart = () => {
        const startDay = getDay(start);
        return Array(startDay).fill(null);
    }

    const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const scrollToDateDetails = () => {
        if (dateDetailsRef.current) {
            dateDetailsRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    };

    return (
        <DetailsWrapper>
            <div className='px-2 xl:px-0'>
                <div className="flex justify-end mb-6">
                    <button
                        onClick={() => setShowModal(true)}
                        className="px-4 py-2 text-primary font-semibold"
                    >
                        Apply for Leave
                    </button>
                </div>

                <div className="mb-4 flex items-center gap-6">
                    <h3 className="text-gray-500 text-xl font-medium">Attendance: </h3>
                    <p className="text-xl font-bold">{attendance?.attendance_percentage || "-"}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="p-4">
                        <h3 className="text-md bg-yellow-light text-white px-6 py-2 rounded-2xl mb-3">Planned Leaves</h3>
                        {attendance?.planned_leaves?.length > 0 ? (
                            attendance.planned_leaves.map((leave, index) => (
                                <p key={index} className="text-sm ps-4 mb-2 font-semibold">
                                    {leave?.start_date || moment(new Date()).format("DD/MM/YYYY")} - {leave?.end_date || moment(new Date()).format("DD/MM/YYYY")}
                                </p>
                            ))
                        ) : (
                            <p className="text-sm ps-4 mb-2 text-gray-500 italic">No planned leaves</p>
                        )}
                    </div>

                    <div className="p-4">
                        <h3 className="text-md bg-purple-400 text-white px-6 py-2 rounded-2xl mb-3">Sick Leaves</h3>
                        {attendance?.sick_leaves?.length > 0 ? (
                            attendance.sick_leaves.map((leave, index) => (
                                <p key={index} className="text-sm ps-4 mb-2 font-semibold">
                                    {leave?.start_date || moment(new Date()).format("DD/MM/YYYY")} - {leave?.end_date || moment(new Date()).format("DD/MM/YYYY")}
                                </p>
                            ))
                        ) : (
                            <p className="text-sm ps-4 mb-2 text-gray-500 italic">No sick leaves</p>
                        )}
                    </div>

                    <div className="p-4">
                        <h3 className="text-md bg-red-500 text-white px-6 py-2 rounded-2xl mb-3">Unplanned Leaves</h3>
                        {attendance?.unplanned_leaves?.length > 0 ? (
                            attendance.unplanned_leaves.map((leave, index) => (
                                <p key={index} className="text-sm ps-4 mb-2 font-semibold">
                                    {leave?.start_date || moment(new Date()).format("DD/MM/YYYY")} - {leave?.end_date || moment(new Date()).format("DD/MM/YYYY")}
                                </p>
                            ))
                        ) : (
                            <p className="text-sm ps-4 mb-2 text-gray-500 italic">No unplanned leaves</p>
                        )}
                    </div>
                </div>

                <div className="flex sm:flex-row justify-between items-center gap-2 mb-8">
                    <button onClick={handlePrevMonth} className="p-2 bg-gray-200 rounded-full"><FaChevronLeft /></button>
                    <h2 className="text-xl sm:text-2xl font-bold">{format(currentMonth, 'MMMM yyyy')}</h2>
                    <button disabled={isFutureMonth} onClick={handleNextMonth} className={`p-2 bg-gray-200 rounded-full`}><FaChevronRight color={isFutureMonth ? "white" : ""} /></button>
                </div>

                <div className="grid grid-cols-7 text-center font-semibold text-xs sm:text-sm mb-2">
                    {dayHeaders.map(day => (
                        <div key={day}>{day}</div>
                    ))}
                </div>
                <div className="grid grid-cols-7 gap-2 sm:gap-4">
                    {getPaddingStart().map((_, idx) => (
                        <div key={idx}></div>
                    ))}
                    {allDays.map((date) => {
                        const key = format(date, 'yyyy-MM-dd');
                        return <Day key={key} date={date} data={dayMap.get(key)} onClick={() => {
                            setSelectedDate(date);
                            scrollToDateDetails();
                        }} />
                    })}
                </div>

                <div ref={dateDetailsRef} className='mb-4 min-h-60'>
                    {selectedDate && (
                        <div className="mt-6 p-4 border rounded-lg">
                            <h3 className="text-lg font-bold mb-2">
                                {format(selectedDate, 'dd MMMM yyyy')} ({format(selectedDate, 'EEEE')})
                            </h3>
                            {(() => {
                                const key = format(selectedDate, 'yyyy-MM-dd');
                                const data = dayMap.get(key);

                                if (!data) return <p>No data for this date.</p>;

                                return (
                                    <div className="space-y-1 text-sm">
                                        <p><strong>Status:</strong> {data.is_present ? 'Present' : 'Absent'}</p>
                                        {data.leave && (
                                            <>
                                                <p><strong>Leave Type:</strong> {data.leave.type}</p>
                                                <p><strong>Leave Status:</strong> {data.leave.status}</p>
                                                <p><strong>Leave Duration:</strong> {data.leave.from} to {data.leave.to} ({data.leave.days} day{data.leave.days > 1 ? 's' : ''})</p>
                                                {data.leave.reason && <p><strong>Reason:</strong> {data.leave.reason}</p>}
                                            </>
                                        )}
                                    </div>
                                );
                            })()}
                        </div>
                    )}
                </div>
            </div>
            <LeaveApplicationModal showModal={showModal} setShowModal={setShowModal} />
        </DetailsWrapper>
    )
}

export default Attendance;
