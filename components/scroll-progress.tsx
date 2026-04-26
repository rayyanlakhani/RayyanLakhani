"use client"
import { useEffect, useState } from "react"
import { motion, useScroll, useSpring, useTransform } from "framer-motion"

const SECTIONS = [
  { id: "top",        label: "HOME"     },
  { id: "about",      label: "ABOUT"    },
  { id: "skills",     label: "SKILLS"   },
  { id: "experience", label: "JOURNEY"  },
  { id: "projects",   label: "PROJECTS" },
  { id: "contact",    label: "CONTACT"  },
]

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 25, mass: 0.4 })
  const heightPct = useTransform(smooth, [0, 1], ["0%", "100%"])

  const [active, setActive] = useState(0)
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      const p = total > 0 ? window.scrollY / total : 0
      setPct(Math.round(p * 100))

      // Determine active section by element offset
      let idx = 0
      for (let i = 0; i < SECTIONS.length; i++) {
        const el =
          SECTIONS[i].id === "top"
            ? { top: 0 }
            : document.getElementById(SECTIONS[i].id)?.getBoundingClientRect()
        if (!el) continue
        const top = "top" in el ? el.top : 0
        if (top <= window.innerHeight * 0.4) idx = i
      }
      setActive(idx)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div
      aria-hidden
      className="fixed top-1/2 -translate-y-1/2 right-5 md:right-8 z-40 hidden sm:flex flex-col items-end gap-3 select-none pointer-events-none"
    >
      {/* Percentage readout */}
      <div className="flex items-baseline gap-2 font-[family-name:var(--font-geist-mono)]">
        <span className="text-[9px] tracking-[0.3em]" style={{ color: "rgba(255,255,255,0.4)" }}>
          SCROLL
        </span>
        <span
          className="text-[10px] tabular-nums tracking-[0.2em]"
          style={{ color: "#fee801", textShadow: "0 0 6px rgba(254,232,1,0.4)" }}
        >
          {String(pct).padStart(3, "0")}%
        </span>
      </div>

      {/* Vertical rail */}
      <div className="relative w-[1px] h-64" style={{ background: "rgba(255,255,255,0.10)" }}>
        <motion.div
          className="absolute top-0 left-0 w-full"
          style={{
            height: heightPct,
            background: "linear-gradient(to bottom, transparent, #fee801 60%, #ffffff)",
            boxShadow: "0 0 6px rgba(254,232,1,0.6)",
          }}
        />

        {/* Section ticks */}
        {SECTIONS.map((s, i) => {
          const top = `${(i / (SECTIONS.length - 1)) * 100}%`
          const isActive = i === active
          return (
            <div
              key={s.id}
              className="absolute -translate-y-1/2"
              style={{ top, right: 0 }}
            >
              <div
                className="absolute right-0 top-1/2 -translate-y-1/2 transition-all duration-300"
                style={{
                  width: isActive ? 9 : 5,
                  height: isActive ? 9 : 5,
                  background: isActive ? "#fee801" : "rgba(255,255,255,0.5)",
                  boxShadow: isActive ? "0 0 8px rgba(254,232,1,0.85)" : "none",
                  transform: "translate(50%, -50%) rotate(45deg)",
                }}
              />
              <span
                className="absolute right-5 top-1/2 -translate-y-1/2 whitespace-nowrap text-[9px] font-[family-name:var(--font-geist-mono)] tracking-[0.3em] transition-all duration-300"
                style={{
                  color: isActive ? "#fee801" : "rgba(255,255,255,0.5)",
                  opacity: isActive ? 1 : 0.55,
                  textShadow: isActive ? "0 0 6px rgba(254,232,1,0.55)" : "none",
                }}
              >
                {s.label}
              </span>
            </div>
          )
        })}
      </div>

      {/* Status dot — text first, dot at the rail edge */}
      <div className="flex items-center gap-2">
        <span
          className="text-[9px] tracking-[0.3em] font-[family-name:var(--font-geist-mono)]"
          style={{ color: "rgba(255,255,255,0.6)" }}
        >
          LIVE
        </span>
        <motion.div
          className="w-[6px] h-[6px] rounded-full"
          style={{ background: "#fee801", boxShadow: "0 0 6px rgba(254,232,1,0.85)" }}
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        />
      </div>
    </div>
  )
}
