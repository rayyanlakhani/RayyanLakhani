"use client"
import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

const EASE = [0.76, 0, 0.24, 1] as const

const journey = [
  {
    id: "00",
    year: "2022",
    label: "BOOT",
    role: "Website Developer",
    company: "Quantino",
    period: "Jun 2022 — Sep 2023",
    title: "First Production Code",
    body: "Joined Quantino as a Website Developer. Shipped 5+ full-stack sites end-to-end with Next.js, Supabase and Tailwind — concept to production, on the client's deadline. Learned what 'done' really means.",
    tags: ["Next.js", "Supabase", "Tailwind"],
  },
  {
    id: "01",
    year: "2024",
    label: "INDEX",
    role: "Website & SEO Intern",
    company: "Allure Digital",
    period: "Jun — Sep 2024",
    title: "Search & Structure",
    body: "Built 20+ responsive WordPress pages and got 30+ of them ranking on Google's first page. Learned the discipline of structured data, keyword research, and on-page SEO — how much of UX lives outside the viewport.",
    tags: ["WordPress", "SEO", "Structured Data"],
  },
  {
    id: "02",
    year: "2024",
    label: "SCALE",
    role: "Full Stack Developer",
    company: "Quantino",
    period: "Oct 2024 — Jun 2025",
    title: "Scaling Up",
    body: "Promoted to Full Stack. Engineered scalable Next.js apps with SSR and deep API integration, wired in third-party auth and analytics, and shipped 20+ sites while holding SEO across multiple locations.",
    tags: ["Next.js", "SSR", "APIs"],
  },
  {
    id: "03",
    year: "2025",
    label: "DEGREE",
    role: "BSc Computer Science",
    company: "NUST",
    period: "Class of 2025",
    title: "Graduated",
    body: "Bachelor's in Computer Science from the National University of Sciences & Technology. Capstone: FinForecastHub — a SaaS forecasting platform on Next.js + FastAPI hitting 92% prediction accuracy.",
    tags: ["NUST", "FYP", "FinForecastHub"],
  },
  {
    id: "04",
    year: "2025",
    label: "NOW",
    role: "Full Stack Developer",
    company: "EdgeFirm",
    period: "2025 — Present",
    title: "Building at EdgeFirm",
    body: "Currently shipping full-stack systems at EdgeFirm — TypeScript, Next.js, end-to-end ownership from data layer to interaction. Open to interesting collabs on the side.",
    tags: ["TypeScript", "Next.js", "Full-Stack"],
  },
]

type Step = (typeof journey)[number]

export default function Experience() {
  return <ExperienceDesktop />
}

/* ──────────────────────────────────────────────
   Desktop — horizontal scroll
   ────────────────────────────────────────────── */
function ExperienceDesktop() {
  const sectionRef = useRef<HTMLElement>(null)
  const [endX, setEndX] = useState("-78vw")

  useEffect(() => {
    const compute = () => {
      const vw = window.innerWidth
      const cardW = Math.min(vw * 0.72, 560)
      const gap = vw < 768 ? 32 : 48
      const spacer = vw * 0.2
      const totalW = journey.length * cardW + (journey.length - 1) * gap + spacer
      setEndX(`${Math.floor(((vw - totalW) / vw) * 100)}vw`)
    }
    compute()
    window.addEventListener("resize", compute)
    return () => window.removeEventListener("resize", compute)
  }, [])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  })

  const x = useTransform(scrollYProgress, [0, 1], ["2vw", endX])
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
          className="absolute top-24 left-4 sm:left-8 md:left-20 right-4 sm:right-8 md:right-20 z-20 flex justify-between items-end"
        >
          <div>
            <p className="text-primary text-xs tracking-[0.4em] uppercase mb-3 font-[family-name:var(--font-geist-mono)]">
              Journey ↦ Horizontal
            </p>
            <h2 className="font-[family-name:var(--font-bebas-neue)] text-[clamp(2rem,6vw,5rem)] leading-[0.9] text-foreground">
              The Path So Far
            </h2>
          </div>
          <div className="hidden md:flex flex-col items-end gap-1 font-[family-name:var(--font-geist-mono)]">
            <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: "rgba(255,255,255,0.5)" }}>
              Scroll ↓ to traverse →
            </span>
            <span className="text-[10px] tracking-widest tabular-nums" style={{ color: "rgba(255,255,255,0.5)" }}>
              {journey.length} CHAPTERS · 2022 – NOW
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

        <div className="absolute bottom-12 left-4 sm:left-8 md:left-20 right-4 sm:right-8 md:right-20 z-20 flex items-center gap-5">
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
          <div className="mb-3">
            <div className="text-[15px] md:text-base font-medium leading-snug">
              <span style={{ color: "#fee801", textShadow: "0 0 8px rgba(254,232,1,0.35)" }}>
                {step.role}
              </span>
              <span className="mx-2" style={{ color: "rgba(255,255,255,0.35)" }}>·</span>
              <span style={{ color: "rgba(255,255,255,0.92)" }}>{step.company}</span>
            </div>
            <div
              className="text-[10px] tracking-[0.22em] uppercase mt-1.5 font-[family-name:var(--font-geist-mono)]"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              {step.period}
            </div>
          </div>
          <h3 className="font-[family-name:var(--font-bebas-neue)] text-4xl md:text-5xl leading-[0.95] text-foreground mb-3">
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
