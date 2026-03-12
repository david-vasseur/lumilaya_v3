"use client"

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown } from 'lucide-react';
import { useDeviceStore } from '@/lib/store/deviceStore';

export const Hero = () => {
	const heroRef = useRef<HTMLDivElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);
	const imageRef = useRef<HTMLDivElement>(null);
	const overlayRef = useRef<HTMLDivElement>(null);
	const ctaRefs = useRef<HTMLAnchorElement[]>([]);
	const { isMobile } = useDeviceStore();
	

    useGSAP(() => {

        //effet de sortie en scroll
        gsap.to(contentRef.current, {
			opacity: 0,
			scrollTrigger: {
				trigger: heroRef.current,
				start: 'bottom 90%',
				end: 'bottom 50%',
				scrub: .5,
			}
		});
    }, { scope: heroRef })

	return (
		<section ref={heroRef} className="relative h-screen overflow-hidden">
			{/* Image de fond avec Next.js Image */}
			<div ref={imageRef} className="absolute inset-0 z-1">
				{isMobile ? (
					<Image width={528} height={939} src={"/images/landing/hero_mobile.webp"}  alt="Himalaya avec bougie naturelle" className="w-full h-full object-cover" />
				) : (
					<Image 
                        width={939} 
                        height={704}
						src="/images/landing/hero.webp"
						alt="Himalaya avec bougie naturelle"
						className="w-full h-full object-cover object-bottom-right"
					/>
				)}							
			</div>

			{/* Overlay gradient pour améliorer la lisibilité */}
			<div 
				ref={overlayRef}
				className="absolute inset-0 pointer-events-none bg-linear-to-br from-[#2C2C2C]/60 via-[#2C2C2C]/40 to-transparent z-2"
			/>
			{/* Contenu principal */}
			<div ref={contentRef} className="relative z-3 w-full h-full flex items-start md:items-center justify-center">
				<div className="text-center px-6 max-w-5xl">

					{/* Titre principal avec effet de découpe */}
					<div className="overflow-hidden px-5 mb-2 pt-20 pb-7 md:py-7">
						<h1 className="hero-title-line text-[7rem] md:text-9xl lg:text-[10rem] xl:text-[12rem] font-ballet! text-white ">
							<em>Lumi'laya</em>
						</h1>
					</div>

					{/* Sous-titre */}
					<p className="hero-subtitle text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-12 leading-relaxed">
						<strong className="text-xl md:text-2xl">Naturelle, enivrante et sacrée</strong> <br/> La bougie qui élève votre ambiance
					</p>

					{/* Call-to-actions */}
					<div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-4">
						<Link 
							href="/#boutique"
							ref={(el) => {el && ctaRefs.current.push(el)}}
							className="cta-item group relative inline-flex items-center gap-3 bg-white text-[#2C2C2C] px-8 py-4 rounded-full font-medium hover:bg-white/90 transition-colors shadow-2xl overflow-hidden"
						>
							<span className="relative z-10">Découvrir la collection</span>
							<ArrowDown className="w-5 h-5 -rotate-90 group-hover:translate-x-1 transition-transform relative z-10" />
							<div className="absolute inset-0 bg-linear-to-r from-[#7A9B8E] to-[#5A7B6E] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
						</Link>

						<Link 
							href="/#best-seller"
							ref={(el) => {el && ctaRefs.current.push(el)}}
							className="cta-item inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white px-8 py-4 rounded-full font-medium hover:bg-white/20 transition-colors"
						>
							<span>Nos meilleures ventes</span>
						</Link>
					</div>

					{/* Éléments de confiance */}
					<div className="hero-confiance w-[90vw] absolute bottom-10 md:relative md:w-full flex items-center justify-center gap-8 mt-16 md:mt-52 text-white/70 text-sm md:text-base">
						<div className="flex items-center gap-2">
							<span>Fabrication française</span>
						</div>
                        <div className="w-2 h-2 bg-[#7A9B8E] rounded-full animate-pulse" />
						<div className="flex items-center gap-2">
							<span>Cire 100% végétale</span>
						</div>
                        <div className="w-2 h-2 bg-[#7A9B8E] rounded-full animate-pulse" />
						<div className="flex items-center gap-2">
							
							<span>Parfums naturels</span>
						</div>
					</div>
				</div>
			</div>

			{/* Indicateur de scroll animé */}
			<div className="hidden 2xl:block scroll-indicator absolute bottom-12 left-1/2 -translate-x-1/2 z-20">
				<div className="flex flex-col items-center gap-3 animate-bounce">
					<span className="text-white/70 text-xs uppercase tracking-widest">Découvrir</span>
					<div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
						<div className="w-1 h-2 bg-white/70 rounded-full animate-pulse" />
					</div>
				</div>
			</div>

			{/* Vignette décorative en bas */}
			<div className="absolute bottom-0 left-0 right-0 h-64 bg-linear-to-t from-[#FDFBF7]/60 from-[1px] to-95% to-transparent z-5" />
		</section>
	);
};
