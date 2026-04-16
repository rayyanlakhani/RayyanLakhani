"use client"
import { motion } from "framer-motion"

const EASE = [0.76, 0, 0.24, 1] as const

const ov = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
}

const stats = [
  { value: "10+", label: "Projects Shipped" },
  { value: "3+",  label: "Years Building" },
  { value: "∞",   label: "Lines of Code" },
]

export default function About() {
  return (
    <section id="about" className="relative min-h-screen flex items-center px-8 md:px-20 py-32">
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        {/* Left — heading */}
        <div>
          <motion.p
            variants={ov} initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-primary text-xs tracking-[0.4em] uppercase mb-6"
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
              <span className="text-primary">Future,</span><br />
              one line at<br />
              a time.
            </motion.h2>
          </div>
        </div>

        {/* Right — body */}
        <div className="space-y-8">
          <motion.p
            variants={ov} initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-foreground/65 text-lg leading-relaxed"
          >
            I&apos;m Rayyan — a passionate developer who loves crafting clean,
            performant digital experiences. I bridge the gap between design and
            engineering, turning complex ideas into elegant code.
          </motion.p>

          <motion.p
            variants={ov} initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.1 }}
            className="text-foreground/65 text-lg leading-relaxed"
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
            className="grid grid-cols-3 gap-6 pt-10 border-t border-border/40"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-[family-name:var(--font-bebas-neue)] text-5xl text-primary">
                  {s.value}
                </div>
                <div className="text-foreground/40 text-xs mt-1 tracking-wide">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div
        aria-hidden
        className="absolute right-0 bottom-8 font-[family-name:var(--font-bebas-neue)] text-[22vw] leading-none text-foreground/[0.03] select-none pointer-events-none"
      >
        02
      </div>
    </section>
  )
}
