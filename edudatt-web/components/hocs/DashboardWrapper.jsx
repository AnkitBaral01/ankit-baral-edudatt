"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import { FaHome, FaCalendarAlt, FaSchool, FaUser } from 'react-icons/fa';
import { usePathname, useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

const NAV_ITEMS = [
    {
        path: '/dashboard',
        label: 'Home',
        icon: FaHome,
        mobileLabel: 'Home'
    },
    {
        path: '/dashboard/calendar',
        label: 'Calendar',
        icon: FaCalendarAlt,
        mobileLabel: 'Calendar'
    },
    {
        path: '/dashboard/school',
        label: 'School',
        icon: FaSchool,
        mobileLabel: 'School'
    },
    {
        path: '/dashboard/profile',
        label: 'Profile',
        icon: FaUser,
        mobileLabel: 'Profile'
    }
];

const DashboardWrapper = ({ children, mobile }) => {
    const { auth } = useSelector(state => state.auth);

    const router = useRouter();

    const pathname = usePathname();

    const getLinkClassName = (path) => {
        return pathname === path
            ? 'text-primary flex flex-col items-center space-y-2 p-4 cursor-pointer'
            : 'text-gray-400 flex flex-col items-center space-y-2 p-4 cursor-pointer hover:text-primary';
    };

    const getMobileLinkClassName = (path) => {
        return pathname === path
            ? 'text-primary flex flex-col items-center py-3'
            : 'text-gray-400 flex flex-col items-center py-3 hover:text-primary';
    };

    useEffect(() => {
        if (auth && !auth.students?.length) {
            router.push("/link-school")
        }
    }, [auth])

    return (
        <div className="flex relative h-full">
            {/* Desktop Sidebar */}
            <div className={mobile ? "hidden" : "hidden lg:flex w-16 h-[90vh] flex-col items-center justify-center space-y-8 p-4 sticky top-0 self-start"}>
                {NAV_ITEMS.map((item) => (
                    <Link
                        key={item.path}
                        href={item.path}
                        className={getLinkClassName(item.path)}
                    >
                        <item.icon size={24} />
                        <span className="text-xs">{item.label}</span>
                    </Link>
                ))}
            </div>

            {/* Main content area */}
            <div className="flex-1 p-2 lg:p-6 lg:ml-16 mb-20 lg:mb-0 overflow-y-auto h-[90vh] [scrollbar-width:none] [-ms-overflow-style:none]">
                {children}
            </div>

            {/* Mobile Bottom Navigation */}
            <div className={mobile ? "hidden" : "lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50"}>
                <div className="flex justify-around">
                    {NAV_ITEMS.map((item) => (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={getMobileLinkClassName(item.path)}
                        >
                            <div className="flex flex-col items-center">
                                <item.icon size={20} />
                                <span className="text-xs mt-1">{item.mobileLabel}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DashboardWrapper;