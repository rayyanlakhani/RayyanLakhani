"use client"
import { motion } from "framer-motion"

const EASE = [0.76, 0, 0.24, 1] as const

const socials = [
  { label: "GitHub",   href: "https://github.com/rayyanlakhani" },
  { label: "LinkedIn", href: "#" },
  { label: "Email",    href: "mailto:rayyan@example.com" },
]

export default function Contact() {
  return (
    <section id="contact" className="relative min-h-screen flex flex-col justify-center px-8 md:px-20 py-32 overflow-hidden">
      {/* Huge background word */}
      <div
        aria-hidden
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
      >
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="font-[family-name:var(--font-bebas-neue)] text-[28vw] leading-none text-foreground/[0.025] whitespace-nowrap"
        >
          CONTACT
        </motion.div>
      </div>

      <div className="relative z-10 max-w-7xl w-full mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-primary text-xs tracking-[0.4em] uppercase mb-8"
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
            className="font-[family-name:var(--font-bebas-neue)] text-[clamp(4rem,12vw,11rem)] leading-[0.88] text-primary mb-16"
          >
            Something Great
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="flex flex-col md:flex-row items-start md:items-center gap-8"
        >
          <a
            href="mailto:rayyan@example.com"
            className="inline-flex items-center gap-4 border border-primary text-primary px-10 py-4 text-xs tracking-[0.25em] uppercase hover:bg-primary hover:text-background transition-all duration-300 group"
          >
            <span>Send a Message</span>
            <span className="inline-block group-hover:translate-x-1 transition-transform duration-300">→</span>
          </a>

          <div className="flex gap-8">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="text-foreground/35 text-xs tracking-[0.2em] uppercase hover:text-foreground transition-colors duration-300"
              >
                {s.label}
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="absolute bottom-10 left-8 md:left-20 right-8 md:right-20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-t border-border/25 pt-8"
      >
        <span className="text-foreground/25 text-xs tracking-wider">
          © {new Date().getFullYear()} Rayyan Lakhani
        </span>
        <span className="text-foreground/25 text-xs tracking-wider">
          Designed &amp; Built from scratch
        </span>
      </motion.div>
    </section>
  )
}
