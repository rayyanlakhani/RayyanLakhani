"use client"
import { useEffect, useRef, useState } from "react"
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion"
import Typewriter from "typewriter-effect"
import Magnetic from "./magnetic"

/* ── Palette ── */
const C_YELLOW = "#fee801"
const C_CYAN   = "#54c1e6"
const C_TEAL   = "#39c4b6"
const C_OLIVE  = "#9a9f17"
const C_BG     = "#00060e"

const roles = [
  "AI developer",
  "UI Designer",
  "Full-Stack Developer",
]

const EASE = [0.76, 0, 0.24, 1] as const

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}
const slideUp = {
  hidden: { y: "110%", opacity: 0 },
  visible: { y: "0%", opacity: 1, transition: { duration: 0.85, ease: EASE } },
}
const fade = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

/* Corner-clipped card: outer bevel (yellow) + inset inner (navy) → crisp 1px beveled border on any size */
const CARD_CLIP_OUTER =
  "polygon(0 0, calc(100% - 22px) 0, 100% 22px, 100% 100%, 22px 100%, 0 calc(100% - 22px))"
const CARD_CLIP_INNER =
  "polygon(0 0, calc(100% - 21px) 0, 100% 21px, 100% 100%, 21px 100%, 0 calc(100% - 21px))"

const CHIP_CLIP =
  "polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)"

/* Headline: clean colour + soft single-pass glow (no chromatic aberration) */
function GlitchHeadline({
  text,
  color,
  glow,
}: {
  text: string
  color: string
  glow: string
  abber?: string
}) {
  return (
    <span className="relative inline-block">
      <span
        className="relative"
        style={{
          color,
          textShadow: `0 0 10px ${glow}`,
        }}
      >
        {text}
      </span>
    </span>
  )
}

export default function Hero({ isReady }: { isReady: boolean }) {
  const [time, setTime] = useState("")
  const [heart, setHeart] = useState(68)
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-22%"])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.45, 0])
  const cardX = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"])
  const hudFade = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  useEffect(() => {
    const tick = () =>
      setTime(new Date().toLocaleTimeString("en-US", { hour12: false }))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const id = setInterval(() => {
      setHeart(62 + Math.floor(Math.random() * 14))
    }, 3200)
    return () => clearInterval(id)
  }, [])

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative h-screen overflow-hidden px-4 sm:px-6 md:px-12 pt-24 pb-10 flex items-center"
    >



      {/* ── TOP HUD LINE ── */}
      <AnimatePresence>
        {isReady && (
          <motion.div
            style={{ opacity: hudFade }}
            className="absolute top-20 left-4 sm:left-6 md:left-12 right-4 sm:right-6 md:right-12 z-20 flex items-center justify-between font-[family-name:var(--font-geist-mono)]"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
          >
            <div className="flex items-center gap-3 text-[10px] tracking-[0.35em]">
              <motion.span
                aria-hidden
                className="inline-block w-[6px] h-[6px] rounded-full"
                style={{ background: C_YELLOW }}
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 2.4, repeat: Infinity }}
              />
              <span style={{ color: C_OLIVE }}>BROADCAST</span>
              <span style={{ color: C_OLIVE, opacity: 0.5 }}>{"//"}</span>
              <span style={{ color: C_YELLOW }}>LIVE</span>
            </div>

            <div className="hidden md:flex items-center gap-3 text-[10px] tracking-[0.35em]">
              <span style={{ color: C_OLIVE }}>SYS</span>
              <span className="tabular-nums" style={{ color: C_CYAN }}>
                {time}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── MAIN CONTENT GRID ── */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate={isReady ? "visible" : "hidden"}
        className="relative z-10 w-full max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center"
      >
        {/* ── LEFT: OPERATOR CARD ── */}
        <motion.div
          variants={fade}
          style={{ x: cardX }}
          className="lg:col-span-5 xl:col-span-4 order-2 lg:order-1"
        >
          <OperatorCard />
        </motion.div>

        {/* ── RIGHT: STATEMENT ── */}
        <motion.div
          style={{ y: titleY, opacity: titleOpacity }}
          className="lg:col-span-7 xl:col-span-8 order-1 lg:order-2"
        >
          {/* Eyebrow */}
          <motion.div variants={slideUp} className="mb-6 overflow-hidden">
            <div className="flex items-center gap-3 font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.4em] uppercase">
              <span
                aria-hidden
                className="inline-block w-[9px] h-[9px]"
                style={{
                  background: C_YELLOW,
                  clipPath: "polygon(50% 0, 100% 50%, 50% 100%, 0 50%)",
                }}
              />
              <span style={{ color: C_TEAL }}>TRANSMISSION // 2026 //</span>
              <span style={{ color: C_YELLOW }}>LIVE</span>
            </div>
          </motion.div>

          {/* Line 1 */}
          <div className="overflow-hidden">
            <motion.h1
              variants={slideUp}
              className="font-[family-name:var(--font-bebas-neue)] leading-[0.86] tracking-[0.01em]"
              style={{ fontSize: "clamp(3.5rem, 11.5vw, 11.5rem)" }}
            >
              <GlitchHeadline
                text="YOUR IDEAS."
                color={C_YELLOW}
                glow="rgba(254,232,1,0.55)"
                abber={C_CYAN}
              />
            </motion.h1>
          </div>

          {/* Line 2 */}
          <div className="overflow-hidden">
            <motion.h1
              variants={slideUp}
              className="font-[family-name:var(--font-bebas-neue)] leading-[0.86] tracking-[0.01em]"
              style={{ fontSize: "clamp(3.5rem, 11.5vw, 11.5rem)" }}
            >
              <GlitchHeadline
                text="BROUGHT TO LIFE."
                color={C_CYAN}
                glow="rgba(84,193,230,0.5)"
                abber={C_YELLOW}
              />
            </motion.h1>
          </div>

          {/* Role typewriter */}
          <motion.div variants={fade} className="flex items-center gap-5 mt-8 h-8">
            <span
              aria-hidden
              className="inline-block w-10 h-px"
              style={{ background: C_YELLOW }}
            />
            <div className="text-foreground/80 text-base tracking-wide font-[family-name:var(--font-geist-mono)] flex items-baseline gap-2">
              <span style={{ color: C_OLIVE }}>{"//"}</span>
              <span className="typewriter-role">
                <Typewriter
                  options={{
                    strings: roles,
                    autoStart: true,
                    loop: true,
                    delay: 55,
                    deleteSpeed: 30,
                    cursor: "▍",
                  }}
                />
              </span>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div variants={fade} className="flex flex-wrap gap-2 sm:gap-3 mt-6 sm:mt-10">
            <Magnetic strength={0.35} scale={1.04}>
              <CTAButton href="#projects" primary>
                VIEW WORK <span className="text-base leading-none">→</span>
              </CTAButton>
            </Magnetic>
            <Magnetic strength={0.35} scale={1.04}>
              <CTAButton href="#contact">
                <span style={{ color: C_OLIVE, marginRight: "0.5rem" }}>&gt;_</span>
                TRANSMIT
              </CTAButton>
            </Magnetic>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ── BOTTOM HUD ── */}
      <AnimatePresence>
        {isReady && (
          <motion.div
            key="coords"
            style={{ opacity: hudFade }}
            className="absolute bottom-8 left-4 sm:left-6 md:left-12 font-[family-name:var(--font-geist-mono)]"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.35, duration: 0.6 }}
          >
            <div className="flex flex-col gap-1 text-[10px] tracking-[0.3em]">
              <span style={{ color: C_OLIVE }}>SECTOR {"//"} ISL-PAK</span>
              <span className="tabular-nums" style={{ color: C_CYAN }}>
                33.6844° N / 73.0479° E
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isReady && (
          <motion.div
            key="biomonitor"
            style={{ opacity: hudFade }}
            className="absolute bottom-8 right-4 sm:right-6 md:right-12 flex items-end gap-5 font-[family-name:var(--font-geist-mono)]"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.45, duration: 0.6 }}
          >
            <Biomonitor />
            <div className="flex flex-col items-end gap-1 text-[10px] tracking-[0.3em]">
              <span style={{ color: C_OLIVE }}>BPM</span>
              <span className="tabular-nums" style={{ color: C_YELLOW }}>
                {String(heart).padStart(3, "0")}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll indicator */}
      {isReady && (
        <motion.div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          style={{ opacity: hudFade }}
        >
          <p
            className="text-[9px] tracking-[0.4em] uppercase font-[family-name:var(--font-geist-mono)]"
            style={{ color: C_OLIVE }}
          >
            Scroll
          </p>
          <div className="relative w-px h-10 overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 w-full h-full"
              style={{
                background: `linear-gradient(to bottom, ${C_YELLOW}, transparent)`,
              }}
              animate={{ y: ["-100%", "100%"] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </motion.div>
      )}
    </section>
  )
}

/* ── Operator card ── */

const ROWS = [
  { key: "NAME", value: 'RAYYAN LAKHANI' },
  { key: "WORK",    value: "DEVELOPER" },
  { key: "LOC",      value: "ISL-PAK · 33.68 N" },
  { key: "AVAIL",    value: "2026 / Q2+" },
]

function OperatorCard() {
  return (
    <div className="relative max-w-md mx-auto lg:mx-0">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          clipPath: CARD_CLIP_OUTER,
          background: C_YELLOW,
          opacity: 0.55,
        }}
      />
      <div
        aria-hidden
        className="absolute"
        style={{
          inset: "1px",
          clipPath: CARD_CLIP_INNER,
          background:
            "linear-gradient(155deg, rgba(0,6,14,0.92) 0%, rgba(11,21,34,0.95) 100%)",
          backdropFilter: "blur(6px)",
        }}
      />

      <span
        aria-hidden
        className="absolute top-[6px] right-[6px] w-[3px] h-[3px] z-10"
        style={{ background: C_YELLOW }}
      />

      <div className="relative p-4 sm:p-6 md:p-7">
        <div
          className="flex items-center justify-between pb-3 mb-4 font-[family-name:var(--font-geist-mono)]"
          style={{ borderBottom: `1px solid rgba(254,232,1,0.18)` }}
        >
          <div className="flex items-center gap-2 text-[9px] tracking-[0.35em]">
            <span
              aria-hidden
              className="inline-block w-[8px] h-[8px]"
              style={{
                background: C_YELLOW,
                clipPath: "polygon(50% 0, 100% 50%, 50% 100%, 0 50%)",
              }}
            />
            <span style={{ color: C_OLIVE }}>OPERATOR // PROFILE</span>
          </div>
          <span
            className="text-[8px] tracking-[0.4em] tabular-nums"
            style={{ color: C_CYAN }}
          >
            ID 0xA4F1
          </span>
        </div>

        <dl className="space-y-[11px] font-[family-name:var(--font-geist-mono)]">
          {ROWS.map((row) => (
            <div key={row.key} className="flex items-baseline gap-4">
              <dt
                className="text-[9px] tracking-[0.3em] uppercase shrink-0 w-20"
                style={{ color: C_OLIVE }}
              >
                {row.key}
              </dt>
              <dd
                className="text-[12px] md:text-[13px] tabular-nums"
                style={{ color: C_CYAN }}
              >
                {row.value}
              </dd>
            </div>
          ))}

          <div
            className="flex items-baseline gap-4 pt-3 mt-1"
            style={{ borderTop: `1px dashed rgba(154,159,23,0.3)` }}
          >
            <dt
              className="text-[9px] tracking-[0.3em] uppercase shrink-0 w-20"
              style={{ color: C_OLIVE }}
            >
              STATUS
            </dt>
            <dd
              className="text-[13px] tracking-[0.2em] flex items-center gap-2"
              style={{ color: C_YELLOW }}
            >
              <motion.span
                aria-hidden
                className="inline-block w-[6px] h-[6px] rounded-full"
                style={{ background: C_YELLOW }}
                animate={{ opacity: [1, 0.55, 1] }}
                transition={{ duration: 2.4, repeat: Infinity }}
              />
             AVAILABLE
            </dd>
          </div>
        </dl>

        <div
          className="mt-5 pt-3 flex items-center justify-between text-[8px] tracking-[0.45em] font-[family-name:var(--font-geist-mono)]"
          style={{ borderTop: `1px solid rgba(254,232,1,0.15)`, color: C_OLIVE }}
        >
          <span>[ SELECT / DEPLOY ]</span>
          <span style={{ color: C_TEAL }}>SECURE</span>
        </div>
      </div>
    </div>
  )
}

/* ── Biomonitor: pulsing vertical bars (heart-rate / adrenaline style) ── */
function Biomonitor() {
  const bars = [
    { color: C_CYAN,   delay: 0.0  },
    { color: C_YELLOW, delay: 0.4  },
    { color: C_TEAL,   delay: 0.2  },
    { color: C_CYAN,   delay: 0.6  },
  ]
  return (
    <div aria-hidden className="flex items-end gap-[3px] h-6">
      {bars.map((b, i) => (
        <motion.span
          key={i}
          className="block w-[3px] h-full"
          style={{
            background: b.color,
            opacity: 0.75,
            transformOrigin: "bottom",
          }}
          animate={{ scaleY: [0.45, 0.85, 0.55] }}
          transition={{
            duration: 3.2,
            delay: b.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

/* ── CTA chip button ── */
function CTAButton({
  href,
  children,
  primary = false,
}: {
  href: string
  children: React.ReactNode
  primary?: boolean
}) {
  return (
    <a
      href={href}
      data-cursor-hover
      className="group relative inline-flex items-center"
      style={{ clipPath: CHIP_CLIP }}
    >
      <span
        aria-hidden
        className="absolute inset-0"
        style={{
          background: primary ? C_YELLOW : "rgba(254,232,1,0.06)",
        }}
      />
      {!primary && (
        <span
          aria-hidden
          className="absolute inset-0 origin-left transition-transform duration-300 ease-out scale-x-0 group-hover:scale-x-100"
          style={{ background: C_YELLOW }}
        />
      )}
      {primary && (
        <span
          aria-hidden
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: "rgba(255,255,255,0.18)",
            mixBlendMode: "screen",
          }}
        />
      )}
      <span
        aria-hidden
        className="absolute"
        style={{
          inset: "1px",
          clipPath:
            "polygon(9px 0, 100% 0, calc(100% - 9px) 100%, 0 100%)",
          boxShadow: `inset 0 0 0 1px rgba(254,232,1,0.5)`,
        }}
      />
      <span
        className={`relative z-10 inline-flex items-center gap-2 px-8 py-3 text-[10px] tracking-[0.3em] uppercase font-[family-name:var(--font-geist-mono)] transition-colors duration-300 ${
          primary ? "" : "group-hover:text-[#00060e]"
        }`}
        style={{
          color: primary ? C_BG : "#e8f4ff",
        }}
      >
        {children}
      </span>
    </a>
  )
}
