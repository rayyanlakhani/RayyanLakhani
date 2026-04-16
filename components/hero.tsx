"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const roles = [
  "Software Engineer",
  "Creative Developer",
  "Problem Solver",
  "Full-Stack Builder",
]

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
  const [time, setTime]       = useState("")

  useEffect(() => {
    const id = setInterval(() => setRoleIdx((p) => (p + 1) % roles.length), 2800)
    return () => clearInterval(id)
  }, [])

  // Live clock for HUD
  useEffect(() => {
    const tick = () =>
      setTime(new Date().toLocaleTimeString("en-US", { hour12: false }))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="relative h-screen flex flex-col justify-center px-8 md:px-20 overflow-hidden">

      {/* ── Background grid ── */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,229,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,229,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── Subtle radial fade-out on the grid edges ── */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, #030712 100%)",
        }}
      />

      {/* ── Horizontal accent line (top of viewport) ── */}
      <motion.div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(0,229,255,0.5), transparent)" }}
        initial={{ scaleX: 0 }}
        animate={isReady ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, ease: EASE }}
      />

      {/* ── HUD: top-right system info ── */}
      <AnimatePresence>
        {isReady && (
          <motion.div
            className="absolute top-24 right-8 md:right-20 flex flex-col items-end gap-1 font-[family-name:var(--font-geist-mono)]"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <span className="text-[9px] tracking-[0.3em] uppercase" style={{ color: "rgba(0,229,255,0.4)" }}>
              SYSTEM : ONLINE
            </span>
            <span className="text-[9px] tracking-widest tabular-nums" style={{ color: "rgba(0,229,255,0.35)" }}>
              {time}
            </span>
            <span className="text-[9px] tracking-wider" style={{ color: "rgba(0,229,255,0.25)" }}>
              SYS://LAKHANI.NET
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HUD: bottom-left coordinates ── */}
      <AnimatePresence>
        {isReady && (
          <motion.div
            className="absolute bottom-24 left-8 md:left-20 font-[family-name:var(--font-geist-mono)] flex flex-col gap-1"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
          >
            <span className="text-[9px] tracking-[0.25em]" style={{ color: "rgba(0,229,255,0.3)" }}>
              33.6844° N / 73.0479° E
            </span>
            <span className="text-[9px] tracking-[0.3em] uppercase" style={{ color: "rgba(0,229,255,0.22)" }}>
              SECTOR {"//"} ISLAMABAD
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Corner brackets ── */}
      {isReady && (
        <>
          <motion.div
            aria-hidden
            className="absolute top-20 left-6 w-6 h-6"
            style={{ borderTop: "1px solid rgba(0,229,255,0.25)", borderLeft: "1px solid rgba(0,229,255,0.25)" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
          />
          <motion.div
            aria-hidden
            className="absolute bottom-16 right-6 w-6 h-6"
            style={{ borderBottom: "1px solid rgba(0,229,255,0.25)", borderRight: "1px solid rgba(0,229,255,0.25)" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
          />
        </>
      )}

      {/* ── Main content ── */}
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
            className="text-secondary text-xs tracking-[0.4em] uppercase font-[family-name:var(--font-geist-mono)]"
          style={{ textShadow: "0 0 6px rgba(255,0,170,0.5)" }}
          >
            Portfolio — 2025
          </motion.p>
        </div>

        {/* First name */}
        <div className="overflow-hidden">
          <motion.h1
            variants={slideUp}
            className="font-[family-name:var(--font-bebas-neue)] text-[clamp(5rem,16vw,17rem)] leading-[0.88] text-foreground"
          >
            Rayyan
          </motion.h1>
        </div>

        {/* Last name — neon cyan with subtle glow */}
        <div className="overflow-hidden">
          <motion.h1
            variants={slideUp}
            className="font-[family-name:var(--font-bebas-neue)] text-[clamp(5rem,16vw,17rem)] leading-[0.88] text-primary glow-cyan"
          >
            Lakhani
          </motion.h1>
        </div>

        {/* Animated role */}
        <motion.div
          variants={fade}
          className="flex items-center gap-5 mt-10 h-8 overflow-hidden"
        >
          <div className="w-10 h-px bg-primary" style={{ boxShadow: "0 0 8px rgba(0,229,255,0.6)" }} />
          <AnimatePresence mode="wait">
            <motion.span
              key={roleIdx}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="text-foreground/60 text-base tracking-wide font-[family-name:var(--font-geist-mono)]"
            >
              <span style={{ color: "rgba(0,229,255,0.4)" }}>{"//"} </span>{roles[roleIdx]}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        {/* CTAs */}
        <motion.div variants={fade} className="flex flex-wrap gap-5 mt-12">
          <a
            href="#projects"
            className="inline-flex items-center gap-3 border border-primary text-primary px-9 py-3.5 text-xs tracking-[0.25em] uppercase hover:bg-primary hover:text-background transition-all duration-300 font-[family-name:var(--font-geist-mono)] relative group"
            style={{ boxShadow: "0 0 12px rgba(0,229,255,0.1)" }}
          >
            {/* Corner accent */}
            <span
              aria-hidden
              className="absolute -top-px -left-px w-2 h-2 border-t border-l border-primary opacity-0 group-hover:opacity-100 transition-opacity"
            />
            View Work
            <span className="text-base leading-none group-hover:translate-x-1 transition-transform duration-300">→</span>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-3 border border-foreground/15 text-foreground/45 px-9 py-3.5 text-xs tracking-[0.25em] uppercase hover:border-primary/50 hover:text-foreground/80 transition-all duration-300 font-[family-name:var(--font-geist-mono)]"
          >
            Get in Touch
          </a>
        </motion.div>
      </motion.div>

      {/* Large decorative number */}
      <div
        aria-hidden
        className="absolute right-0 top-1/2 -translate-y-1/2 font-[family-name:var(--font-bebas-neue)] text-[22vw] leading-none select-none pointer-events-none"
        style={{ color: "rgba(0,229,255,0.025)" }}
      >
        01
      </div>

      {/* Scroll indicator */}
      {isReady && (
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
        >
          <p
            className="text-[10px] tracking-[0.4em] uppercase font-[family-name:var(--font-geist-mono)]"
            style={{ color: "rgba(0,229,255,0.3)" }}
          >
            Scroll
          </p>
          <div className="relative w-px h-14 overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 w-full h-full"
              style={{ background: "linear-gradient(to bottom, #00e5ff, transparent)" }}
              animate={{ y: ["-100%", "100%"] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </motion.div>
      )}
    </section>
  )
}
