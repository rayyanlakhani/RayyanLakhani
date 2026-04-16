"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const roles = ["Software Engineer", "Creative Developer", "Problem Solver", "Full-Stack Builder"]

const EASE = [0.76, 0, 0.24, 1] as const

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const slideUp = {
  hidden: { y: "110%", opacity: 0 },
  visible: { y: "0%", opacity: 1, transition: { duration: 0.9, ease: EASE } },
}

const fade = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

export default function Hero({ isReady }: { isReady: boolean }) {
  const [roleIdx, setRoleIdx] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setRoleIdx((p) => (p + 1) % roles.length), 2800)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="relative h-screen flex flex-col justify-center px-8 md:px-20 overflow-hidden">
      <motion.div
        variants={stagger}
        initial="hidden"
        animate={isReady ? "visible" : "hidden"}
        className="relative z-10"
      >
        {/* Eyebrow */}
        <div className="overflow-hidden mb-4">
          <motion.p
            variants={slideUp}
            className="text-primary text-xs tracking-[0.4em] uppercase"
          >
            Portfolio — 2025
          </motion.p>
        </div>

        {/* Name */}
        <div className="overflow-hidden">
          <motion.h1
            variants={slideUp}
            className="font-[family-name:var(--font-bebas-neue)] text-[clamp(5rem,16vw,17rem)] leading-[0.88] text-foreground"
          >
            Rayyan
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.h1
            variants={slideUp}
            className="font-[family-name:var(--font-bebas-neue)] text-[clamp(5rem,16vw,17rem)] leading-[0.88] text-primary"
          >
            Lakhani
          </motion.h1>
        </div>

        {/* Animated role */}
        <motion.div
          variants={fade}
          className="flex items-center gap-5 mt-10 h-8 overflow-hidden"
        >
          <div className="w-10 h-px bg-primary shrink-0" />
          <AnimatePresence mode="wait">
            <motion.span
              key={roleIdx}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="text-foreground/60 text-base tracking-wide"
            >
              {roles[roleIdx]}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        {/* CTAs */}
        <motion.div variants={fade} className="flex flex-wrap gap-5 mt-12">
          <a
            href="#projects"
            className="inline-block border border-primary text-primary px-9 py-3.5 text-xs tracking-[0.25em] uppercase hover:bg-primary hover:text-background transition-all duration-300"
          >
            View Work
          </a>
          <a
            href="#contact"
            className="inline-block border border-foreground/20 text-foreground/50 px-9 py-3.5 text-xs tracking-[0.25em] uppercase hover:border-foreground/60 hover:text-foreground transition-all duration-300"
          >
            Get in Touch
          </a>
        </motion.div>
      </motion.div>

      {/* Large decorative number */}
      <div
        aria-hidden
        className="absolute right-0 top-1/2 -translate-y-1/2 font-[family-name:var(--font-bebas-neue)] text-[22vw] leading-none text-foreground/[0.03] select-none pointer-events-none"
      >
        01
      </div>

      {/* Scroll indicator */}
      {isReady && (
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <p className="text-foreground/25 text-[10px] tracking-[0.4em] uppercase">Scroll</p>
          <div className="relative w-px h-14 overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-primary to-transparent"
              animate={{ y: ["-100%", "100%"] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </motion.div>
      )}
    </section>
  )
}
