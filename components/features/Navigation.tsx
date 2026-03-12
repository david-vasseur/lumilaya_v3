"use client"

import { MenuIcon, ShoppingCart, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useModalStore } from "@/lib/store/modalStore";
import Image from "next/image";
import { useState, useRef, useEffect, useLayoutEffect } from "react";
import gsap from "gsap";
import { useCartStore } from "@/lib/store/cartStore";
import { useDeviceStore } from "@/lib/store/deviceStore";
import Cart from "./Cart";
import { useGSAP } from "@gsap/react";

function Navigation() {

    const path = usePathname();
    const { openModal } = useModalStore();
    const { items } = useCartStore();
    const { isMobile } = useDeviceStore();

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const overlayRef = useRef<HTMLDivElement | null>(null);
    const menuRef = useRef<HTMLUListElement | null>(null);
    const bandsRef = useRef<(HTMLDivElement | null)[]>([]);
    const tl = useRef<gsap.core.Timeline | null>(null);

    const NUM_BANDS = 4;
    const bands = Array.from({ length: NUM_BANDS });

useLayoutEffect(() => {
  // attendre que toutes les refs soient définies
  if (!menuRef.current || bandsRef.current.some((b) => !b)) return;

  const ctx = gsap.context(() => {

    tl.current = gsap.timeline({ paused: true });

    tl.current.fromTo(
      bandsRef.current,
      { x: "600%", opacity: 0 },
      { x: "0%", opacity: 1,  duration: 0.6, ease: "power2.inOut", stagger: 0.05 }
    );

    tl.current.fromTo(
      menuRef.current!.children,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.3, stagger: 0.1 },
      "-=0.2"
    );
  });

  return () => ctx.revert();
}, [menuRef.current, ...bandsRef.current]); // déclenche seulement quand les refs sont toutes présentes

    // Ouvrir / fermer menu
    useGSAP(() => {
        if (!tl.current) return;
        if (isMenuOpen) tl.current.play();
        else tl.current.reverse();
    }, [isMenuOpen]);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 ${isMobile ? "" : "bg-[#FDFBF7]/90 backdrop-blur-sm border-b border-[#2C2C2C]/10"}`}>
            
            {isMobile ? (
                <>
                    <div className="absolute w-screen h-[8vh] bg-[#7A9B8E] flex justify-between items-center px-5 z-50">

                        <div className="flex gap-2 cursor-pointer">
                            <ShoppingCart
                                className="w-6 h-6 text-white"
                                onClick={() => openModal(<Cart />)}
                            />
                            <span className="text-white font-bold">{items.length}</span>
                        </div>

                        <div className="aspect-1137/710 w-20 relative -my-4">
                            <Image
                                fill
                                src="/images/logo.webp"
                                alt="Logo Lumilaya"
                                sizes="80px"
                                priority
                            />
                        </div>

                        <div onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? (
                                <X className="w-8 h-8 text-white" />
                            ) : (
                                <MenuIcon className="w-8 h-8 text-white" />
                            )}
                        </div>

                    </div>

                    {/* overlay */}
                    <div
                        ref={overlayRef}
                        className={`fixed h-screen w-screen top-0 z-20 flex overflow-hidden pointer-events-none ${isMenuOpen ? "pointer-events-auto" : ""}`}
                    >
                        {bands.map((_, i) => (
                            <div
                                key={i}
                                ref={(el) => {(bandsRef.current[i] = el)}}
                                className="flex-1 bg-zinc-300 opacity-0"
                            />
                        ))}
                    </div>

                    {/* menu */}
                    <div className="w-full pl-10 pt-15">
                        <ul
                            ref={menuRef}
                            className="relative z-30 space-y-6 text-3xl mt-20 font-bold text-[#7A9B8E]"
                        >
                            {[
                                { label: "Accueil", href: "/" },
                                { label: "Emotions & Plaisirs", href: "/bougies-emotions" },
                                { label: "Entre Terre & Ciel", href: "/bougies-rituel" },
                                { label: "Notre histoire", href: "/notre-histoire" },
                                { label: "Nous contacter", href: "/contact" },
                                { label: "Mes favoris", href: "/favoris" },
                            ].map((item, index) => (
                                <li
                                    className="opacity-0"
                                    key={index}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <Link href={item.href}>
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
            ) : (

                /* DESKTOP */

                <div className="mx-auto px-6 py-4 flex items-center justify-between">

                    <Link href={"/"} className="flex items-center gap-2 group">
                        <div className="aspect-1137/710 w-20 relative -my-4">
                            <Image fill alt="logo lumilaya" src={"/images/logo.webp"} />
                        </div>
                    </Link>

                    <div className="flex gap-8">

                        {[
                            { label: "Accueil", href: "/" },
                            { label: "Notre histoire", href: "/notre-histoire" },
                            { label: "Bougies Emotions & Plaisirs", href: "/bougies-emotions" },
                            { label: "Bougies Entre Terre & Ciel", href: "/bougies-rituel" },
                            { label: "Mes favoris", href: "/favoris" },
                            { label: "Nous contacter", href: "/contact" },
                        ].map((item) => (

                            <Link
                                key={item.href}
                                href={item.href}
                                className={`text-sm tracking-wide transition-colors ${
                                    path === item.href
                                        ? "text-[#2C2C2C] font-medium"
                                        : "text-[#2C2C2C]/60 hover:text-[#2C2C2C]"
                                }`}
                            >
                                {item.label}
                            </Link>

                        ))}

                    </div>

                    <div className="flex gap-2 cursor-pointer">
                        <ShoppingCart
                            className="w-6 h-6 text-[#7A9B8E]"
                            onClick={() => openModal(<Cart />)}
                        />
                        <span className="text-[#7A9B8E] font-bold">{items.length}</span>
                    </div>

                </div>
            )}
        </nav>
    );
}

export default Navigation;