"use client"

import React, { useEffect } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import gsap from 'gsap';
import { useDeviceStore } from '@/lib/store/deviceStore';

gsap.registerPlugin(ScrollTrigger, SplitText);


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