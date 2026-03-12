"use client"

import { Hero } from "@/components/layout/landing/Hero";
import { useDeviceStore } from "@/lib/store/deviceStore";
import { useEffect } from "react";

export default function Home() {

	const { setIsMobile } = useDeviceStore();

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
			<Hero />
		</>
		
	);
}
