"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

const EASE = [0.76, 0, 0.24, 1] as const

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
]

export default function Navbar({ isReady }: { isReady: boolean }) {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [prev, setPrev] = useState(0)

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
      className={`fixed top-0 left-0 right-0 z-50 px-8 md:px-16 py-6 flex items-center justify-between transition-colors duration-500 ${
        scrolled ? "bg-background/80 backdrop-blur-md border-b border-border/30" : ""
      }`}
      initial={{ opacity: 0, y: -20 }}
      animate={isReady ? { opacity: 1, y: hidden ? "-100%" : 0 } : { opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      <a
        href="#"
        className="font-[family-name:var(--font-bebas-neue)] text-2xl text-foreground hover:text-primary transition-colors tracking-widest"
      >
        RL
      </a>

      <nav className="flex items-center gap-10">
        {links.map((link, i) => (
          <motion.a
            key={link.href}
            href={link.href}
            className="relative text-xs text-foreground/50 hover:text-foreground transition-colors tracking-[0.2em] uppercase group"
            initial={{ opacity: 0, y: -10 }}
            animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
            transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
          >
            {link.label}
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
          </motion.a>
        ))}
      </nav>
    </motion.header>
  )
}
