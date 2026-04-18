"use client"
import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import Magnetic from "./magnetic"
import ContactForm from "./contact-form"

const EASE = [0.76, 0, 0.24, 1] as const

const socials = [
  { label: "GitHub",   href: "https://github.com/rayyanlakhani" },
  { label: "LinkedIn", href: "#" },
  { label: "Email",    href: "mailto:bilaltaha16519@gmail.com" },
]

const counters = [
  { value: 27, suffix: "+", label: "PROJECTS DELIVERED" },
  { value: 4,  suffix: "y",  label: "YEARS BUILDING WEB" },
  { value: 99, suffix: "%",  label: "CLIENT RETENTION"   },
  { value: 24, suffix: "h",  label: "AVG. RESPONSE"      },
]

function Counter({ value, suffix, duration = 1.6 }: { value: number; suffix: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-20% 0px" })
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView) return
    let raf = 0
    const start = performance.now()
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000))
      const eased = 1 - Math.pow(1 - t, 3) // easeOutCubic
      setN(Math.round(value * eased))
      if (t < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, duration])

  return (
    <span ref={ref} className="tabular-nums">
      {n}
      {suffix}
    </span>
  )
}

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative px-8 md:px-20 py-32 overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, #00060e 100%)" }}
      />

      {/* Huge background word */}
      <div
        aria-hidden
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
      >
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="font-[family-name:var(--font-bebas-neue)] text-[28vw] leading-none whitespace-nowrap"
          style={{ color: "rgba(255,255,255,0.035)" }}
        >
          CONTACT
        </motion.div>
      </div>

      {/* Corner brackets */}
      <motion.div
        aria-hidden
        className="absolute top-10 left-6 md:left-16 w-8 h-8"
        style={{ borderTop: "1px solid rgba(255,255,255,0.18)", borderLeft: "1px solid rgba(255,255,255,0.18)" }}
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
        viewport={{ once: true }} transition={{ duration: 0.4 }}
      />
      <motion.div
        aria-hidden
        className="absolute top-10 right-6 md:right-16 w-8 h-8"
        style={{ borderTop: "1px solid rgba(255,255,255,0.18)", borderRight: "1px solid rgba(255,255,255,0.18)" }}
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
        viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.05 }}
      />

      <div className="relative z-10 max-w-7xl w-full mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-secondary text-xs tracking-[0.4em] uppercase mb-8 font-[family-name:var(--font-geist-mono)]"
          style={{ textShadow: "0 0 6px rgba(255,255,255,0.6)" }}
        >
          Get in Touch
        </motion.p>

        <div className="overflow-hidden">
          <motion.h2
            initial={{ y: "110%" }} whileInView={{ y: "0%" }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE }}
            className="font-[family-name:var(--font-bebas-neue)] text-[clamp(4rem,12vw,11rem)] leading-[0.88] text-foreground"
          >
            Let&apos;s Build
          </motion.h2>
        </div>
        <div className="overflow-hidden">
          <motion.h2
            initial={{ y: "110%" }} whileInView={{ y: "0%" }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.08, ease: EASE }}
            className="font-[family-name:var(--font-bebas-neue)] text-[clamp(4rem,12vw,11rem)] leading-[0.88] text-primary mb-16 glow-cyan"
          >
            Something Great
          </motion.h2>
        </div>

        {/* Animated counter strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-14 py-8"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.10)",
            borderBottom: "1px solid rgba(255,255,255,0.10)",
          }}
        >
          {counters.map((c) => (
            <div key={c.label} className="group">
              <div
                className="font-[family-name:var(--font-bebas-neue)] text-5xl md:text-6xl text-primary leading-none transition-all duration-300 group-hover:tracking-wider"
                style={{ textShadow: "0 0 14px rgba(254,232,1,0.25)" }}
              >
                <Counter value={c.value} suffix={c.suffix} />
              </div>
              <div
                className="mt-2 text-[10px] tracking-[0.3em] font-[family-name:var(--font-geist-mono)]"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                {c.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Form + side rail */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10"
        >
          {/* Form — main column */}
          <div className="lg:col-span-7">
            <ContactForm />

            {/* Quick alt */}
            <div
              className="mt-6 font-[family-name:var(--font-geist-mono)] flex items-center justify-between flex-wrap gap-3 text-[10px] tracking-widest"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              <span>
                <span style={{ color: "#fee801" }}>&gt;</span> OR EMAIL DIRECTLY
              </span>
              <Magnetic strength={0.35} scale={1.04}>
                <a
                  href="mailto:bilaltaha16519@gmail.com"
                  data-cursor-hover
                  className="px-4 py-2 transition-colors duration-300"
                  style={{
                    color: "#fee801",
                    border: "1px solid rgba(254,232,1,0.45)",
                  }}
                  onMouseEnter={(e) => {
                    ;(e.currentTarget as HTMLElement).style.background = "#fee801"
                    ;(e.currentTarget as HTMLElement).style.color = "#00060e"
                  }}
                  onMouseLeave={(e) => {
                    ;(e.currentTarget as HTMLElement).style.background = "transparent"
                    ;(e.currentTarget as HTMLElement).style.color = "#fee801"
                  }}
                >
                  bilaltaha16519@gmail.com
                </a>
              </Magnetic>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div
              className="p-6 font-[family-name:var(--font-geist-mono)]"
              style={{ border: "1px solid rgba(255,255,255,0.10)" }}
            >
              <div
                className="text-[10px] tracking-[0.4em] uppercase mb-4"
                style={{ color: "#fee801" }}
              >
                ── FIND ME
              </div>
              <div className="flex flex-col gap-3">
                {socials.map((s) => (
                  <Magnetic key={s.label} strength={0.3} scale={1.03}>
                    <a
                      href={s.href}
                      data-cursor-hover
                      className="flex items-center justify-between text-xs tracking-[0.2em] uppercase transition-all duration-300 px-3 py-2 group"
                      style={{
                        color: "rgba(255,255,255,0.75)",
                        border: "1px solid rgba(255,255,255,0.10)",
                      }}
                      onMouseEnter={(e) => {
                        ;(e.currentTarget as HTMLElement).style.color = "#fee801"
                        ;(e.currentTarget as HTMLElement).style.borderColor =
                          "rgba(254,232,1,0.5)"
                      }}
                      onMouseLeave={(e) => {
                        ;(e.currentTarget as HTMLElement).style.color =
                          "rgba(255,255,255,0.75)"
                        ;(e.currentTarget as HTMLElement).style.borderColor =
                          "rgba(255,255,255,0.10)"
                      }}
                    >
                      <span>{s.label}</span>
                      <span>→</span>
                    </a>
                  </Magnetic>
                ))}
              </div>
            </div>

            <div
              className="p-6 font-[family-name:var(--font-geist-mono)] space-y-2"
              style={{ border: "1px solid rgba(255,255,255,0.10)" }}
            >
              <div className="text-[10px] tracking-[0.4em] uppercase mb-3" style={{ color: "#fee801" }}>
                ── STATUS
              </div>
              <div className="text-[10px] tracking-wider flex items-center gap-2" style={{ color: "rgba(255,255,255,0.75)" }}>
                <motion.span
                  className="w-[6px] h-[6px] rounded-full inline-block"
                  style={{ background: "#39c4b6", boxShadow: "0 0 6px #39c4b6" }}
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ duration: 1.6, repeat: Infinity }}
                />
                AVAILABLE FOR NEW OPPORTUNITIES
              </div>
              <div className="text-[10px] tracking-wider" style={{ color: "rgba(255,255,255,0.7)" }}>
                <span style={{ color: "#fee801" }}>&gt;</span> RESPONSE TIME: &lt; 24 HOURS
              </div>
              <div className="text-[10px] tracking-wider" style={{ color: "rgba(255,255,255,0.7)" }}>
                <span style={{ color: "#fee801" }}>&gt;</span> BASED IN: ISLAMABAD · REMOTE WORLDWIDE
              </div>
            </div>
          </div>
        </motion.div>
      </div>

    </section>
  )
}
