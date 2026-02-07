"use client"

import React, { useState } from 'react';
import ModalWrapper from '../hocs/ModalWrapper';
import { showError } from '@/lib/toast';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { applyLeave } from '@/store/slices/attendance.slice';

const LeaveApplicationModal = ({ showModal, setShowModal }) => {
    const dispatch = useDispatch();

    const [leaveType, setLeaveType] = useState('Planned Leave');
    const [fromDate, setFromDate] = useState(moment(new Date()).format('YYYY-MM-DD'));
    const [toDate, setToDate] = useState(moment(new Date()).format('YYYY-MM-DD'));
    const [reason, setReason] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (leaveType && fromDate && toDate && new Date(fromDate) <= new Date(toDate) && reason.trim()) {
            dispatch(applyLeave({leaveType, fromDate, toDate, reason}))
            setShowModal(false);
        } else {
            showError("Invalid Data");
        }
    };

    return (
        <ModalWrapper visible={showModal} onClose={() => setShowModal(false)}>
            <h3 className="text-lg lg:text-xl font-bold text-center mb-6">Apply for Leave</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="leaveType" className="block text-sm font-semibold mb-1">Leave Type</label>
                    <select
                        id="leaveType"
                        className="w-full border p-2 rounded-lg min-h-8"
                        value={leaveType}
                        onChange={(e) => setLeaveType(e.target.value)}
                    >
                        <option value="Planned Leave">Planned Leave</option>
                        <option value="Sick Leave">Sick Leave</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="fromDate" className="block text-sm font-semibold mb-1">From Date</label>
                    <input
                        type="date"
                        id="fromDate"
                        placeholder='From Date'
                        className="block w-full appearance-none border p-2 rounded-lg min-w-0 min-h-8"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="toDate" className="block text-sm font-semibold mb-1">To Date</label>
                    <input
                        type="date"
                        id="toDate"
                        placeholder='To Date'
                        className="block w-full appearance-none border p-2 rounded-lg min-w-0 min-h-8"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="reason" className="block text-sm font-semibold mb-1">Reason</label>
                    <textarea
                        id="reason"
                        rows={3}
                        className="w-full border p-2 rounded-lg resize-none"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Enter your reason for leave"
                    />
                </div>

                <button type="submit" className="w-full bg-yellow text-white py-2 rounded-lg">Submit</button>
            </form>
        </ModalWrapper>
    );
};

export default LeaveApplicationModal;
