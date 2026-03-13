"use client"

import React, { useEffect } from 'react'
import { useDeviceStore } from '@/lib/store/deviceStore';


function template({ children }: {children: React.ReactNode}) {

    const setIsMobile = useDeviceStore((state) => state.setIsMobile)

    useEffect(() => {

        const media = window.matchMedia("(max-width: 768px)");

        const check = () => {
        setIsMobile(media.matches);
        };

        media.addEventListener("change", check);
        check();

        return () => media.removeEventListener("change", check);
    }, []);

    return (
        <>
            {children}
        </>
    )
}

export default template;