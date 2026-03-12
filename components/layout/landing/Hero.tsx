"use client"

import { useRef } from "react"
import { motion, Variants } from "framer-motion"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import Image from "next/image"
import Link from "next/link"
import { ArrowDown } from "lucide-react"
import { useDeviceStore } from "@/lib/store/deviceStore"

export const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  const isMobile = useDeviceStore((state) => state.isMobile)

  useGSAP(() => {
    gsap.to(imageRef.current, {
      scale: 1.2,
      opacity: 0.3,
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.5,
      },
    })

    gsap.to(overlayRef.current, {
      opacity: 0.8,
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.5,
      },
    })
  }, { scope: heroRef })

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const item: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  }

  return (
    <section ref={heroRef} className="relative h-screen overflow-hidden">
      
      {/* IMAGE */}
      <div ref={imageRef} className="absolute inset-0 z-0">
        {isMobile ? (
          <Image
            width={528}
            height={939}
            src="/images/landing/hero_mobile.webp"
            alt="Himalaya avec bougie naturelle"
            className="w-full h-full object-cover"
          />
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

      {/* OVERLAY */}
      <div
        ref={overlayRef}
        className="absolute inset-0 pointer-events-none bg-linear-to-br from-[#2C2C2C]/60 via-[#2C2C2C]/40 to-transparent z-10"
      />

      {/* CONTENT */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-20 w-full h-full flex flex-col items-center justify-center text-center px-6"
      >

        <motion.h1
          variants={item}
          className="text-[7rem] md:text-9xl lg:text-[10rem] xl:text-[12rem] font-ballet text-white mb-4"
        >
          <em>Lumi'laya</em>
        </motion.h1>

        <motion.p
          variants={item}
          className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8"
        >
          <strong className="text-xl md:text-2xl">
            Naturelle, enivrante et sacrée
          </strong>
          <br />
          La bougie qui élève votre ambiance
        </motion.p>

        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row gap-4 mb-8"
        >
          <Link
            href="/#boutique"
            className="group relative inline-flex items-center gap-3 bg-white text-[#2C2C2C] px-8 py-4 rounded-full font-medium hover:bg-white/90 transition-colors"
          >
            Découvrir la collection
            <ArrowDown className="w-5 h-5 -rotate-90" />
          </Link>

          <Link
            href="/#best-seller"
            className="bg-white/10 text-white px-8 py-4 rounded-full font-medium hover:bg-white/20 transition-colors"
          >
            Nos meilleures ventes
          </Link>
        </motion.div>

        <motion.div
          variants={item}
          className="flex flex-wrap justify-center gap-6 text-white/70 text-sm md:text-base"
        >
          <span>Fabrication française</span>
          <span>Cire 100% végétale</span>
          <span>Parfums naturels</span>
        </motion.div>

      </motion.div>
    </section>
  )
}