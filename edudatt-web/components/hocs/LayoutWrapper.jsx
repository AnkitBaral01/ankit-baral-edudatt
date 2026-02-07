"use client"

import React, { useEffect } from 'react';
import Header from '../nav/Header';
import { Poppins } from 'next/font/google';
import { useDispatch, useSelector } from 'react-redux';
import { markUnAuthenticated, refresh } from '@/store/slices/auth.slice';
import { useRouter, usePathname } from 'next/navigation';
import CONSTANTS from '@/config/constants';
import Loader from '../Loader';

const poppins = Poppins({
    weight: ['400', '600', '700'],
    subsets: ['latin']
});

const LayoutWrapper = ({ children, mobile = false }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const pathname = usePathname();
    
    const { auth, authLoading } = useSelector(state => state.auth);
    const { schoolLoading } = useSelector(state => state.auth);

    const refreshUser = async () => {
        const TOKEN = localStorage.getItem("AUTH_TOKEN");
        
        if(TOKEN && !auth) {
            dispatch(refresh());
        } else if (!TOKEN) {
            dispatch(markUnAuthenticated())
        }
    }

    useEffect(() => {
        refreshUser()
    }, [])

    useEffect(() => {
        if(auth && CONSTANTS.WHITELISTED_ROUTES.includes(pathname)) {
            router.push("dashboard")
        } else if (!auth && !authLoading && CONSTANTS.PROTECTED_ROUTES.includes(pathname)) {
            router.push("/")
        }
    }, [auth, authLoading])

    const loading = authLoading || schoolLoading;
    
    return (
        <>
            <div className={`max-w-7xl mx-auto min-h-screen flex flex-col ${poppins.className}`} id='__next'>
                <Header mobile={mobile} />
                <main className={`${mobile ? "" : "mt-16"} flex-grow flex justify-center w-full`}>
                    <div className="w-full">
                        {children}
                        {loading && (
                            <Loader />
                        )}
                    </div>
                </main>
            </div>
        </>
    );
};

export default LayoutWrapper;