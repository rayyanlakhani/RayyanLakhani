"use client"
import { useEffect, useState } from "react"
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion"

const EASE = [0.76, 0, 0.24, 1] as const

const C_YELLOW = "#fee801"
const C_CYAN   = "#54c1e6"
const C_TEAL   = "#39c4b6"
const C_OLIVE  = "#9a9f17"
const C_BG     = "#00060e"

type Cat = "FE" | "BE" | "OT"

type Tool = {
  id: string
  short: string
  name: string
  since: string
  use: string
  cat: Cat
}

type Category = {
  id: Cat
  name: string
  color: string
  tools: Tool[]
}

const categories: Category[] = [
  {
    id: "FE",
    name: "Frontend",
    color: C_YELLOW,
    tools: [
      { id: "rct",  short: "RCT",  name: "React / Next.js", since: "2022", cat: "FE", use: "UI + SSR/SSG — the surface people actually touch." },
      { id: "ts",   short: "TS",   name: "TypeScript",      since: "2023", cat: "FE", use: "Keeps refactors from becoming archaeology." },
      { id: "tw",   short: "TW",   name: "Tailwind CSS",    since: "2022", cat: "FE", use: "Atomic utility — speed without sloppiness." },
      { id: "fm",   short: "FM",   name: "Framer Motion",   since: "2024", cat: "FE", use: "Choreography. Motion that earns its weight." },
      { id: "html", short: "HTML", name: "HTML & CSS",      since: "2020", cat: "FE", use: "The substrate — still hand-written where it counts." },
    ],
  },
  {
    id: "BE",
    name: "Backend",
    color: C_CYAN,
    tools: [
      { id: "node", short: "NODE", name: "Node.js",    since: "2022", cat: "BE", use: "JavaScript all the way down — APIs, scripts, tooling." },
      { id: "py",   short: "PY",   name: "Python",     since: "2020", cat: "BE", use: "Prototyping and small sharp scripts." },
      { id: "pg",   short: "PG",   name: "PostgreSQL", since: "2022", cat: "BE", use: "The database I trust when it matters." },
      { id: "rest", short: "REST", name: "REST APIs",  since: "2022", cat: "BE", use: "Lingua franca — designed for humans first." },
      { id: "gql",  short: "GQL",  name: "GraphQL",    since: "2024", cat: "BE", use: "When the frontend's appetite outgrows REST." },
    ],
  },
  {
    id: "OT",
    name: "Tooling",
    color: C_TEAL,
    tools: [
      { id: "git", short: "GIT", name: "Git / GitHub", since: "2020", cat: "OT", use: "Version control, PRs, the shared brain." },
      { id: "dkr", short: "DKR", name: "Docker",       since: "2023", cat: "OT", use: "Pin the dev env before it pins me." },
      { id: "fig", short: "FIG", name: "Figma",        since: "2021", cat: "OT", use: "Designs that survive the jump to code." },
      { id: "lnx", short: "LNX", name: "Linux",        since: "2020", cat: "OT", use: "The environment I move through by default." },
      { id: "ci",  short: "CI",  name: "CI / CD",      since: "2023", cat: "OT", use: "Green means go — nothing ships without passing." },
    ],
  },
]

const catLabel: Record<Cat, string> = {
  FE: "FRONTEND",
  BE: "BACKEND",
  OT: "TOOLING",
}

/* ── Clip tokens ── */
const CARD_OUTER =
  "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))"
const CARD_INNER =
  "polygon(0 0, calc(100% - 19px) 0, 100% 19px, 100% 100%, 19px 100%, 0 calc(100% - 19px))"
const CELL_OUTER =
  "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))"
const CELL_INNER =
  "polygon(0 0, calc(100% - 13px) 0, 100% 13px, 100% 100%, 13px 100%, 0 calc(100% - 13px))"
const CHIP_CLIP =
  "polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)"

/* ────────────────────────────────────── */
/*  Nodes                                 */
/* ────────────────────────────────────── */

function RootNode() {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <div className="relative" style={{ width: 220, height: 110 }}>
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            clipPath: CARD_OUTER,
            background: C_YELLOW,
            boxShadow:
              "0 0 30px rgba(254,232,1,0.22), 0 0 60px rgba(254,232,1,0.08)",
          }}
        />
        <div
          aria-hidden
          className="absolute"
          style={{
            inset: "1px",
            clipPath: CARD_INNER,
            background:
              "linear-gradient(135deg, rgba(0,6,14,0.94), rgba(11,21,34,0.97))",
          }}
        />

        <span
          aria-hidden
          className="absolute top-[6px] right-[6px] w-[3px] h-[3px] z-10"
          style={{ background: C_YELLOW, boxShadow: `0 0 6px ${C_YELLOW}` }}
        />

        <div className="relative h-full flex flex-col items-center justify-center px-4">
          <div
            className="flex items-center gap-2 font-[family-name:var(--font-geist-mono)] text-[9px] tracking-[0.4em] mb-1"
            style={{ color: C_OLIVE }}
          >
            <motion.span
              aria-hidden
              className="inline-block w-[7px] h-[7px]"
              style={{
                background: C_YELLOW,
                clipPath: "polygon(50% 0, 100% 50%, 50% 100%, 0 50%)",
                boxShadow: `0 0 6px ${C_YELLOW}`,
              }}
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
            ROOT / 0x00
          </div>

          <h3
            className="font-[family-name:var(--font-bebas-neue)] tracking-[0.08em] leading-none"
            style={{
              fontSize: "2.5rem",
              color: C_YELLOW,
              textShadow: `0 0 18px rgba(254,232,1,0.45)`,
            }}
          >
            LOADOUT
          </h3>

          <div
            className="mt-1 text-[8.5px] tracking-[0.4em] font-[family-name:var(--font-geist-mono)]"
            style={{ color: C_CYAN }}
          >
            3 · 15 MODULES
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function CategoryNode({ cat, index }: { cat: Category; index: number }) {
  return (
    <motion.div
      className="relative w-full max-w-[260px]"
      initial={{ opacity: 0, y: 22, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.65, delay: index * 0.08, ease: EASE }}
    >
      <div className="relative" style={{ height: 110 }}>
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            clipPath: CARD_OUTER,
            background: cat.color,
            boxShadow: `0 0 32px ${cat.color}35`,
          }}
        />
        <div
          aria-hidden
          className="absolute"
          style={{
            inset: "1px",
            clipPath: CARD_INNER,
            background:
              "linear-gradient(135deg, rgba(0,6,14,0.94), rgba(11,21,34,0.97))",
          }}
        />

        <span
          aria-hidden
          className="absolute top-[6px] right-[6px] w-[3px] h-[3px] z-10"
          style={{ background: cat.color, boxShadow: `0 0 6px ${cat.color}` }}
        />

        <div className="relative h-full flex flex-col items-center justify-center p-3">
          <div
            className="text-[9px] tracking-[0.4em] font-[family-name:var(--font-geist-mono)] mb-1"
            style={{ color: C_OLIVE }}
          >
            [{cat.id}] BRANCH
          </div>
          <h3
            className="font-[family-name:var(--font-bebas-neue)] text-[2rem] tracking-[0.08em] leading-none"
            style={{
              color: cat.color,
              textShadow: `0 0 16px ${cat.color}55`,
            }}
          >
            {cat.name.toUpperCase()}
          </h3>
          <div
            className="mt-1.5 text-[8.5px] tracking-[0.35em] font-[family-name:var(--font-geist-mono)]"
            style={{ color: "rgba(232,244,255,0.6)" }}
          >
            {cat.tools.length} MODULES
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function SkillCard({
  tool,
  color,
  onHover,
}: {
  tool: Tool
  color: string
  onHover: (tool: Tool | null, color: string, e?: React.MouseEvent) => void
}) {
  return (
    <motion.div
      className="relative w-full"
      initial={{ opacity: 0, y: 18, x: -8 }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      <div
        onMouseEnter={(e) => onHover(tool, color, e)}
        onMouseLeave={() => onHover(null, color)}
        data-cursor-hover
        className="relative group"
      >
        <div
          aria-hidden
          className="absolute inset-0 transition-opacity duration-200"
          style={{
            clipPath: CELL_OUTER,
            background: color,
            opacity: 0.65,
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-250"
          style={{
            clipPath: CELL_OUTER,
            background: color,
            boxShadow: `0 0 22px ${color}55, 0 0 40px ${color}22`,
          }}
        />
        <div
          aria-hidden
          className="absolute transition-all duration-200"
          style={{
            inset: "1px",
            clipPath: CELL_INNER,
            background:
              "linear-gradient(135deg, rgba(0,6,14,0.88), rgba(11,21,34,0.93))",
          }}
        />

        <div className="relative p-3.5 flex items-center gap-3 font-[family-name:var(--font-geist-mono)]">
          <span
            className="inline-flex items-center justify-center text-[10px] font-bold shrink-0"
            style={{
              clipPath: CHIP_CLIP,
              background: color,
              color: C_BG,
              padding: "4px 10px",
              letterSpacing: "0.08em",
              boxShadow: `0 0 6px ${color}55`,
            }}
          >
            {tool.short}
          </span>

          <span
            className="flex-1 text-[11px] sm:text-[12px] md:text-[13px] tracking-[0.08em] truncate transition-colors duration-200 group-hover:text-[var(--hover)]"
            style={{
              color: "#e8f4ff",
              ["--hover" as string]: color,
            }}
          >
            {tool.name}
          </span>

          <span
            className="text-[9px] tracking-[0.3em] shrink-0"
            style={{ color: C_OLIVE }}
          >
            {tool.since}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

function VertLine({
  color,
  height,
  delay = 0,
  dim = false,
  className,
}: {
  color: string
  height: number
  delay?: number
  dim?: boolean
  className?: string
}) {
  return (
    <div
      aria-hidden
      className={`shrink-0 ${className ?? ""}`}
      style={{ height, width: 1 }}
    >
      <motion.div
        className="h-full w-px"
        style={{
          background: dim
            ? `linear-gradient(to bottom, ${color}88, ${color}33)`
            : color,
          boxShadow: dim ? undefined : `0 0 6px ${color}60`,
          transformOrigin: "top",
        }}
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, delay, ease: EASE }}
      />
    </div>
  )
}

/* ────────────────────────────────────── */
/*  Cursor-following Module Profile Card  */
/* ────────────────────────────────────── */

function ModuleProfileCard({ tool, color }: { tool: Tool; color: string }) {
  return (
    <div className="relative" style={{ width: 280 }}>
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          clipPath: CARD_OUTER,
          background: color,
          boxShadow: `0 0 34px ${color}44, 0 0 80px ${color}22, 0 20px 40px rgba(0,0,0,0.55)`,
        }}
      />
      <div
        aria-hidden
        className="absolute"
        style={{
          inset: "1px",
          clipPath: CARD_INNER,
          background:
            "linear-gradient(145deg, rgba(0,6,14,0.96), rgba(11,21,34,0.97))",
          backdropFilter: "blur(6px)",
        }}
      />
      <span
        aria-hidden
        className="absolute top-[6px] right-[6px] w-[3px] h-[3px] z-10"
        style={{ background: color, boxShadow: `0 0 6px ${color}` }}
      />

      <div className="relative p-4 font-[family-name:var(--font-geist-mono)]">
        {/* Header */}
        <div
          className="flex items-center justify-between pb-2 mb-3"
          style={{ borderBottom: `1px solid ${color}33` }}
        >
          <div className="flex items-center gap-2 text-[9px] tracking-[0.35em]">
            <span
              aria-hidden
              className="inline-block w-[8px] h-[8px]"
              style={{
                background: color,
                clipPath: "polygon(50% 0, 100% 50%, 50% 100%, 0 50%)",
                boxShadow: `0 0 6px ${color}`,
              }}
            />
            <span style={{ color: C_OLIVE }}>MODULE // PROFILE</span>
          </div>
          <span className="text-[8px] tracking-[0.35em]" style={{ color: C_CYAN }}>
            ID 0x{tool.id.toUpperCase().padEnd(3, "0").slice(0, 3)}
          </span>
        </div>

        {/* Rows */}
        <dl className="space-y-[9px]">
          <Row label="MODULE" value={tool.name} color={color} />
          <Row label="BRANCH" value={catLabel[tool.cat]} color={color} />
          <Row label="SINCE"  value={tool.since}          color={color} />
        </dl>

        {/* Use blurb */}
        <div
          className="mt-3 pt-3 text-[10.5px] leading-relaxed tracking-wide"
          style={{
            borderTop: `1px dashed ${C_OLIVE}44`,
            color: "rgba(232,244,255,0.82)",
          }}
        >
          {tool.use}
        </div>

        {/* Footer */}
        <div
          className="mt-3 pt-2 flex items-center justify-between text-[8px] tracking-[0.45em]"
          style={{ borderTop: `1px solid ${color}22`, color: C_OLIVE }}
        >
          <span className="flex items-center gap-1.5">
            <motion.span
              aria-hidden
              className="inline-block w-[6px] h-[6px] rounded-full"
              style={{ background: color, boxShadow: `0 0 6px ${color}` }}
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            />
            <span style={{ color }}>INSTALLED</span>
          </span>
          <span>[ INSPECT ]</span>
        </div>
      </div>
    </div>
  )
}

function Row({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="flex items-baseline gap-3">
      <dt
        className="text-[9px] tracking-[0.3em] uppercase shrink-0 w-[58px]"
        style={{ color: C_OLIVE }}
      >
        {label}
      </dt>
      <dd
        className="text-[11px] tabular-nums flex-1 min-w-0 truncate"
        style={{
          color,
          textShadow: `0 0 6px ${color}33`,
        }}
      >
        {value}
      </dd>
    </div>
  )
}

/* ────────────────────────────────────── */
/*  Section                               */
/* ────────────────────────────────────── */

export default function Skills() {
  const [hovered, setHovered] = useState<{ tool: Tool; color: string } | null>(null)

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 500, damping: 40, mass: 0.35 })
  const sy = useSpring(my, { stiffness: 500, damping: 40, mass: 0.35 })

  useEffect(() => {
    if (!hovered) return
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX)
      my.set(e.clientY)
    }
    window.addEventListener("mousemove", onMove)
    return () => window.removeEventListener("mousemove", onMove)
  }, [hovered, mx, my])

  const handleHover = (
    tool: Tool | null,
    color: string,
    e?: React.MouseEvent,
  ) => {
    if (tool && e) {
      mx.set(e.clientX)
      my.set(e.clientY)
      setHovered({ tool, color })
    } else {
      setHovered(null)
    }
  }

  return (
    <section
      id="skills"
      className="relative px-4 sm:px-6 md:px-12 py-28 overflow-hidden"
    >
      {/* Background fade */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 90% 80% at 50% 45%, transparent 35%, #00060e 95%)",
        }}
      />

      {/* Corner brackets */}
      <span
        aria-hidden
        className="absolute top-14 left-4 sm:left-6 md:left-12 w-7 h-7"
        style={{
          borderTop: `1px solid ${C_TEAL}`,
          borderLeft: `1px solid ${C_TEAL}`,
          boxShadow: `0 0 8px rgba(57,196,182,0.4)`,
        }}
      />
      <span
        aria-hidden
        className="absolute bottom-14 right-4 sm:right-6 md:right-12 w-7 h-7"
        style={{
          borderBottom: `1px solid ${C_TEAL}`,
          borderRight: `1px solid ${C_TEAL}`,
          boxShadow: `0 0 8px rgba(57,196,182,0.4)`,
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="mb-10 md:mb-14"
        >
          <div className="flex items-center gap-3 mb-4 font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.4em] uppercase">
            <span
              aria-hidden
              className="inline-block w-[9px] h-[9px]"
              style={{
                background: C_YELLOW,
                clipPath: "polygon(50% 0, 100% 50%, 50% 100%, 0 50%)",
                boxShadow: `0 0 10px ${C_YELLOW}`,
              }}
            />
            <span style={{ color: C_TEAL }}>MODULES // SCROLL TO DEPLOY</span>
          </div>

          <h2
            className="font-[family-name:var(--font-bebas-neue)] leading-[0.9] text-foreground"
            style={{ fontSize: "clamp(2.5rem, 9vw, 7rem)" }}
          >
            Live{" "}
            <span
              style={{
                color: C_YELLOW,
                textShadow: "0 0 22px rgba(254,232,1,0.35)",
              }}
            >
              Loadout.
            </span>
          </h2>

          <p
            className="mt-4 max-w-md font-[family-name:var(--font-geist-mono)] text-[11px] leading-relaxed tracking-wide"
            style={{ color: "rgba(232,244,255,0.7)" }}
          >
            Tools I currently reach for.{" "}
            <span style={{ color: C_OLIVE }}>
              Hover a module to open its profile.
            </span>
          </p>
        </motion.div>

        {/* ── TREE ── */}
        <div className="relative flex flex-col items-center mt-6">
          {/* Root */}
          <RootNode />

          {/* Root → bus */}
          <VertLine color={C_YELLOW} height={90} delay={0.35} />

          {/* Categories + skills. gap-0 so bus endpoints land on column centers. */}
          <div className="relative w-full">
            <motion.div
              aria-hidden
              className="hidden md:block absolute top-0 h-px"
              style={{
                left: "16.67%",
                right: "16.67%",
                background: `linear-gradient(90deg, ${C_YELLOW}, ${C_CYAN}, ${C_TEAL})`,
                boxShadow: `0 0 8px rgba(254,232,1,0.4)`,
                transformOrigin: "center",
              }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.75, ease: EASE }}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-0">
              {categories.map((cat, ci) => (
                <div
                  key={cat.id}
                  className="flex flex-col items-center md:px-5 lg:px-8"
                >
                  <VertLine
                    color={cat.color}
                    height={56}
                    delay={0.25 + ci * 0.1}
                  />
                  <CategoryNode cat={cat} index={ci} />
                  <VertLine
                    color={cat.color}
                    height={48}
                    delay={0.1}
                    dim
                  />
                  <div className="flex flex-col gap-3 w-full max-w-[320px] pt-2">
                    {cat.tools.map((tool) => (
                      <SkillCard
                        key={tool.id}
                        tool={tool}
                        color={cat.color}
                        onHover={handleHover}
                      />
                    ))}
                  </div>
                  {ci < categories.length - 1 && (
                    <VertLine
                      color={categories[ci + 1].color}
                      height={40}
                      className="md:hidden"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative "03" */}
      <div
        aria-hidden
        className="absolute right-0 bottom-16 font-[family-name:var(--font-bebas-neue)] text-[22vw] leading-none select-none pointer-events-none"
        style={{ color: "rgba(154,159,23,0.045)" }}
      >
        03
      </div>

      {/* ── Cursor-following module profile ── */}
      <motion.div
        className="fixed pointer-events-none top-0 left-0 z-[60]"
        style={{ x: sx, y: sy }}
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              key={hovered.tool.id}
              initial={{ opacity: 0, y: -4, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.96 }}
              transition={{ duration: 0.18, ease: EASE }}
              style={{
                transform: "translate(-50%, calc(-100% - 26px))",
              }}
            >
              <ModuleProfileCard tool={hovered.tool} color={hovered.color} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
