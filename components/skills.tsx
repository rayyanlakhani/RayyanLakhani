"use client"
import { motion } from "framer-motion"

const EASE = [0.76, 0, 0.24, 1] as const

const categories = [
  {
    id: "FE",
    name: "Frontend",
    items: [
      { name: "React / Next.js", level: 95 },
      { name: "TypeScript",      level: 90 },
      { name: "Tailwind CSS",    level: 92 },
      { name: "Framer Motion",   level: 85 },
      { name: "HTML / CSS",      level: 98 },
    ],
  },
  {
    id: "BE",
    name: "Backend",
    items: [
      { name: "Node.js",         level: 88 },
      { name: "Python",          level: 82 },
      { name: "PostgreSQL",      level: 78 },
      { name: "REST APIs",       level: 92 },
      { name: "GraphQL",         level: 72 },
    ],
  },
  {
    id: "OT",
    name: "Tools & More",
    items: [
      { name: "Git / GitHub",    level: 95 },
      { name: "Docker",          level: 75 },
      { name: "Figma",           level: 80 },
      { name: "Linux",           level: 78 },
      { name: "CI / CD",         level: 76 },
    ],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="relative min-h-screen flex items-center px-8 md:px-20 py-32 overflow-hidden">

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
        style={{ background: "radial-gradient(ellipse 80% 80% at 70% 50%, transparent 45%, #030712 100%)" }}
      />

      <div className="max-w-7xl w-full mx-auto relative z-10">
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-primary text-xs tracking-[0.4em] uppercase mb-4 font-[family-name:var(--font-geist-mono)]"
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: ci * 0.12, ease: EASE }}
              className="relative"
            >
              {/* Category header */}
              <div className="flex items-center gap-3 pb-5 mb-7" style={{ borderBottom: "1px solid rgba(0,229,255,0.14)" }}>
                <span
                  className="text-[9px] font-[family-name:var(--font-geist-mono)] tracking-widest px-2 py-1"
                  style={{
                    color: "#00e5ff",
                    border: "1px solid rgba(0,229,255,0.35)",
                    boxShadow: "0 0 6px rgba(0,229,255,0.15)",
                  }}
                >
                  {cat.id}
                </span>
                <h3 className="text-xs text-primary tracking-[0.3em] uppercase font-[family-name:var(--font-geist-mono)]">
                  {cat.name}
                </h3>
              </div>

              {/* Skills with progress bars */}
              <ul className="space-y-5">
                {cat.items.map((skill, si) => (
                  <motion.li
                    key={skill.name}
                    initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: ci * 0.08 + si * 0.06 }}
                    className="group"
                  >
                    {/* Label row */}
                    <div className="flex justify-between items-center mb-[6px]">
                      <span className="text-sm text-foreground/80 group-hover:text-foreground transition-colors duration-200">
                        {skill.name}
                      </span>
                      <span
                        className="text-[9px] tabular-nums font-[family-name:var(--font-geist-mono)] transition-colors duration-200"
                        style={{ color: "rgba(0,229,255,0.45)" }}
                      >
                        {skill.level}%
                      </span>
                    </div>
                    {/* Progress bar track */}
                    <div
                      className="h-[3px] w-full overflow-hidden"
                      style={{ background: "rgba(0,229,255,0.08)" }}
                    >
                      <motion.div
                        className="h-full origin-left"
                        style={{
                          background: skill.level > 88
                            ? "linear-gradient(90deg, #00e5ff, #ff00aa)"
                            : "linear-gradient(90deg, #00e5ff, rgba(0,229,255,0.6))",
                          boxShadow: skill.level > 88
                            ? "0 0 6px rgba(0,229,255,0.6)"
                            : "0 0 4px rgba(0,229,255,0.5)",
                        }}
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: skill.level / 100 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: ci * 0.08 + si * 0.07, ease: EASE }}
                      />
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      <div
        aria-hidden
        className="absolute right-0 top-1/2 -translate-y-1/2 font-[family-name:var(--font-bebas-neue)] text-[22vw] leading-none select-none pointer-events-none"
        style={{ color: "rgba(0,229,255,0.025)" }}
      >
        03
      </div>
    </section>
  )
}
