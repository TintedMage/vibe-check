// src/hooks/useDeviceDetect.js
'use client';

import { useState, useEffect } from 'react';

export default function useDeviceDetect() {
    const [isMobile, setMobile] = useState(false);

    useEffect(() => {
        // Client-side-only code
        if (typeof window !== 'undefined') {
            const userAgent = typeof window.navigator === 'undefined' ? '' : navigator.userAgent;
            const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
            const isMobileDevice = mobileRegex.test(userAgent);
            setMobile(isMobileDevice);

            // Optional: Add resize listener to handle orientation changes
            const handleResize = () => {
                setMobile(mobileRegex.test(userAgent) || window.innerWidth < 768);
            };

            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, []);

    return { isMobile };
}