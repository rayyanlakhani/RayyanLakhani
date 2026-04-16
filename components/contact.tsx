"use client"
import { motion } from "framer-motion"

const EASE = [0.76, 0, 0.24, 1] as const

const socials = [
  { label: "GitHub",   href: "https://github.com/rayyanlakhani" },
  { label: "LinkedIn", href: "#" },
  { label: "Email",    href: "mailto:bilaltaha16519@gmail.com" },
]

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative min-h-screen flex flex-col justify-center px-8 md:px-20 py-32 overflow-hidden"
    >
      {/* Background grid */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,229,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,229,255,0.025) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, #030712 100%)" }}
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
          style={{ color: "rgba(0,229,255,0.025)" }}
        >
          CONTACT
        </motion.div>
      </div>

      {/* Corner brackets */}
      <motion.div
        aria-hidden
        className="absolute top-10 left-6 md:left-16 w-8 h-8"
        style={{ borderTop: "1px solid rgba(0,229,255,0.2)", borderLeft: "1px solid rgba(0,229,255,0.2)" }}
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
        viewport={{ once: true }} transition={{ duration: 0.4 }}
      />
      <motion.div
        aria-hidden
        className="absolute top-10 right-6 md:right-16 w-8 h-8"
        style={{ borderTop: "1px solid rgba(0,229,255,0.2)", borderRight: "1px solid rgba(0,229,255,0.2)" }}
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
        viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.05 }}
      />

      <div className="relative z-10 max-w-7xl w-full mx-auto">
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-secondary text-xs tracking-[0.4em] uppercase mb-8 font-[family-name:var(--font-geist-mono)]"
          style={{ textShadow: "0 0 6px rgba(255,0,170,0.5)" }}
        >
          Get in Touch
        </motion.p>

        {/* Heading */}
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

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="flex flex-col md:flex-row items-start md:items-center gap-8"
        >
          {/* Primary CTA */}
          <a
            href="mailto:bilaltaha16519@gmail.com"
            data-cursor-hover
            className="inline-flex items-center gap-4 text-xs tracking-[0.25em] uppercase px-10 py-4 transition-all duration-300 group relative font-[family-name:var(--font-geist-mono)]"
            style={{
              color: "#00e5ff",
              border: "1px solid rgba(0,229,255,0.55)",
              boxShadow: "0 0 12px rgba(0,229,255,0.1), inset 0 0 12px rgba(0,229,255,0.03)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget
              el.style.background = "#00e5ff"
              el.style.color = "#000"
              el.style.boxShadow = "0 0 24px rgba(0,229,255,0.5), inset 0 0 24px rgba(0,229,255,0.1)"
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget
              el.style.background = "transparent"
              el.style.color = "#00e5ff"
              el.style.boxShadow = "0 0 12px rgba(0,229,255,0.1), inset 0 0 12px rgba(0,229,255,0.03)"
            }}
          >
            {/* Terminal-style prompt */}
            <span style={{ color: "rgba(0,229,255,0.5)" }} className="group-hover:text-black/50 transition-colors">
              &gt;_
            </span>
            <span>Send a Message</span>
            <span className="inline-block group-hover:translate-x-1 transition-transform duration-300">→</span>
          </a>

          {/* Social links */}
          <div className="flex gap-8">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                data-cursor-hover
                className="text-xs tracking-[0.2em] uppercase transition-all duration-300 font-[family-name:var(--font-geist-mono)] group"
                style={{ color: "rgba(232,244,255,0.35)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "#00e5ff"
                  ;(e.currentTarget as HTMLElement).style.textShadow = "0 0 6px rgba(0,229,255,0.7)"
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "rgba(232,244,255,0.35)"
                  ;(e.currentTarget as HTMLElement).style.textShadow = "none"
                }}
              >
                {s.label}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Terminal-style status block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 font-[family-name:var(--font-geist-mono)] space-y-1"
          style={{ color: "rgba(0,229,255,0.3)" }}
        >
          <div className="text-[10px] tracking-wider">
            <span style={{ color: "rgba(0,229,255,0.5)" }}>&gt;</span> STATUS: AVAILABLE FOR NEW OPPORTUNITIES
          </div>
          <div className="text-[10px] tracking-wider">
            <span style={{ color: "rgba(0,229,255,0.5)" }}>&gt;</span> RESPONSE TIME: &lt; 24 HOURS
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="absolute bottom-10 left-8 md:left-20 right-8 md:right-20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-8"
        style={{ borderTop: "1px solid rgba(0,229,255,0.1)" }}
      >
        <span
          className="text-xs tracking-wider font-[family-name:var(--font-geist-mono)]"
          style={{ color: "rgba(232,244,255,0.25)" }}
        >
          © {new Date().getFullYear()} Rayyan Lakhani
        </span>
        <span
          className="text-xs tracking-wider font-[family-name:var(--font-geist-mono)]"
          style={{ color: "rgba(232,244,255,0.2)" }}
        >
          Designed &amp; Built from scratch
        </span>
      </motion.div>
    </section>
  )
}
