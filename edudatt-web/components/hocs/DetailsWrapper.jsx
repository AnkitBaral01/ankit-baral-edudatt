"use client"

import React, { useEffect, useState } from 'react'
import LayoutWrapper from './LayoutWrapper'
import DashboardWrapper from './DashboardWrapper'

const DetailsWrapper = ({ children }) => {
    const [queryParams, setQueryParams] = useState(null);
    
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const urlParams = new URLSearchParams(window.location.search);
            const token = urlParams.get('token');
            const child = urlParams.get('child');
            const mobile = urlParams.get('mobile');

            if(token && mobile === "true" && child) {
                localStorage.setItem('AUTH_TOKEN', token);
                localStorage.setItem('CURRENT_CHILD', child);
            }
            
            setQueryParams({ token, child, mobile });
        }
    }, []);

    const isMobile = queryParams?.token?.length > 0 && queryParams?.mobile === "true" && queryParams?.child?.length > 0;

    return (
        <LayoutWrapper mobile={isMobile}>
            <DashboardWrapper mobile={isMobile}>
                {children}
            </DashboardWrapper>
        </LayoutWrapper>
    )
}

export default DetailsWrapper