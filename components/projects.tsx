"use client"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion"

const EASE = [0.76, 0, 0.24, 1] as const

const projects = [
  {
    id: "01",
    title: "Harrod Estates",
    description:
      "A premium real-estate platform built for a UK property firm — blazing-fast listings, animated transitions, and a CMS-driven backend.",
    tags: ["Next.js", "TypeScript", "Sanity"],
    year: "2025",
    href: "#",
    image: "/images/harrodestates.png",
  },
  {
    id: "02",
    title: "Intrigrow",
    description:
      "A growth-marketing agency site with custom motion choreography. Every section earned its weight in performance and polish.",
    tags: ["Next.js", "Framer Motion", "Tailwind"],
    year: "2025",
    href: "#",
    image: "/images/intrigrow.png",
  },
  {
    id: "03",
    title: "Don Molano",
    description:
      "Brand & e-commerce experience for a luxury menswear label — buttery scrolling, refined product reveals, and a full Stripe integration.",
    tags: ["Next.js", "Stripe", "Shopify"],
    year: "2024",
    href: "#",
    image: "/images/donmolano.png",
  },
  {
    id: "04",
    title: "Sir Model",
    description:
      "Portfolio site for a modelling agency — image-heavy, but engineered to load instantly with edge caching and adaptive image pipelines.",
    tags: ["React", "Cloudinary", "Vercel"],
    year: "2024",
    href: "#",
    image: "/images/sirmodel.png",
  },
  {
    id: "05",
    title: "FYP — Final Year Project",
    description:
      "An AI-driven academic project combining Python, computer vision, and a React dashboard — the work that started it all.",
    tags: ["Python", "OpenCV", "React"],
    year: "2023",
    href: "#",
    image: "/images/fyp.png",
  },
]

export default function Projects() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Cursor-tracked motion values for the floating preview
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 22, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 200, damping: 22, mass: 0.5 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const c = containerRef.current
      if (!c) return
      const rect = c.getBoundingClientRect()
      x.set(e.clientX - rect.left)
      y.set(e.clientY - rect.top)
    }
    window.addEventListener("mousemove", onMove)
    return () => window.removeEventListener("mousemove", onMove)
  }, [x, y])

  return (
    <section id="projects" className="relative px-8 md:px-20 py-32 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 50%, #00060e 100%)" }}
      />

      <div className="max-w-7xl w-full mx-auto relative z-10" ref={containerRef}>
        <motion.p
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-primary text-xs tracking-[0.4em] uppercase mb-4 font-[family-name:var(--font-geist-mono)]"
        >
          Projects · Hover to Preview
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE }}
          className="font-[family-name:var(--font-bebas-neue)] text-[clamp(3.5rem,9vw,7rem)] leading-[0.9] text-foreground mb-20"
        >
          Featured Work
        </motion.h2>

        {/* Floating preview that follows the cursor */}
        <AnimatePresence>
          {hoveredId && (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.25, ease: EASE }}
              style={{
                x: sx,
                y: sy,
                translateX: "-50%",
                translateY: "-50%",
                pointerEvents: "none",
              }}
              className="absolute top-0 left-0 z-30 w-[280px] md:w-[360px] aspect-[16/10] hidden md:block"
            >
              <div
                className="relative w-full h-full overflow-hidden"
                style={{
                  border: "1px solid rgba(254,232,1,0.55)",
                  boxShadow:
                    "0 0 30px rgba(254,232,1,0.25), 0 20px 40px rgba(0,0,0,0.5)",
                }}
              >
                {projects.map((p) => (
                  <motion.div
                    key={p.id}
                    initial={false}
                    animate={{ opacity: hoveredId === p.id ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="360px"
                      className="object-cover"
                      priority={false}
                    />
                  </motion.div>
                ))}
                {/* HUD overlay on preview */}
                <div className="absolute inset-0 pointer-events-none" style={{
                  background: "linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.65))",
                }} />
                <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end font-[family-name:var(--font-geist-mono)]">
                  <span
                    className="text-[10px] tracking-[0.3em] uppercase"
                    style={{ color: "rgba(255,255,255,0.85)" }}
                  >
                    {projects.find((p) => p.id === hoveredId)?.title}
                  </span>
                  <span
                    className="text-[10px] tracking-widest"
                    style={{ color: "#fee801", textShadow: "0 0 6px rgba(254,232,1,0.7)" }}
                  >
                    OPEN ↗
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.14)" }}>
          {projects.map((p, i) => {
            const isHov = hoveredId === p.id
            return (
              <motion.a
                key={p.id}
                href={p.href}
                data-cursor-hover
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
                onMouseEnter={() => setHoveredId(p.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="block py-10 group transition-colors duration-300 relative"
                style={{
                  borderBottom: "1px solid rgba(255,255,255,0.14)",
                  background: isHov ? "rgba(254,232,1,0.025)" : "transparent",
                }}
              >
                {/* Left neon accent on hover */}
                <motion.div
                  className="absolute left-0 top-0 bottom-0 w-px"
                  animate={{
                    opacity: isHov ? 1 : 0,
                    background: "#ffffff",
                    boxShadow: isHov ? "0 0 6px rgba(255,255,255,0.55)" : "none",
                  }}
                  transition={{ duration: 0.2 }}
                />

                <div className="flex items-start justify-between gap-8 pl-5">
                  <div className="flex items-start gap-8">
                    <span
                      className="font-[family-name:var(--font-geist-mono)] text-sm mt-1 shrink-0 transition-colors duration-200"
                      style={{ color: isHov ? "#fee801" : "rgba(255,255,255,0.5)" }}
                    >
                      {p.id}
                    </span>
                    <div>
                      {/* Title slides right + becomes red on hover */}
                      <motion.h3
                        animate={{ x: isHov ? 18 : 0 }}
                        transition={{ duration: 0.4, ease: EASE }}
                        className="font-[family-name:var(--font-bebas-neue)] text-4xl md:text-6xl leading-none transition-all duration-300"
                        style={{
                          color: isHov ? "#fee801" : "#e4e4e7",
                          textShadow: isHov ? "0 0 14px rgba(254,232,1,0.3)" : "none",
                        }}
                      >
                        {p.title}
                      </motion.h3>
                      <p className="text-foreground/65 mt-3 max-w-xl leading-relaxed text-sm">
                        {p.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-5">
                        {p.tags.map((t) => (
                          <span
                            key={t}
                            className="text-[10px] tracking-wider font-[family-name:var(--font-geist-mono)] px-3 py-1 transition-all duration-200"
                            style={{
                              color: isHov ? "rgba(254,232,1,0.9)" : "rgba(255,255,255,0.55)",
                              border: isHov
                                ? "1px solid rgba(254,232,1,0.4)"
                                : "1px solid rgba(255,255,255,0.16)",
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
                      style={{ color: "rgba(255,255,255,0.4)" }}
                    >
                      {p.year}
                    </span>
                    <motion.span
                      animate={{
                        x: isHov ? 0 : -8,
                        opacity: isHov ? 1 : 0,
                        color: "#fee801",
                      }}
                      transition={{ duration: 0.25 }}
                      className="text-xl"
                      style={{ textShadow: "0 0 6px rgba(254,232,1,0.55)" }}
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
        style={{ color: "rgba(255,255,255,0.035)" }}
      >
        05
      </div>
    </section>
  )
}
