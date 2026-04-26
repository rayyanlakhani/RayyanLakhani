"use client"
import { useEffect, useState } from "react"
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion"
import ThemeToggle from "./theme-toggle"

const EASE = [0.76, 0, 0.24, 1] as const

const C_YELLOW = "#fee801"
const C_CYAN   = "#54c1e6"
const C_TEAL   = "#39c4b6"
const C_OLIVE  = "#9a9f17"
const C_BG     = "#00060e"

const links = [
  { href: "#about",      label: "About"    },
  { href: "#skills",     label: "Skills"   },
  { href: "#experience", label: "Journey"  },
  { href: "#projects",   label: "Projects" },
  { href: "#contact",    label: "Contact"  },
]

/* CP2077 parallelogram chip — top-left & bottom-right slices */
const CHIP_CLIP =
  "polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)"

export default function Navbar({ isReady }: { isReady: boolean }) {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden]     = useState(false)
  const [prev, setPrev]         = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)

  const { scrollYProgress } = useScroll()
  const progressScale = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.4,
  })

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 40)
      setHidden(y > prev && y > 120 && !menuOpen)
      setPrev(y)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [prev, menuOpen])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [menuOpen])

  useEffect(() => {
    if (menuOpen) {
      const prev = document.body.style.overflow
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = prev
      }
    }
  }, [menuOpen])

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ y: -30, opacity: 0 }}
        animate={
          isReady
            ? { y: hidden ? "-110%" : 0, opacity: 1 }
            : { y: -30, opacity: 0 }
        }
        transition={{ duration: 0.55, ease: EASE }}
      >
        {/* Top accent scanline */}
        <div
          aria-hidden
          className="absolute top-0 left-0 right-0 h-[2px] z-20"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${C_YELLOW} 18%, ${C_YELLOW} 82%, transparent 100%)`,
            boxShadow: `0 0 10px rgba(254,232,1,0.55)`,
          }}
        />

        {/* Main bar */}
        <div
          className="relative flex items-center justify-between gap-4 px-4 sm:px-6 md:px-8 py-3 transition-colors duration-500"
          style={{
            background: scrolled ? "rgba(0,6,14,0.82)" : "transparent",
            backdropFilter: scrolled ? "blur(10px) saturate(140%)" : "none",
            WebkitBackdropFilter: scrolled ? "blur(10px) saturate(140%)" : "none",
            borderBottom: scrolled
              ? "1px solid rgba(254,232,1,0.18)"
              : "1px solid transparent",
          }}
        >
          {/* ── LOGO ── */}
          <a
            href="#top"
            data-cursor-hover
            className="group relative inline-flex items-center gap-3 shrink-0"
          >
            {/* Yellow chip badge */}
            <span
              className="relative inline-flex items-center justify-center font-[family-name:var(--font-bebas-neue)] tracking-[0.22em] text-[1.05rem] px-3 sm:px-4 py-1 sm:py-[6px] transition-all duration-300"
              style={{
                clipPath: CHIP_CLIP,
                background: C_YELLOW,
                color: C_BG,
                boxShadow:
                  "0 0 14px rgba(254,232,1,0.35), inset 0 0 12px rgba(0,6,14,0.15)",
              }}
            >
              RL
              <span
                aria-hidden
                className="absolute top-[3px] right-[7px] w-[4px] h-[4px]"
                style={{ background: C_BG }}
              />
            </span>

            <div className="hidden sm:flex flex-col items-start leading-none font-[family-name:var(--font-geist-mono)]">
              <span
                className="text-[9px] tracking-[0.3em] flex items-center gap-1.5"
                style={{ color: C_TEAL }}
              >
                <motion.span
                  aria-hidden
                  className="inline-block w-[5px] h-[5px] rounded-full"
                  style={{ background: C_TEAL, boxShadow: `0 0 6px ${C_TEAL}` }}
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                />
                ONLINE
              </span>
              <span
                className="text-[8px] tracking-[0.3em] mt-[3px]"
                style={{ color: C_OLIVE }}
              >
                v2.077
              </span>
            </div>
          </a>

          {/* ── DESKTOP NAV ── */}
          <nav className="hidden md:flex items-center gap-[6px]">
            {links.map((link, i) => (
              <NavChip
                key={link.href}
                href={link.href}
                label={link.label}
                index={i + 1}
                isReady={isReady}
              />
            ))}
          </nav>

          {/* ── RIGHT HUD — node tree + theme toggle ── */}
          <div className="hidden md:flex items-center gap-3 font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.25em] shrink-0">
            <div className="flex items-center gap-2.5">
              <NodeTreeIndicator />
              <span style={{ color: C_OLIVE }}>NET</span>
              <span style={{ color: C_CYAN }}>3 BRANCHES</span>
            </div>
            <span
              aria-hidden
              className="inline-block h-5 w-px"
              style={{ background: "rgba(232,244,255,0.15)" }}
            />
            <ThemeToggle />
          </div>

          {/* ── MOBILE BURGER ── */}
          <button
            type="button"
            data-cursor-hover
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden relative h-10 w-12 flex items-center justify-center"
            style={{
              clipPath: CHIP_CLIP,
              background: menuOpen ? C_YELLOW : "rgba(0,6,14,0.6)",
              border: "none",
            }}
          >
            <span
              aria-hidden
              className="absolute"
              style={{
                inset: "1px",
                clipPath:
                  "polygon(9px 0, 100% 0, calc(100% - 9px) 100%, 0 100%)",
                background: menuOpen ? C_YELLOW : "rgba(0,6,14,0.72)",
                boxShadow: menuOpen ? "none" : `inset 0 0 0 1px ${C_YELLOW}`,
              }}
            />
            <span
              className="absolute left-1/2 block w-4 h-[1.5px] transition-all duration-300"
              style={{
                background: menuOpen ? C_BG : C_YELLOW,
                top: menuOpen ? "50%" : "calc(50% - 4px)",
                transform: menuOpen
                  ? "translate(-50%, -50%) rotate(45deg)"
                  : "translateX(-50%)",
              }}
            />
            <span
              className="absolute left-1/2 block w-4 h-[1.5px] transition-all duration-300"
              style={{
                background: menuOpen ? C_BG : C_YELLOW,
                top: menuOpen ? "50%" : "calc(50% + 4px)",
                transform: menuOpen
                  ? "translate(-50%, -50%) rotate(-45deg)"
                  : "translateX(-50%)",
              }}
            />
          </button>
        </div>

        {/* ── Scroll progress rail ── */}
        <motion.div
          aria-hidden
          className="absolute left-0 right-0 h-[1.5px] origin-left"
          style={{
            bottom: 0,
            scaleX: progressScale,
            background: `linear-gradient(90deg, ${C_YELLOW}, ${C_TEAL}, ${C_CYAN})`,
            boxShadow: `0 0 8px rgba(254,232,1,0.5)`,
            opacity: scrolled ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
        />
      </motion.header>

      {/* ── MOBILE MENU ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            className="fixed inset-0 z-40 md:hidden flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              background: "rgba(0,6,14,0.96)",
              backdropFilter: "blur(14px)",
            }}
            onClick={() => setMenuOpen(false)}
          >
            {/* Scanlines */}
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "repeating-linear-gradient(0deg, transparent 0, transparent 3px, rgba(84,193,230,0.03) 3px, rgba(84,193,230,0.03) 4px)",
              }}
            />

            {/* Corner brackets */}
            <span
              aria-hidden
              className="absolute top-16 sm:top-20 left-4 sm:left-6 w-6 h-6"
              style={{
                borderTop: `1px solid ${C_TEAL}`,
                borderLeft: `1px solid ${C_TEAL}`,
                boxShadow: `0 0 8px rgba(57,196,182,0.45)`,
              }}
            />
            <span
              aria-hidden
              className="absolute bottom-16 sm:bottom-20 right-4 sm:right-6 w-6 h-6"
              style={{
                borderBottom: `1px solid ${C_TEAL}`,
                borderRight: `1px solid ${C_TEAL}`,
                boxShadow: `0 0 8px rgba(57,196,182,0.45)`,
              }}
            />

            <div
              className="relative px-6 sm:px-8 pt-20 sm:pt-24 flex items-center gap-3 font-[family-name:var(--font-geist-mono)]"
              onClick={(e) => e.stopPropagation()}
            >
              <span
                aria-hidden
                className="inline-block w-2 h-2"
                style={{
                  background: C_YELLOW,
                  clipPath: "polygon(50% 0, 100% 50%, 50% 100%, 0 50%)",
                  boxShadow: `0 0 8px ${C_YELLOW}`,
                }}
              />
              <span
                className="text-[10px] tracking-[0.4em] uppercase"
                style={{ color: C_OLIVE }}
              >
                NAV // SELECT DESTINATION
              </span>
            </div>

            <nav
              className="relative flex flex-col gap-4 flex-1 justify-center px-6 sm:px-8"
              onClick={(e) => e.stopPropagation()}
            >
              {links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.08 + i * 0.055,
                    duration: 0.4,
                    ease: EASE,
                  }}
                  className="group relative flex items-center gap-5 py-2"
                >
                  <span
                    aria-hidden
                    className="inline-block w-3 h-3 shrink-0 transition-transform duration-300 group-hover:scale-125"
                    style={{
                      background: C_YELLOW,
                      clipPath: "polygon(50% 0, 100% 50%, 50% 100%, 0 50%)",
                      boxShadow: `0 0 10px ${C_YELLOW}`,
                    }}
                  />
                  <span
                    className="text-[11px] tracking-[0.35em] font-[family-name:var(--font-geist-mono)]"
                    style={{ color: C_OLIVE }}
                  >
                    [{String(i + 1).padStart(2, "0")}]
                  </span>
                  <span
                    className="font-[family-name:var(--font-bebas-neue)] text-3xl sm:text-4xl md:text-5xl leading-none transition-colors duration-200"
                    style={{ color: "#e8f4ff" }}
                  >
                    {link.label}
                  </span>
                  <span
                    aria-hidden
                    className="ml-auto text-[11px] tracking-[0.3em] font-[family-name:var(--font-geist-mono)]"
                    style={{ color: C_CYAN }}
                  >
                    →
                  </span>
                </motion.a>
              ))}

              <div
                className="mt-10 pt-6 font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.3em] space-y-[6px]"
                style={{
                  borderTop: "1px solid rgba(154,159,23,0.3)",
                  color: "rgba(232,244,255,0.6)",
                }}
              >
                <div>
                  <span style={{ color: C_YELLOW }}>&gt;</span>{" "}
                  SYS://LAKHANI.NET
                </div>
                <div>
                  <span style={{ color: C_YELLOW }}>&gt;</span> STATUS:{" "}
                  <span style={{ color: C_TEAL }}>AVAILABLE</span>
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/** Mini node tree — root (yellow) + 3 branches colored like the loadout categories */
function NodeTreeIndicator() {
  return (
    <svg
      width="34"
      height="22"
      viewBox="0 0 34 22"
      aria-hidden
      style={{ display: "block" }}
    >
      {/* wires */}
      <line x1="17" y1="5" x2="5"  y2="17" stroke={C_YELLOW} strokeWidth="0.6" strokeOpacity="0.55" />
      <line x1="17" y1="5" x2="17" y2="17" stroke={C_CYAN}   strokeWidth="0.6" strokeOpacity="0.55" />
      <line x1="17" y1="5" x2="29" y2="17" stroke={C_TEAL}   strokeWidth="0.6" strokeOpacity="0.55" />

      {/* pulsing root */}
      <motion.circle
        cx="17" cy="5" r="2.4"
        fill={C_YELLOW}
        animate={{ opacity: [1, 0.4, 1] }}
        transition={{ duration: 1.8, repeat: Infinity }}
        style={{ filter: `drop-shadow(0 0 3px ${C_YELLOW})` }}
      />

      {/* branches */}
      <circle cx="5"  cy="17" r="1.9" fill={C_YELLOW} style={{ filter: `drop-shadow(0 0 2px ${C_YELLOW})` }} />
      <circle cx="17" cy="17" r="1.9" fill={C_CYAN}   style={{ filter: `drop-shadow(0 0 2px ${C_CYAN})` }} />
      <circle cx="29" cy="17" r="1.9" fill={C_TEAL}   style={{ filter: `drop-shadow(0 0 2px ${C_TEAL})` }} />
    </svg>
  )
}

function NavChip({
  href,
  label,
  index,
  isReady,
}: {
  href: string
  label: string
  index: number
  isReady: boolean
}) {
  return (
    <motion.a
      href={href}
      data-cursor-hover
      initial={{ opacity: 0, y: -8 }}
      animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
      transition={{ delay: 0.2 + index * 0.05, duration: 0.4 }}
      className="group relative inline-flex items-center h-9"
      style={{ clipPath: CHIP_CLIP }}
    >
      <span
        aria-hidden
        className="absolute inset-0"
        style={{ background: "rgba(254,232,1,0.04)" }}
      />
      <span
        aria-hidden
        className="absolute inset-0 origin-left transition-transform duration-300 ease-out scale-x-0 group-hover:scale-x-100"
        style={{ background: C_YELLOW }}
      />
      <span
        aria-hidden
        className="absolute"
        style={{
          inset: "1px",
          clipPath:
            "polygon(9px 0, 100% 0, calc(100% - 9px) 100%, 0 100%)",
          boxShadow: `inset 0 0 0 1px rgba(254,232,1,0.38)`,
        }}
      />
      <span className="relative z-10 flex items-center gap-2 px-4 text-[10px] uppercase tracking-[0.28em] font-[family-name:var(--font-geist-mono)]">
        <span
          className="transition-colors duration-300 group-hover:text-[#00060e]"
          style={{ color: C_OLIVE }}
        >
          {String(index).padStart(2, "0")}
        </span>
        <span
          className="transition-colors duration-300 group-hover:text-[#00060e]"
          style={{ color: "#e8f4ff" }}
        >
          {label}
        </span>
      </span>
    </motion.a>
  )
}
