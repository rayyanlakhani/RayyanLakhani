"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

const EASE = [0.76, 0, 0.24, 1] as const

const links = [
  { href: "#about",    label: "About"    },
  { href: "#skills",   label: "Skills"   },
  { href: "#projects", label: "Projects" },
  { href: "#contact",  label: "Contact"  },
]

export default function Navbar({ isReady }: { isReady: boolean }) {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden]     = useState(false)
  const [prev, setPrev]         = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 60)
      setHidden(y > prev && y > 120)
      setPrev(y)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [prev])

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 px-8 md:px-16 py-5 flex items-center justify-between transition-colors duration-500 ${
        scrolled
          ? "backdrop-blur-md border-b"
          : ""
      }`}
      style={scrolled ? {
        background: "rgba(3,7,18,0.85)",
        borderColor: "rgba(0,229,255,0.14)",
        boxShadow: "0 1px 0 rgba(0,229,255,0.06)",
      } : {}}
      initial={{ opacity: 0, y: -20 }}
      animate={isReady ? { opacity: 1, y: hidden ? "-100%" : 0 } : { opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      {/* Logo — bracket style */}
      <a
        href="#"
        className="font-[family-name:var(--font-bebas-neue)] text-2xl tracking-widest flex items-center gap-1 group"
        data-cursor-hover
      >
        <span
          className="text-secondary transition-all duration-300 group-hover:opacity-60"
          style={{ textShadow: "0 0 8px rgba(255,0,170,0.6)" }}
        >
          [
        </span>
        <span className="text-foreground group-hover:text-primary transition-colors duration-300">
          RL
        </span>
        <span
          className="text-secondary transition-all duration-300 group-hover:opacity-60"
          style={{ textShadow: "0 0 8px rgba(255,0,170,0.6)" }}
        >
          ]
        </span>
      </a>

      {/* Nav links */}
      <nav className="flex items-center gap-10">
        {links.map((link, i) => (
          <motion.a
            key={link.href}
            href={link.href}
            data-cursor-hover
            className="relative text-xs text-foreground/45 hover:text-foreground transition-colors tracking-[0.2em] uppercase group font-[family-name:var(--font-geist-mono)]"
            initial={{ opacity: 0, y: -10 }}
            animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
            transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
          >
            <span className="text-secondary/40 group-hover:text-secondary/80 transition-colors duration-300 mr-1">
              {String(i + 1).padStart(2, "0")}.
            </span>
            {link.label}
            {/* Hover underline with glow */}
            <span
              className="absolute -bottom-1 left-0 w-0 h-px group-hover:w-full transition-all duration-300"
              style={{ background: "#00e5ff", boxShadow: "0 0 4px rgba(0,229,255,0.8)" }}
            />
          </motion.a>
        ))}
      </nav>
    </motion.header>
  )
}
