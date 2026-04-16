"use client"
import { motion } from "framer-motion"

const EASE = [0.76, 0, 0.24, 1] as const

const categories = [
  {
    name: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    name: "Backend",
    items: ["Node.js", "Python", "PostgreSQL", "REST APIs", "GraphQL"],
  },
  {
    name: "Tools & More",
    items: ["Git", "Docker", "Figma", "Linux", "CI / CD"],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="relative min-h-screen flex items-center px-8 md:px-20 py-32">
      <div className="max-w-7xl w-full mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-primary text-xs tracking-[0.4em] uppercase mb-4"
        >
          Skills
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="font-[family-name:var(--font-bebas-neue)] text-[clamp(3.5rem,9vw,7rem)] leading-[0.9] text-foreground mb-24"
        >
          What I Work With
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: ci * 0.12, ease: EASE }}
            >
              <h3 className="text-xs text-primary tracking-[0.3em] uppercase border-b border-border/40 pb-4 mb-8">
                {cat.name}
              </h3>
              <ul className="space-y-5">
                {cat.items.map((skill, si) => (
                  <motion.li
                    key={skill}
                    initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: ci * 0.08 + si * 0.05 }}
                    className="flex items-center gap-4 text-foreground/75 hover:text-foreground transition-colors group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 group-hover:scale-125 transition-transform" />
                    <span className="text-base">{skill}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      <div
        aria-hidden
        className="absolute right-0 top-1/2 -translate-y-1/2 font-[family-name:var(--font-bebas-neue)] text-[22vw] leading-none text-foreground/[0.03] select-none pointer-events-none"
      >
        03
      </div>
    </section>
  )
}
