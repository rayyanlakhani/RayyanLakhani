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
    <section id="projects" className="relative px-8 md:px-20 py-32">
      <div className="max-w-7xl w-full mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-primary text-xs tracking-[0.4em] uppercase mb-4"
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

        <div className="border-t border-border/40">
          {projects.map((p, i) => (
            <motion.a
              key={p.id}
              href={p.href}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
              onMouseEnter={() => setHovered(p.id)}
              onMouseLeave={() => setHovered(null)}
              className="block border-b border-border/40 py-10 group transition-colors duration-300 hover:bg-foreground/[0.02]"
            >
              <div className="flex items-start justify-between gap-8">
                <div className="flex items-start gap-8">
                  <span className="font-mono text-sm text-primary/60 mt-1 shrink-0">{p.id}</span>
                  <div>
                    <h3
                      className={`font-[family-name:var(--font-bebas-neue)] text-4xl md:text-6xl leading-none transition-colors duration-300 ${
                        hovered === p.id ? "text-primary" : "text-foreground"
                      }`}
                    >
                      {p.title}
                    </h3>
                    <p className="text-foreground/45 mt-3 max-w-xl leading-relaxed text-sm">
                      {p.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-5">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] text-foreground/35 border border-border/40 px-3 py-1 tracking-wider"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-5 shrink-0 pt-1">
                  <span className="text-foreground/25 text-sm">{p.year}</span>
                  <motion.span
                    animate={{
                      x: hovered === p.id ? 0 : -8,
                      opacity: hovered === p.id ? 1 : 0,
                    }}
                    transition={{ duration: 0.25 }}
                    className="text-primary text-xl"
                  >
                    →
                  </motion.span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      <div
        aria-hidden
        className="absolute right-0 bottom-8 font-[family-name:var(--font-bebas-neue)] text-[22vw] leading-none text-foreground/[0.03] select-none pointer-events-none"
      >
        04
      </div>
    </section>
  )
}
