"use client"
import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const EASE = [0.76, 0, 0.24, 1] as const

const BOOT_MESSAGES = [
  "> INITIALIZING NEURAL INTERFACE v2.0...",
  "> LOADING CORE MODULES.................. OK",
  "> ESTABLISHING SECURE TUNNEL............ OK",
  "> SCANNING BIOMETRIC SIGNATURE.......... OK",
  "> ALLOCATING MEMORY: 16.8 TB............ OK",
  "> BYPASSING SECURITY PROTOCOLS.......... OK",
  "> LOADING PORTFOLIO DATABASE............ OK",
  "> NEURAL LINK ESTABLISHED",
]

const SEGMENTS = 28

// Glitch the name a few times by rapidly toggling state
function useGlitchTrigger(onRef: React.MutableRefObject<NodeJS.Timeout[]>) {
  const [glitching, setGlitching] = useState(false)
  const start = (delay: number) => {
    const schedule = (offset: number, val: boolean) => {
      const t = setTimeout(() => setGlitching(val), delay + offset)
      onRef.current.push(t)
    }
    schedule(0,   true)
    schedule(90,  false)
    schedule(160, true)
    schedule(240, false)
    schedule(310, true)
    schedule(400, false)
  }
  return { glitching, start }
}

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [show, setShow]             = useState(true)
  const [msgCount, setMsgCount]     = useState(0)
  const [showName, setShowName]     = useState(false)
  const [accessGranted, setAccess]  = useState(false)
  const timers = useRef<NodeJS.Timeout[]>([])
  const { glitching, start: startGlitch } = useGlitchTrigger(timers)

  useEffect(() => {
    const t = (ms: number, fn: () => void) => {
      const id = setTimeout(fn, ms)
      timers.current.push(id)
    }

    // Reveal boot messages one by one
    BOOT_MESSAGES.forEach((_, i) => {
      t(180 + i * 210, () => setMsgCount(i + 1))
    })

    // Show name at ~1.7s
    t(1720, () => setShowName(true))

    // Glitch the name at 1.85s
    t(1850, () => startGlitch(0))

    // Second glitch burst at 2.1s
    t(2100, () => startGlitch(0))

    // Access granted at 2.35s
    t(2350, () => setAccess(true))

    // Exit at 3.1s
    t(3100, () => setShow(false))

    const snapshot = timers.current
    return () => snapshot.forEach(clearTimeout)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const filledSegments = Math.ceil((msgCount / BOOT_MESSAGES.length) * SEGMENTS)
  const pct = Math.round((msgCount / BOOT_MESSAGES.length) * 100)

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {show && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[9998] flex flex-col select-none overflow-hidden font-[family-name:var(--font-geist-mono)]"
          style={{ background: "#03050f" }}
          exit={{
            y: "-100%",
            transition: { duration: 0.85, ease: EASE },
          }}
        >
          {/* ── Subtle grid background ── */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0,229,255,0.04) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,229,255,0.04) 1px, transparent 1px)
              `,
              backgroundSize: "48px 48px",
            }}
          />

          {/* ── Moving scanline ── */}
          <motion.div
            aria-hidden
            className="absolute left-0 right-0 h-[2px] pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(0,229,255,0.7) 50%, transparent 100%)",
            }}
            animate={{ top: ["-2px", "100vh"] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
          />

          {/* ── Corner HUD brackets ── */}
          {(["top-6 left-6 border-t border-l", "top-6 right-6 border-t border-r",
             "bottom-6 left-6 border-b border-l", "bottom-6 right-6 border-b border-r"] as const
          ).map((cls, i) => (
            <motion.div
              key={i}
              aria-hidden
              className={`absolute w-10 h-10 ${cls}`}
              style={{ borderColor: "rgba(0,229,255,0.55)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.08, duration: 0.3 }}
            />
          ))}

          {/* ── Top status bar ── */}
          <div className="absolute top-8 left-16 right-16 flex justify-between items-center">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-[10px] tracking-[0.35em] uppercase"
              style={{ color: "rgba(0,229,255,0.5)" }}
            >
              NEURAL_OS v2.0.77
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="text-[10px] tracking-[0.25em]"
              style={{ color: "rgba(0,229,255,0.35)" }}
            >
              SYS://LAKHANI.NET
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-[10px] tracking-wider tabular-nums"
              style={{ color: "rgba(0,229,255,0.5)" }}
            >
              {new Date().toISOString().replace("T", " ").slice(0, 19)}
            </motion.span>
          </div>

          {/* ── Side decoration lines ── */}
          <motion.div
            aria-hidden
            className="absolute left-6 top-24 bottom-24 w-px"
            style={{ background: "linear-gradient(to bottom, transparent, rgba(0,229,255,0.2), transparent)" }}
            initial={{ scaleY: 0, transformOrigin: "top" }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          />
          <motion.div
            aria-hidden
            className="absolute right-6 top-24 bottom-24 w-px"
            style={{ background: "linear-gradient(to bottom, transparent, rgba(0,229,255,0.2), transparent)" }}
            initial={{ scaleY: 0, transformOrigin: "top" }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />

          {/* ── Center: Name with glitch effect ── */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <AnimatePresence>
              {showName && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.15 }}
                  className="relative"
                >
                  {/* Horizontal accent lines flanking name */}
                  <motion.div
                    className="absolute -left-20 top-1/2 h-px w-16"
                    style={{ background: "rgba(0,229,255,0.4)" }}
                    initial={{ scaleX: 0, transformOrigin: "right" }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.05, duration: 0.3 }}
                  />
                  <motion.div
                    className="absolute -right-20 top-1/2 h-px w-16"
                    style={{ background: "rgba(0,229,255,0.4)" }}
                    initial={{ scaleX: 0, transformOrigin: "left" }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.05, duration: 0.3 }}
                  />

                  {/* Name block */}
                  <div
                    className="font-[family-name:var(--font-bebas-neue)] leading-[0.88] tracking-[0.08em] text-center"
                    style={{ fontSize: "clamp(5rem, 15vw, 11rem)" }}
                  >
                    {/* RAYYAN row */}
                    <div className="relative">
                      <span className="text-white relative z-10"
                            style={glitching ? { textShadow: "0 0 12px rgba(232,244,255,0.8)" } : {}}>
                        RAYYAN
                      </span>
                      {/* Glitch layer — pink, left offset */}
                      {glitching && (
                        <span
                          aria-hidden
                          className="absolute inset-0 text-[#ff00aa] pointer-events-none z-20"
                          style={{ clipPath: "inset(25% 0 45% 0)", transform: "translate(-5px, -1px)" }}
                        >
                          RAYYAN
                        </span>
                      )}
                      {/* Glitch layer — cyan, right offset */}
                      {glitching && (
                        <span
                          aria-hidden
                          className="absolute inset-0 text-[#00e5ff] pointer-events-none z-20"
                          style={{ clipPath: "inset(55% 0 12% 0)", transform: "translate(5px, 1px)" }}
                        >
                          RAYYAN
                        </span>
                      )}
                    </div>

                    {/* LAKHANI row */}
                    <div className="relative">
                      <span
                        className="relative z-10"
                        style={{
                          color: "#00e5ff",
                          textShadow: glitching ? "var(--glow-cyan)" : "0 0 20px rgba(0,229,255,0.3)",
                        }}
                      >
                        LAKHANI
                      </span>
                      {glitching && (
                        <span
                          aria-hidden
                          className="absolute inset-0 text-[#ff00aa] pointer-events-none z-20"
                          style={{ clipPath: "inset(60% 0 18% 0)", transform: "translate(-4px, 1px)" }}
                        >
                          LAKHANI
                        </span>
                      )}
                      {glitching && (
                        <span
                          aria-hidden
                          className="absolute inset-0 text-white pointer-events-none z-20"
                          style={{ clipPath: "inset(15% 0 65% 0)", transform: "translate(4px, -1px)" }}
                        >
                          LAKHANI
                        </span>
                      )}
                    </div>
                  </div>

                  {/* ACCESS GRANTED */}
                  <AnimatePresence>
                    {accessGranted && (
                      <motion.div
                        initial={{ opacity: 0, letterSpacing: "0.1em" }}
                        animate={{ opacity: 1, letterSpacing: "0.55em" }}
                        transition={{ duration: 0.45, ease: "easeOut" }}
                        className="text-center mt-6 text-xs tracking-[0.55em] uppercase"
                        style={{ color: "#00e5ff", textShadow: "var(--glow-cyan)" }}
                      >
                        [[ ACCESS GRANTED ]]
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Boot log messages ── */}
          <div className="absolute left-12 right-12 bottom-28 space-y-[3px] overflow-hidden">
            {BOOT_MESSAGES.slice(0, msgCount).map((msg, i) => {
              const isLast = i === msgCount - 1
              const isFinal = i === BOOT_MESSAGES.length - 1
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: isLast ? 1 : isFinal ? 0.85 : 0.28, x: 0 }}
                  transition={{ duration: 0.15 }}
                  className="text-[11px] tracking-wide"
                  style={{
                    color: isFinal ? "#00e5ff" : "rgba(0,229,255,0.7)",
                    textShadow: isFinal ? "0 0 6px rgba(0,229,255,0.6)" : "none",
                  }}
                >
                  {msg}
                  {isLast && !accessGranted && (
                    <span style={{ animation: "blink 0.7s infinite" }}>_</span>
                  )}
                </motion.div>
              )
            })}
          </div>

          {/* ── Segmented progress bar ── */}
          <div className="absolute left-12 right-12 bottom-10">
            <div
              className="flex justify-between text-[9px] tracking-[0.4em] uppercase mb-[7px]"
              style={{ color: "rgba(0,229,255,0.45)" }}
            >
              <span>LOADING</span>
              <span className="tabular-nums">{String(pct).padStart(3, "0")}%</span>
            </div>
            <div className="flex gap-[3px]" style={{ height: "5px" }}>
              {Array.from({ length: SEGMENTS }).map((_, i) => {
                const filled = i < filledSegments
                const isNearEnd = i >= SEGMENTS * 0.82
                return (
                  <motion.div
                    key={i}
                    className="flex-1 h-full"
                    animate={{
                      backgroundColor: filled
                        ? isNearEnd ? "#ff00aa" : "#00e5ff"
                        : "rgba(0,229,255,0.1)",
                      boxShadow: filled
                        ? isNearEnd
                          ? "0 0 4px rgba(255,0,170,0.8)"
                          : "0 0 4px rgba(0,229,255,0.8)"
                        : "none",
                    }}
                    transition={{ duration: 0.08 }}
                  />
                )
              })}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
