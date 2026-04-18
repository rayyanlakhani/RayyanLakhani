"use client"
import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

const EASE = [0.76, 0, 0.24, 1] as const

const journey = [
  {
    id: "00",
    year: "2022",
    label: "ORIGIN",
    title: "First Line of Code",
    body: "Discovered programming through Python scripts and small CLI tools. Realised software was the medium I'd been looking for — every idea, executable.",
    tags: ["Python", "Bash", "Curiosity"],
  },
  {
    id: "01",
    year: "2023",
    label: "CRAFT",
    title: "Going Full-Stack",
    body: "Dove into React, Node, and PostgreSQL. Shipped my first production app — a real-time dashboard used by 200+ daily users in three weeks.",
    tags: ["React", "Node.js", "PostgreSQL"],
  },
  {
    id: "02",
    year: "2024",
    label: "DEPTH",
    title: "Systems Thinking",
    body: "Moved up the stack: TypeScript, design systems, performance budgets, CI/CD. Started caring about cache headers as much as colour palettes.",
    tags: ["TypeScript", "DevOps", "Performance"],
  },
  {
    id: "03",
    year: "2025",
    label: "MOTION",
    title: "The Creative Web",
    body: "Found my niche where engineering meets design — Framer Motion, GSAP, WebGL. Building experiences that don't just work, they perform.",
    tags: ["Framer Motion", "GSAP", "WebGL"],
  },
  {
    id: "04",
    year: "2026",
    label: "NOW",
    title: "Open for Work",
    body: "Currently exploring opportunities — full-time, contract, or collab. If you're building something ambitious and need a creative engineer, let's talk.",
    tags: ["Available", "Remote", "Worldwide"],
  },
]

type Step = (typeof journey)[number]

export default function Experience() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)")
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  return isMobile ? <ExperienceMobile /> : <ExperienceDesktop />
}

/* ──────────────────────────────────────────────
   Desktop — horizontal scroll
   ────────────────────────────────────────────── */
function ExperienceDesktop() {
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  })

  const x = useTransform(scrollYProgress, [0, 1], ["2vw", "-78vw"])
  const headerOpacity = useTransform(scrollYProgress, [0, 0.05, 0.92, 1], [0, 1, 1, 0])
  const progressW = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative"
      style={{ height: "400vh" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, #00060e 100%)",
          }}
        />

        <motion.div
          style={{ opacity: headerOpacity }}
          className="absolute top-24 left-8 md:left-20 right-8 md:right-20 z-20 flex justify-between items-end"
        >
          <div>
            <p className="text-primary text-xs tracking-[0.4em] uppercase mb-3 font-[family-name:var(--font-geist-mono)]">
              Journey ↦ Horizontal
            </p>
            <h2 className="font-[family-name:var(--font-bebas-neue)] text-[clamp(2.5rem,6vw,5rem)] leading-[0.9] text-foreground">
              The Path So Far
            </h2>
          </div>
          <div className="hidden md:flex flex-col items-end gap-1 font-[family-name:var(--font-geist-mono)]">
            <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: "rgba(255,255,255,0.5)" }}>
              Scroll ↓ to traverse →
            </span>
            <span className="text-[10px] tracking-widest tabular-nums" style={{ color: "rgba(255,255,255,0.5)" }}>
              {journey.length} CHAPTERS · 2022 – 2026
            </span>
          </div>
        </motion.div>

        <motion.div
          style={{ x }}
          className="flex items-center gap-8 md:gap-12 will-change-transform"
        >
          {journey.map((step, i) => (
            <Card key={step.id} step={step} index={i} />
          ))}
          <div className="shrink-0" style={{ width: "20vw" }} />
        </motion.div>

        <div className="absolute bottom-12 left-8 md:left-20 right-8 md:right-20 z-20 flex items-center gap-5">
          <span className="text-[10px] tracking-[0.4em] uppercase font-[family-name:var(--font-geist-mono)]" style={{ color: "rgba(255,255,255,0.5)" }}>
            00
          </span>
          <div className="relative flex-1 h-px" style={{ background: "rgba(255,255,255,0.12)" }}>
            <motion.div
              className="absolute top-0 left-0 h-px"
              style={{
                width: progressW,
                background: "#fee801",
                boxShadow: "0 0 8px rgba(254,232,1,0.6)",
              }}
            />
            {journey.map((_, i) => (
              <div
                key={i}
                className="absolute top-1/2 -translate-y-1/2 w-[6px] h-[6px] -translate-x-1/2"
                style={{
                  left: `${(i / (journey.length - 1)) * 100}%`,
                  background: "rgba(255,255,255,0.5)",
                  border: "1px solid rgba(255,255,255,0.5)",
                  borderRadius: "1px",
                }}
              />
            ))}
          </div>
          <span className="text-[10px] tracking-[0.4em] uppercase font-[family-name:var(--font-geist-mono)]" style={{ color: "rgba(255,255,255,0.5)" }}>
            {String(journey.length).padStart(2, "0")}
          </span>
        </div>

        <div
          aria-hidden
          className="absolute right-0 top-1/2 -translate-y-1/2 font-[family-name:var(--font-bebas-neue)] text-[22vw] leading-none select-none pointer-events-none"
          style={{ color: "rgba(255,255,255,0.035)" }}
        >
          04
        </div>
      </div>
    </section>
  )
}

/* ──────────────────────────────────────────────
   Mobile — vertical timeline with central rail
   ────────────────────────────────────────────── */
function ExperienceMobile() {
  return (
    <section id="experience" className="relative px-6 py-24 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 40%, #00060e 100%)",
        }}
      />

      {/* Header */}
      <div className="relative z-10 mb-14">
        <p className="text-primary text-xs tracking-[0.4em] uppercase mb-3 font-[family-name:var(--font-geist-mono)]">
          Journey ↓ Vertical
        </p>
        <h2 className="font-[family-name:var(--font-bebas-neue)] text-[clamp(2.5rem,10vw,4rem)] leading-[0.9] text-foreground">
          The Path So Far
        </h2>
        <p className="mt-3 text-[10px] tracking-[0.3em] uppercase font-[family-name:var(--font-geist-mono)]" style={{ color: "rgba(255,255,255,0.55)" }}>
          {journey.length} CHAPTERS · 2022–2026
        </p>
      </div>

      {/* Vertical rail with cards */}
      <div className="relative z-10 pl-6">
        {/* Left rail line */}
        <div
          aria-hidden
          className="absolute left-2 top-0 bottom-0 w-px"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(254,232,1,0.5) 8%, rgba(254,232,1,0.5) 92%, transparent)",
          }}
        />

        <div className="flex flex-col gap-10">
          {journey.map((step, i) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: EASE }}
              className="relative"
            >
              {/* Node dot */}
              <span
                aria-hidden
                className="absolute -left-[22px] top-3 w-[8px] h-[8px]"
                style={{
                  background: "#fee801",
                  boxShadow: "0 0 8px rgba(254,232,1,0.9)",
                  transform: "rotate(45deg)",
                }}
              />

              <MobileCard step={step} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function MobileCard({ step }: { step: Step }) {
  return (
    <div
      className="relative p-5 overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.005) 100%)",
        border: "1px solid rgba(255,255,255,0.13)",
      }}
    >
      <span
        aria-hidden
        className="absolute top-0 left-0 w-3 h-3"
        style={{ borderTop: "1px solid #fee801", borderLeft: "1px solid #fee801" }}
      />
      <span
        aria-hidden
        className="absolute bottom-0 right-0 w-3 h-3"
        style={{ borderBottom: "1px solid #fee801", borderRight: "1px solid #fee801" }}
      />

      <div className="flex items-start justify-between mb-3 font-[family-name:var(--font-geist-mono)]">
        <div>
          <div className="text-[9px] tracking-[0.3em]" style={{ color: "rgba(255,255,255,0.5)" }}>
            CH {step.id}
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span
              className="text-[9px] px-2 py-[2px] tracking-widest"
              style={{
                color: "#fee801",
                border: "1px solid rgba(254,232,1,0.5)",
              }}
            >
              {step.label}
            </span>
          </div>
        </div>
        <span className="font-[family-name:var(--font-bebas-neue)] text-3xl text-foreground/20">
          {step.year}
        </span>
      </div>

      <h3 className="font-[family-name:var(--font-bebas-neue)] text-2xl leading-tight text-foreground mb-2">
        {step.title}
      </h3>
      <p className="text-foreground/70 text-sm leading-relaxed mb-4">{step.body}</p>

      <div className="flex flex-wrap gap-2">
        {step.tags.map((t) => (
          <span
            key={t}
            className="text-[9px] tracking-wider font-[family-name:var(--font-geist-mono)] px-2 py-[3px]"
            style={{
              color: "rgba(255,255,255,0.7)",
              border: "1px solid rgba(255,255,255,0.16)",
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}

function Card({
  step,
  index,
}: {
  step: Step
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  return (
    <motion.div
      ref={ref}
      className="relative shrink-0 group"
      style={{ width: "min(72vw, 560px)", height: "min(60vh, 460px)" }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, delay: index * 0.05, ease: EASE }}
    >
      <div
        className="relative w-full h-full p-8 md:p-10 flex flex-col justify-between transition-all duration-500"
        style={{
          background:
            "linear-gradient(160deg, rgba(255,255,255,0.035) 0%, rgba(255,255,255,0.005) 100%)",
          border: "1px solid rgba(255,255,255,0.10)",
          backdropFilter: "blur(8px)",
        }}
      >
        <span
          aria-hidden
          className="absolute top-0 left-0 w-5 h-5"
          style={{
            borderTop: "1px solid #fee801",
            borderLeft: "1px solid #fee801",
            boxShadow: "0 0 8px rgba(254,232,1,0.6)",
          }}
        />
        <span
          aria-hidden
          className="absolute bottom-0 right-0 w-5 h-5"
          style={{
            borderBottom: "1px solid #fee801",
            borderRight: "1px solid #fee801",
            boxShadow: "0 0 8px rgba(254,232,1,0.6)",
          }}
        />

        <div className="flex items-start justify-between">
          <div>
            <span
              className="text-[10px] tracking-[0.3em] font-[family-name:var(--font-geist-mono)]"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              CHAPTER {step.id}
            </span>
            <div className="flex items-center gap-3 mt-1">
              <span
                className="text-[10px] px-2 py-[2px] tracking-widest font-[family-name:var(--font-geist-mono)]"
                style={{
                  color: "#fee801",
                  border: "1px solid rgba(254,232,1,0.5)",
                }}
              >
                {step.label}
              </span>
            </div>
          </div>
          <span className="font-[family-name:var(--font-bebas-neue)] text-5xl text-foreground/15">
            {step.year}
          </span>
        </div>

        <div>
          <h3 className="font-[family-name:var(--font-bebas-neue)] text-4xl md:text-5xl leading-[0.95] text-foreground mb-4">
            {step.title}
          </h3>
          <p className="text-foreground/70 text-sm md:text-base leading-relaxed max-w-md">
            {step.body}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {step.tags.map((t) => (
            <span
              key={t}
              className="text-[10px] tracking-wider font-[family-name:var(--font-geist-mono)] px-3 py-1"
              style={{
                color: "rgba(255,255,255,0.7)",
                border: "1px solid rgba(255,255,255,0.16)",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
