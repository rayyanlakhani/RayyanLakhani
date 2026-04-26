"use client"
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useMotionValue,
  useAnimationFrame,
} from "framer-motion"

type Props = {
  items?: string[]
  /** Base px per second the strip drifts when idle. */
  baseVelocity?: number
  /** Visual treatment. "showcase" = bold display text, "ticker" = dense data-feed. */
  variant?: "showcase" | "ticker"
}

const DEFAULTS = [
  "WEB DESIGNER",
  "FULL-STACK ENGINEER",
  "WEB DEVELOPER",
]

function wrap(min: number, max: number, v: number) {
  const range = max - min
  return ((((v - min) % range) + range) % range) + min
}

export default function Marquee({
  items = DEFAULTS,
  baseVelocity = -2,
  variant = "showcase",
}: Props) {
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  })
  // Clamped magnitude only — never flips marquee direction with scroll sign,
  // so rapid up/down scrolling can't whip the strip back and forth.
  const velocityFactor = useTransform(
    smoothVelocity,
    [-1500, 0, 1500],
    [2.5, 0, 2.5],
    { clamp: true },
  )

  const x = useTransform(baseX, (v) => `${wrap(-25, -75, v)}%`)
  const direction = baseVelocity < 0 ? -1 : 1

  useAnimationFrame((_, delta) => {
    // Cap delta — tab-switch / long frames can otherwise produce a giant jump.
    const dt = Math.min(delta, 50) / 1000
    const v = velocityFactor.get()
    const moveBy = direction * Math.abs(baseVelocity) * dt * (1 + v)
    baseX.set(baseX.get() + moveBy)
  })

  const loop = [...items, ...items, ...items, ...items]

  if (variant === "ticker") {
    return (
      <section
        aria-hidden
        className="relative select-none overflow-hidden"
        style={{
          background: "#000000",
          borderTop: "1px solid rgba(254,232,1,0.45)",
          borderBottom: "1px solid rgba(254,232,1,0.45)",
          boxShadow:
            "0 0 22px rgba(254,232,1,0.18), inset 0 0 40px rgba(254,232,1,0.06)",
        }}
      >
        {/* Left status badge pinned to the edge */}
        <div
          className="absolute left-0 top-0 bottom-0 z-20 flex items-center gap-2 px-2 sm:px-3 md:px-5 font-[family-name:var(--font-geist-mono)]"
          style={{
            background: "#00060e",
            borderRight: "1px solid rgba(254,232,1,0.45)",
            boxShadow: "inset -10px 0 16px -10px rgba(0,0,0,0.9)",
          }}
        >
          <motion.span
            className="w-[7px] h-[7px] rounded-full"
            style={{ background: "#fee801", boxShadow: "0 0 8px #fee801" }}
            animate={{ opacity: [1, 0.25, 1] }}
            transition={{ duration: 1.1, repeat: Infinity }}
          />
          <span
            className="text-[9px] tracking-[0.3em]"
            style={{ color: "#fee801", textShadow: "0 0 6px rgba(254,232,1,0.6)" }}
          >
            REC<span className="hidden sm:inline"> · LIVE FEED</span>
          </span>
        </div>

        {/* Right edge fade gradient */}
        <div
          aria-hidden
          className="absolute right-0 top-0 bottom-0 z-20 w-16 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent, #000000 80%)",
          }}
        />

        {/* Scrolling strip */}
        <div className="py-3.5 pl-[64px] sm:pl-[120px] md:pl-[170px]">
          <motion.div
            style={{ x }}
            className="flex whitespace-nowrap items-center font-[family-name:var(--font-geist-mono)] tracking-[0.2em]"
          >
            {loop.map((item, i) => {
              const hex = (0xa0 + (i % 64)).toString(16).toUpperCase().padStart(2, "0")
              return (
                <span
                  key={i}
                  className="flex items-center gap-4 pr-8 text-[clamp(0.82rem,1.25vw,1.05rem)]"
                >
                  <span
                    className="text-[9px] px-[6px] py-[2px]"
                    style={{
                      color: "rgba(254,232,1,0.85)",
                      border: "1px solid rgba(254,232,1,0.35)",
                    }}
                  >
                    0x{hex}
                  </span>
                  <span
                    style={{
                      color: "rgba(254,232,1,0.95)",
                      textShadow: "0 0 6px rgba(254,232,1,0.45)",
                    }}
                  >
                    {item}
                  </span>
                  <span style={{ color: "rgba(255,255,255,0.25)" }}>{"//"}</span>
                </span>
              )
            })}
          </motion.div>
        </div>

        {/* Scanline overlay */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background:
              "repeating-linear-gradient(0deg, transparent 0, transparent 2px, rgba(254,232,1,0.05) 2px, rgba(254,232,1,0.05) 3px)",
            mixBlendMode: "overlay",
          }}
        />
      </section>
    )
  }

  // ── Default: showcase variant ──
  return (
    <section
      aria-hidden
      className="relative py-10 overflow-hidden select-none"
      style={{
        borderTop: "1px solid rgba(255,255,255,0.10)",
        borderBottom: "1px solid rgba(255,255,255,0.10)",
        background:
          "linear-gradient(180deg, rgba(254,232,1,0.04) 0%, transparent 50%, rgba(254,232,1,0.04) 100%)",
      }}
    >
      <motion.div
        style={{ x }}
        className="flex whitespace-nowrap font-[family-name:var(--font-bebas-neue)] tracking-[0.06em]"
      >
        {loop.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-10 pr-10 text-[clamp(2.5rem,7vw,6rem)] leading-none"
            style={{
              color: i % 2 === 0 ? "rgba(228,228,231,0.85)" : "transparent",
              WebkitTextStroke:
                i % 2 === 1 ? "1px rgba(254,232,1,0.7)" : undefined,
            }}
          >
            {item}
            <span
              className="text-primary text-[clamp(1.5rem,3.5vw,3rem)]"
              style={{ textShadow: "0 0 10px rgba(254,232,1,0.55)" }}
            >
              ✺
            </span>
          </span>
        ))}
      </motion.div>
    </section>
  )
}
