"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function Cursor() {
  const [pos, setPos]         = useState({ x: -200, y: -200 })
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
      if (!visible) setVisible(true)
    }
    const onOver = (e: MouseEvent) => {
      const t = e.target as Element
      setHovered(!!t.closest("a, button, [data-cursor-hover]"))
    }
    const onDown  = () => setClicked(true)
    const onUp    = () => setClicked(false)
    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    window.addEventListener("mousemove", onMove)
    window.addEventListener("mouseover", onOver)
    window.addEventListener("mousedown", onDown)
    window.addEventListener("mouseup", onUp)
    document.documentElement.addEventListener("mouseleave", onLeave)
    document.documentElement.addEventListener("mouseenter", onEnter)

    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseover", onOver)
      window.removeEventListener("mousedown", onDown)
      window.removeEventListener("mouseup", onUp)
      document.documentElement.removeEventListener("mouseleave", onLeave)
      document.documentElement.removeEventListener("mouseenter", onEnter)
    }
  }, [visible])

  // Crosshair arm length and corner bracket sizes
  const arm    = hovered ? 12 : 8
  const corner = hovered ? 10 : 7
  const radius = hovered ? 28 : 20

  // Active color: periwinkle on hover, neon green otherwise
  const color = hovered ? "#ffffff" : "#fee801"
  const glow  = hovered
    ? "0 0 6px rgba(255,255,255,0.8), 0 0 14px rgba(255,255,255,0.3)"
    : "0 0 6px rgba(254,232,1,0.85), 0 0 14px rgba(254,232,1,0.35)"

  return (
    <>
      {/* ── Crosshair center (follows exactly) ── */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        animate={{
          x: pos.x,
          y: pos.y,
          opacity: visible ? 1 : 0,
          scale: clicked ? 0.6 : 1,
        }}
        transition={{ type: "spring", stiffness: 2500, damping: 80, mass: 0.08 }}
        style={{ translateX: "-50%", translateY: "-50%" }}
      >
        {/* Center dot */}
        <div
          className="absolute rounded-full"
          style={{
            width: 4,
            height: 4,
            background: color,
            boxShadow: glow,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
        {/* Top arm */}
        <div className="absolute" style={{
          width: 1, height: arm, background: color, opacity: 0.85,
          top: `calc(50% - ${arm + 3}px)`, left: "50%", transform: "translateX(-50%)",
        }} />
        {/* Bottom arm */}
        <div className="absolute" style={{
          width: 1, height: arm, background: color, opacity: 0.85,
          top: `calc(50% + 3px)`, left: "50%", transform: "translateX(-50%)",
        }} />
        {/* Left arm */}
        <div className="absolute" style={{
          height: 1, width: arm, background: color, opacity: 0.85,
          left: `calc(50% - ${arm + 3}px)`, top: "50%", transform: "translateY(-50%)",
        }} />
        {/* Right arm */}
        <div className="absolute" style={{
          height: 1, width: arm, background: color, opacity: 0.85,
          left: `calc(50% + 3px)`, top: "50%", transform: "translateY(-50%)",
        }} />
      </motion.div>

      {/* ── Corner brackets (lags behind for organic feel) ── */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        animate={{
          x: pos.x,
          y: pos.y,
          opacity: visible ? (clicked ? 0.6 : 1) : 0,
        }}
        transition={{ type: "spring", stiffness: 120, damping: 18, mass: 0.6 }}
        style={{ translateX: "-50%", translateY: "-50%" }}
      >
        {/* Top-left bracket */}
        <div className="absolute" style={{
          width: corner, height: corner,
          borderTop: `1px solid ${color}`, borderLeft: `1px solid ${color}`,
          boxShadow: glow, opacity: 0.9,
          top: -radius, left: -radius,
        }} />
        {/* Top-right bracket */}
        <div className="absolute" style={{
          width: corner, height: corner,
          borderTop: `1px solid ${color}`, borderRight: `1px solid ${color}`,
          boxShadow: glow, opacity: 0.9,
          top: -radius, right: -radius,
        }} />
        {/* Bottom-left bracket */}
        <div className="absolute" style={{
          width: corner, height: corner,
          borderBottom: `1px solid ${color}`, borderLeft: `1px solid ${color}`,
          boxShadow: glow, opacity: 0.9,
          bottom: -radius, left: -radius,
        }} />
        {/* Bottom-right bracket */}
        <div className="absolute" style={{
          width: corner, height: corner,
          borderBottom: `1px solid ${color}`, borderRight: `1px solid ${color}`,
          boxShadow: glow, opacity: 0.9,
          bottom: -radius, right: -radius,
        }} />
      </motion.div>
    </>
  )
}
