"use client"
import { useEffect, useMemo, useRef, useState } from "react"
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion"

/* ── Palette ── */
const C_BG = "#00060e"
const C_OLIVE = "#9a9f17"
const C_YELLOW = "#fee801"
const C_CYAN = "#54c1e6"
const C_TEAL = "#39c4b6"

const RAIN_CHARS = "!<>-_\\/[]{}—=+*^?#ABCDEF0123456789"
const LINE_1 = "BUILDING WEBSITES"
const LINE_2 = "THAT TELL A STORY."

/** Deterministic PRNG so SSR and CSR produce identical rain content. */
function seededRandom(seed: number) {
  let x = seed >>> 0
  return () => {
    x = (x * 1664525 + 1013904223) >>> 0
    return x / 0x100000000
  }
}

function TypewriterLine({
  text,
  progress,
  start,
  end,
  color,
  glow,
  cursorColor = C_YELLOW,
}: {
  text: string
  progress: MotionValue<number>
  start: number
  end: number
  color: string
  glow: string
  cursorColor?: string
}) {
  const revealedMV = useTransform(progress, (p) => {
    const local = Math.min(1, Math.max(0, (p - start) / (end - start)))
    return Math.floor(local * (text.length + 1))
  })
  const [count, setCount] = useState(0)
  useMotionValueEvent(revealedMV, "change", (v) =>
    setCount(Math.min(text.length, Math.round(v))),
  )

  const complete = count >= text.length
  const visible = text.slice(0, count)

  return (
    <span className="relative inline-block whitespace-pre align-baseline">
      {/* invisible placeholder preserves final layout width so the centered line doesn't jitter */}
      <span style={{ visibility: "hidden" }}>{text}</span>

      <span
        className="absolute top-0 left-0"
        style={{ color, textShadow: glow }}
      >
        {visible}
        {!complete && count > 0 && (
          <span
            aria-hidden
            className="inline-block align-[-0.08em]"
            style={{
              width: "0.52em",
              height: "0.78em",
              marginLeft: "0.04em",
              background: cursorColor,
              boxShadow: `0 0 10px ${cursorColor}`,
              animation: "decode-caret 0.9s steps(2) infinite",
            }}
          />
        )}
      </span>
    </span>
  )
}

/** Falling columns of pre-generated characters.
    Content is static per column; only `transform` animates.
    Paused via CSS class when the section is not intersecting. */
function HexRain({ paused, cols = 14 }: { paused: boolean; cols?: number }) {
  const columns = useMemo(() => {
    const rand = seededRandom(1337)
    return Array.from({ length: cols }, (_, i) => {
      const chars = Array.from({ length: 26 }, () =>
        RAIN_CHARS[Math.floor(rand() * RAIN_CHARS.length)],
      ).join("\n")
      const palette = [C_OLIVE, C_OLIVE, C_YELLOW, C_TEAL, C_CYAN]
      return {
        id: i,
        left: `${(i / cols) * 100}%`,
        duration: 12 + ((i * 1.61) % 10),
        delay: -((i * 0.83) % 9),
        content: chars,
        color: palette[i % palette.length],
        isBright: i % 5 === 2,
      }
    })
  }, [cols])

  return (
    <div
      aria-hidden
      className={`absolute inset-0 overflow-hidden pointer-events-none ${paused ? "rain-paused" : ""}`}
    >
      {columns.map((c) => (
        <div
          key={c.id}
          className="rain-col absolute top-0 bottom-0 flex flex-col items-center whitespace-pre font-[family-name:var(--font-geist-mono)]"
          style={{
            left: c.left,
            width: "1.8em",
            fontSize: "0.72rem",
            lineHeight: 1.55,
            color: c.color,
            opacity: c.isBright ? 0.55 : 0.2,
            /* Glow only on the few bright columns — this was the expensive part */
            textShadow: c.isBright ? `0 0 8px ${c.color}` : undefined,
            animation: `hex-fall ${c.duration}s linear ${c.delay}s infinite`,
            willChange: "transform",
          }}
        >
          <span style={{ whiteSpace: "pre-line" }}>{c.content}</span>
          <span style={{ whiteSpace: "pre-line" }}>{c.content}</span>
        </div>
      ))}
    </div>
  )
}

export default function Decode() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  })
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 22,
    mass: 0.4,
  })

  // Packet counter tied to scroll progress
  const packetsMV = useTransform(progress, (p) =>
    Math.min(100, Math.max(0, Math.floor(p * 100))),
  )
  const [packets, setPackets] = useState(0)
  useMotionValueEvent(packetsMV, "change", setPackets)

  const lockOpacity = useTransform(progress, [0.85, 0.95], [0, 1])
  const statusOpacity = useTransform(progress, [0, 0.05, 0.9, 1], [0, 1, 1, 0.4])

  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)")
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  /* Pause the hex-rain CSS animation while the section is off-screen so we
     don't keep painting animated columns + glyph glows elsewhere. */
  const [rainPaused, setRainPaused] = useState(true)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => setRainPaused(!entry.isIntersecting),
      { rootMargin: "80px", threshold: 0 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section ref={ref} className="relative" style={{ height: "220vh" }}>
      <style jsx global>{`
        @keyframes decode-caret {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0; }
        }
        @keyframes hex-fall {
          from { transform: translateY(-50%); }
          to   { transform: translateY(0%); }
        }
        /* Pause all rain columns when section is off-screen */
        .rain-paused .rain-col { animation-play-state: paused !important; }
      `}</style>

      <div
        className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center items-center"
        style={{ background: C_BG }}
      >
        {/* Hex rain — drifting columns, content static per column */}
        <div className="absolute inset-0" style={{ zIndex: 1 }}>
          <HexRain paused={rainPaused} cols={isMobile ? 7 : 14} />
        </div>

        {/* Radial vignette so the rain fades toward center */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 2,
            background:
              "radial-gradient(ellipse 65% 65% at 50% 50%, rgba(0,6,14,0.85) 15%, transparent 80%)",
          }}
        />

        {/* Scanlines — very subtle cyan */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 3,
            background:
              "repeating-linear-gradient(0deg, transparent 0, transparent 3px, rgba(84,193,230,0.035) 3px, rgba(84,193,230,0.035) 4px)",
          }}
        />

        {/* Corner brackets */}
        {[
          { pos: "top-16 left-4 sm:left-8 md:left-20",     borders: { borderTop: `1px solid ${C_TEAL}`, borderLeft: `1px solid ${C_TEAL}` } },
          { pos: "top-16 right-4 sm:right-8 md:right-20",   borders: { borderTop: `1px solid ${C_TEAL}`, borderRight: `1px solid ${C_TEAL}` } },
          { pos: "bottom-16 left-4 sm:left-8 md:left-20",  borders: { borderBottom: `1px solid ${C_TEAL}`, borderLeft: `1px solid ${C_TEAL}` } },
          { pos: "bottom-16 right-4 sm:right-8 md:right-20",borders: { borderBottom: `1px solid ${C_TEAL}`, borderRight: `1px solid ${C_TEAL}` } },
        ].map((b, i) => (
          <span
            key={i}
            aria-hidden
            className={`absolute ${b.pos} w-6 h-6`}
            style={{
              ...b.borders,
              boxShadow: `0 0 8px ${C_TEAL}55`,
              zIndex: 5,
            }}
          />
        ))}

        {/* Top status */}
        <motion.div
          style={{ opacity: statusOpacity, zIndex: 6 }}
          className="absolute top-20 left-1/2 -translate-x-1/2 flex items-center gap-3 font-[family-name:var(--font-geist-mono)]"
        >
          <motion.span
            className="w-[7px] h-[7px] rounded-full"
            style={{ background: C_CYAN, boxShadow: `0 0 8px ${C_CYAN}` }}
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          />
          <span
            className="text-[10px] tracking-[0.4em] uppercase"
            style={{ color: C_CYAN, textShadow: `0 0 6px ${C_CYAN}55` }}
          >
            ▶ Incoming Signal
          </span>
        </motion.div>

        {/* Main content */}
        <div className="relative z-10 px-4 sm:px-8 md:px-20 w-full max-w-7xl text-center">
          <p
            className="text-[10px] tracking-[0.5em] uppercase mb-8 font-[family-name:var(--font-geist-mono)]"
            style={{ color: C_OLIVE }}
          >
            Channel {"//"} 0xA4.F1 {"//"} Secure
          </p>

          <h2
            className="font-[family-name:var(--font-bebas-neue)] leading-[0.95]"
            style={{
              fontSize: "clamp(2.25rem, 7vw, 6rem)",
              letterSpacing: "0.02em",
            }}
          >
            <span className="block">
              <TypewriterLine
                text={LINE_1}
                progress={progress}
                start={0.08}
                end={0.5}
                color={C_YELLOW}
                glow={`0 0 20px ${C_YELLOW}55, 0 0 36px ${C_YELLOW}20`}
              />
            </span>
            <span className="block mt-2 md:mt-4">
              <TypewriterLine
                text={LINE_2}
                progress={progress}
                start={0.48}
                end={0.88}
                color={C_CYAN}
                glow={`0 0 20px ${C_CYAN}55, 0 0 32px ${C_CYAN}20`}
                cursorColor={C_CYAN}
              />
            </span>
          </h2>

          {/* Accent rule */}
          <div className="mt-12 flex items-center justify-center gap-4">
            <div
              className="h-px w-16 sm:w-20 md:w-28"
              style={{
                background: `linear-gradient(90deg, transparent, ${C_OLIVE})`,
              }}
            />
            <span
              className="text-[9px] tracking-[0.4em] font-[family-name:var(--font-geist-mono)]"
              style={{ color: C_OLIVE }}
            >
              RAYYAN.LAKHANI
            </span>
            <div
              className="h-px w-16 sm:w-20 md:w-28"
              style={{
                background: `linear-gradient(90deg, ${C_OLIVE}, transparent)`,
              }}
            />
          </div>
        </div>

        {/* Bottom-left: packet counter */}
        <div
          className="absolute bottom-20 left-4 sm:left-8 md:left-20 font-[family-name:var(--font-geist-mono)] flex flex-col gap-1"
          style={{ zIndex: 6 }}
        >
          <span
            className="text-[9px] tracking-[0.4em] uppercase"
            style={{ color: C_OLIVE }}
          >
            Packets Received
          </span>
          <span
            className="text-[11px] tracking-widest tabular-nums"
            style={{ color: C_YELLOW, textShadow: `0 0 6px ${C_YELLOW}60` }}
          >
            {String(packets).padStart(3, "0")} / 100
          </span>
        </div>

        {/* Bottom-right: lock indicator */}
        <motion.div
          style={{ opacity: lockOpacity, zIndex: 6 }}
          className="absolute bottom-20 right-4 sm:right-8 md:right-20 font-[family-name:var(--font-geist-mono)] flex flex-col items-end gap-1"
        >
          <span
            className="text-[9px] tracking-[0.4em] uppercase"
            style={{ color: C_OLIVE }}
          >
            Status
          </span>
          <span
            className="text-[11px] tracking-[0.3em] uppercase flex items-center gap-2"
            style={{ color: C_TEAL, textShadow: `0 0 6px ${C_TEAL}55` }}
          >
            <span
              className="inline-block w-[6px] h-[6px] rotate-45"
              style={{ background: C_TEAL, boxShadow: `0 0 8px ${C_TEAL}` }}
            />
            Signal Locked
          </span>
        </motion.div>
      </div>
    </section>
  )
}
