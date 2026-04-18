"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

type Theme = "dark" | "light"

/* Clip-corner parallelogram — matches the navbar's nav chips */
const CHIP_CLIP =
  "polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)"

const C_YELLOW = "#fee801"
const C_OLIVE  = "#9a9f17"
const C_BG     = "#00060e"

const L_TERRA  = "#c14d2c"
const L_CREAM  = "#fbf7ee"
const L_INK    = "#1a1612"
const L_MUTED  = "#8a7f6f"

/* Apply a theme to <html> + persist it */
function applyTheme(t: Theme) {
  const html = document.documentElement
  if (t === "dark") html.classList.add("dark")
  else html.classList.remove("dark")
  try {
    localStorage.setItem("theme", t)
  } catch {
    /* ignore */
  }
}

/* Read the current theme from the DOM (which the inline layout script sets
   before hydration based on localStorage, defaulting to dark). */
function currentTheme(): Theme {
  if (typeof document === "undefined") return "dark"
  return document.documentElement.classList.contains("dark") ? "dark" : "light"
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setTheme(currentTheme())
    setMounted(true)
  }, [])

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark"
    setTheme(next)
    applyTheme(next)
  }

  const isDark = theme === "dark"

  /* Colours depend on the ACTIVE theme so the button stays legible either way */
  const accent    = isDark ? C_YELLOW : L_TERRA
  const surfaceBg = isDark ? "rgba(254,232,1,0.04)" : "rgba(193,77,44,0.06)"
  const border    = isDark ? "rgba(254,232,1,0.42)" : "rgba(193,77,44,0.45)"
  const label     = isDark ? "rgba(232,244,255,0.95)" : L_INK
  const numeral   = isDark ? C_OLIVE : L_MUTED
  const hoverTxt  = isDark ? C_BG : L_CREAM

  return (
    <button
      type="button"
      onClick={toggle}
      data-cursor-hover
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="group relative inline-flex items-center h-9"
      style={{ clipPath: CHIP_CLIP, cursor: isDark ? "none" : "pointer" }}
      /* Stable SSR output — only flip state class after mount */
      suppressHydrationWarning
    >
      {/* Base fill */}
      <span
        aria-hidden
        className="absolute inset-0"
        style={{ background: surfaceBg }}
      />
      {/* Hover wipe */}
      <span
        aria-hidden
        className="absolute inset-0 origin-left transition-transform duration-300 ease-out scale-x-0 group-hover:scale-x-100"
        style={{ background: accent }}
      />
      {/* Faux 1px border */}
      <span
        aria-hidden
        className="absolute"
        style={{
          inset: "1px",
          clipPath: "polygon(9px 0, 100% 0, calc(100% - 9px) 100%, 0 100%)",
          boxShadow: `inset 0 0 0 1px ${border}`,
        }}
      />

      <span className="relative z-10 flex items-center gap-2.5 px-4 font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.28em]">
        {/* Rotating split-disc icon */}
        <motion.span
          aria-hidden
          className="relative inline-block"
          style={{ width: 13, height: 13 }}
          animate={mounted ? { rotate: isDark ? 0 : 180 } : { rotate: 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 20 }}
        >
          {/* Ring */}
          <span
            className="absolute inset-0 rounded-full transition-colors duration-300"
            style={{
              border: `1.2px solid ${accent}`,
              background: `linear-gradient(to right, ${accent} 0%, ${accent} 50%, transparent 50%)`,
              boxShadow: `0 0 6px ${accent}55`,
            }}
          />
          {/* Inner dot */}
          <span
            aria-hidden
            className="absolute rounded-full"
            style={{
              inset: "4.5px",
              background: accent,
              opacity: 0.9,
            }}
          />
        </motion.span>

        {/* 2-char mode indicator */}
        <span
          className="tabular-nums transition-colors duration-300 group-hover:text-[var(--h)]"
          style={{
            color: numeral,
            ["--h" as string]: hoverTxt,
          }}
        >
          {isDark ? "01" : "02"}
        </span>

        {/* Mode label */}
        <span
          className="transition-colors duration-300 group-hover:text-[var(--h)]"
          style={{
            color: label,
            ["--h" as string]: hoverTxt,
          }}
        >
          {isDark ? "DARK" : "LIGHT"}
        </span>
      </span>
    </button>
  )
}
