"use client"
import { useState } from "react"
import { motion } from "framer-motion"

const EASE = [0.76, 0, 0.24, 1] as const

const projects = [
  {
    id: "01",
    title: "Project Alpha",
    description:
      "A full-stack web application built with Next.js and TypeScript, featuring real-time collaboration, a sleek dashboard, and optimised performance.",
    tags: ["Next.js", "TypeScript", "PostgreSQL"],
    year: "2025",
    href: "#",
  },
  {
    id: "02",
    title: "Project Beta",
    description:
      "An AI-powered automation tool that surfaces intelligent insights through a clean, accessible interface. Built with Python on the backend.",
    tags: ["Python", "React", "OpenAI API"],
    year: "2024",
    href: "#",
  },
  {
    id: "03",
    title: "Project Gamma",
    description:
      "A mobile-first progressive web app with offline support, push notifications, and a seamless cross-device experience.",
    tags: ["React", "PWA", "Node.js"],
    year: "2024",
    href: "#",
  },
]

export default function Projects() {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <section id="projects" className="relative px-8 md:px-20 py-32 overflow-hidden">

      {/* Background */}
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
        style={{ background: "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 50%, #030712 100%)" }}
      />

      <div className="max-w-7xl w-full mx-auto relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-primary text-xs tracking-[0.4em] uppercase mb-4 font-[family-name:var(--font-geist-mono)]"
        >
          Projects
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE }}
          className="font-[family-name:var(--font-bebas-neue)] text-[clamp(3.5rem,9vw,7rem)] leading-[0.9] text-foreground mb-20"
        >
          Featured Work
        </motion.h2>

        <div style={{ borderTop: "1px solid rgba(0,229,255,0.14)" }}>
          {projects.map((p, i) => {
            const isHov = hovered === p.id
            return (
              <motion.a
                key={p.id}
                href={p.href}
                data-cursor-hover
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
                onMouseEnter={() => setHovered(p.id)}
                onMouseLeave={() => setHovered(null)}
                className="block py-10 group transition-colors duration-300 relative"
                style={{
                  borderBottom: "1px solid rgba(0,229,255,0.14)",
                  background: isHov ? "rgba(0,229,255,0.02)" : "transparent",
                }}
              >
                {/* Left neon accent on hover */}
                <motion.div
                  className="absolute left-0 top-0 bottom-0 w-px"
                  animate={{
                    opacity: isHov ? 1 : 0,
                    background: "#ff00aa",
                    boxShadow: isHov ? "0 0 8px rgba(255,0,170,0.8)" : "none",
                  }}
                  transition={{ duration: 0.2 }}
                />

                <div className="flex items-start justify-between gap-8 pl-5">
                  <div className="flex items-start gap-8">
                    <span
                      className="font-[family-name:var(--font-geist-mono)] text-sm mt-1 shrink-0 transition-colors duration-200"
                      style={{ color: isHov ? "#00e5ff" : "rgba(0,229,255,0.35)" }}
                    >
                      {p.id}
                    </span>
                    <div>
                      <h3
                        className="font-[family-name:var(--font-bebas-neue)] text-4xl md:text-6xl leading-none transition-all duration-300"
                        style={{
                          color: isHov ? "#00e5ff" : "#e8f4ff",
                          textShadow: isHov ? "0 0 20px rgba(0,229,255,0.4)" : "none",
                        }}
                      >
                        {p.title}
                      </h3>
                      <p className="text-foreground/50 mt-3 max-w-xl leading-relaxed text-sm">
                        {p.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-5">
                        {p.tags.map((t) => (
                          <span
                            key={t}
                            className="text-[10px] tracking-wider font-[family-name:var(--font-geist-mono)] px-3 py-1 transition-all duration-200"
                            style={{
                              color: isHov ? "rgba(0,229,255,0.8)" : "rgba(232,244,255,0.3)",
                              border: isHov
                                ? "1px solid rgba(0,229,255,0.4)"
                                : "1px solid rgba(232,244,255,0.12)",
                              boxShadow: isHov ? "0 0 6px rgba(0,229,255,0.2)" : "none",
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-5 shrink-0 pt-1">
                    <span
                      className="text-sm font-[family-name:var(--font-geist-mono)]"
                      style={{ color: "rgba(232,244,255,0.25)" }}
                    >
                      {p.year}
                    </span>
                    <motion.span
                      animate={{
                        x: isHov ? 0 : -8,
                        opacity: isHov ? 1 : 0,
                        color: "#00e5ff",
                      }}
                      transition={{ duration: 0.25 }}
                      className="text-xl"
                      style={{ textShadow: "0 0 8px rgba(0,229,255,0.8)" }}
                    >
                      →
                    </motion.span>
                  </div>
                </div>
              </motion.a>
            )
          })}
        </div>
      </div>

      <div
        aria-hidden
        className="absolute right-0 bottom-8 font-[family-name:var(--font-bebas-neue)] text-[22vw] leading-none select-none pointer-events-none"
        style={{ color: "rgba(0,229,255,0.025)" }}
      >
        04
      </div>
    </section>
  )
}
