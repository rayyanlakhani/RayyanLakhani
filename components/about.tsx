"use client"
import { motion } from "framer-motion"

const EASE = [0.76, 0, 0.24, 1] as const

const ov = {
  hidden:  { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
}

const stats = [
  { value: "10+",  label: "Projects Shipped", hex: "0x0A" },
  { value: "3+",   label: "Years Building",   hex: "0x03" },
  { value: "∞",    label: "Lines of Code",    hex: "0xFF" },
]

export default function About() {
  return (
    <section id="about" className="relative min-h-screen flex items-center px-8 md:px-20 py-32 overflow-hidden">

      {/* Subtle background grid */}
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
        style={{
          background: "radial-gradient(ellipse 70% 70% at 30% 50%, transparent 50%, #030712 100%)",
        }}
      />

      {/* Section bracket — top left */}
      <motion.div
        aria-hidden
        className="absolute top-12 left-6 md:left-16 w-8 h-8"
        style={{ borderTop: "1px solid rgba(0,229,255,0.2)", borderLeft: "1px solid rgba(0,229,255,0.2)" }}
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
        viewport={{ once: true }} transition={{ duration: 0.4 }}
      />
      <motion.div
        aria-hidden
        className="absolute bottom-12 right-6 md:right-16 w-8 h-8"
        style={{ borderBottom: "1px solid rgba(0,229,255,0.2)", borderRight: "1px solid rgba(0,229,255,0.2)" }}
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
        viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.1 }}
      />

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10">
        {/* Left — heading */}
        <div>
          <motion.p
            variants={ov} initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-secondary text-xs tracking-[0.4em] uppercase mb-6 font-[family-name:var(--font-geist-mono)]"
            style={{ textShadow: "0 0 6px rgba(255,0,170,0.5)" }}
          >
            About Me
          </motion.p>

          <div className="overflow-hidden">
            <motion.h2
              variants={ov} initial="hidden" whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="font-[family-name:var(--font-bebas-neue)] text-[clamp(3.5rem,9vw,7rem)] leading-[0.9] text-foreground"
            >
              Building the<br />
              <span className="text-primary glow-cyan">Future,</span><br />
              one line at<br />
              a time.
            </motion.h2>
          </div>

          {/* Horizontal accent */}
          <motion.div
            initial={{ scaleX: 0, transformOrigin: "left" }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6, ease: EASE }}
            className="h-px w-20 mt-8"
            style={{ background: "linear-gradient(90deg, #00e5ff, transparent)", boxShadow: "0 0 6px rgba(0,229,255,0.4)" }}
          />
        </div>

        {/* Right — body */}
        <div className="space-y-8">
          <motion.p
            variants={ov} initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-foreground/70 text-lg leading-relaxed"
          >
            I&apos;m Rayyan — a passionate developer who loves crafting clean,
            performant digital experiences. I bridge the gap between design and
            engineering, turning complex ideas into elegant code.
          </motion.p>

          <motion.p
            variants={ov} initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.1 }}
            className="text-foreground/70 text-lg leading-relaxed"
          >
            Whether it&apos;s building full-stack applications, optimising
            performance, or exploring the latest in web technology — I bring
            curiosity and precision to everything I create.
          </motion.p>

          {/* Stats */}
          <motion.div
            variants={ov} initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-3 gap-6 pt-10"
            style={{ borderTop: "1px solid rgba(0,229,255,0.14)" }}
          >
            {stats.map((s) => (
              <div key={s.label} className="group">
                {/* Hex label */}
                <div
                  className="text-[9px] tracking-[0.3em] mb-1 font-[family-name:var(--font-geist-mono)]"
                  style={{ color: "rgba(0,229,255,0.35)" }}
                >
                  {s.hex}
                </div>
                <div
                  className="font-[family-name:var(--font-bebas-neue)] text-5xl text-primary transition-all duration-300 group-hover:glow-cyan"
                  style={{ textShadow: "0 0 16px rgba(0,229,255,0.3)" }}
                >
                  {s.value}
                </div>
                <div className="text-foreground/50 text-xs mt-1 tracking-wide font-[family-name:var(--font-geist-mono)]">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div
        aria-hidden
        className="absolute right-0 bottom-8 font-[family-name:var(--font-bebas-neue)] text-[22vw] leading-none select-none pointer-events-none"
        style={{ color: "rgba(0,229,255,0.025)" }}
      >
        02
      </div>
    </section>
  )
}
