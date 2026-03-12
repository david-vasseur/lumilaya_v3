"use client"

import React, { useEffect } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import gsap from 'gsap';
import { useDeviceStore } from '@/lib/store/deviceStore';

gsap.registerPlugin(ScrollTrigger, SplitText);

function template({ children }: {children: React.ReactNode}) {

    const { setIsMobile } = useDeviceStore();

    useEffect(() => {

        ScrollTrigger.config({
            ignoreMobileResize: true,
        });

        const check = () => {
            const mobile = window.matchMedia("(max-width: 768px)").matches;
            setIsMobile(mobile);
        };

        check(); 
        window.addEventListener("resize", check);

        return () => window.removeEventListener("resize", check);
    }, []);

    return (
        <div>
            {children}
        </div>
    )
}

export default template;