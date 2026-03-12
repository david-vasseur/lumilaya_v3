"use client"

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useEffect } from "react";
import { useDeviceStore } from "@/lib/store/deviceStore";
import Footer from "@/components/features/Footer";

gsap.registerPlugin(ScrollTrigger, SplitText);

const Template = ({ children }: { children: React.ReactNode }) => {

    const { isMobile } = useDeviceStore();
    const setIsMobile = useDeviceStore((state) => state.setIsMobile);

    useEffect(() => {
        const check = () => {
            const mobile = window.matchMedia("(max-width: 768px)").matches;
            setIsMobile(mobile);
        };

        check(); 
        window.addEventListener("resize", check);

        return () => window.removeEventListener("resize", check);
    }, [setIsMobile]);

    return (
        <>            
            {children}
            <Footer />
        </>
    )
}

export default Template;