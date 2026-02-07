"use client"

import DashboardWrapper from '@/components/hocs/DashboardWrapper'
import LayoutWrapper from '@/components/hocs/LayoutWrapper'
import { getNotifications, markAllAsRead } from '@/store/slices/notification.slice'
import { FaCheck } from 'react-icons/fa'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Notifications = () => {
    const dispatch = useDispatch()

    const { auth } = useSelector(state => state.auth)
    const { notifications } = useSelector(state => state.notification)

    useEffect(() => {
        dispatch(getNotifications())
    }, [dispatch])

    const handleMarkAsRead = (id, is_all = false) => {
        dispatch(markAllAsRead(is_all ? notifications?.map((notification) => notification?._id) : [id]))
    }

    return (
        <LayoutWrapper>
            <DashboardWrapper>
                <div className="mx-auto lg:max-w-[50%] flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold">Notifications</h1>
                    <button
                        onClick={() => handleMarkAsRead(null, true)}
                    >
                        <span className='text-primary'>Mark all as read</span>
                    </button>
                </div>

                <div className="mx-auto lg:max-w-[50%] space-y-2">
                    {notifications?.length > 0 ? (
                        notifications?.map(notification => (
                            <div
                                key={notification._id}
                                className={`px-3 py-2 rounded-lg border border-yellow-100 ${notification.read_at ? 'bg-white' : 'bg-yellow-lighter'} flex justify-between items-center`}
                            >
                                <div className="flex flex-col">
                                    <span className="font-semibold mb-1">{notification.title}</span>
                                    <span className="text-sm text-gray-500">{notification.description}</span>
                                </div>
                                {!notification?.read_at && (
                                    <button className="flex items-center cursor-pointer" onClick={() => handleMarkAsRead(notification?._id)}>
                                        <FaCheck className="text-primary text-sm" />
                                    </button>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className='text-sm'>No notifications available.</div>
                    )}
                </div>
            </DashboardWrapper>
        </LayoutWrapper>
    )
}

export default Notifications
