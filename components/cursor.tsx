"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
      if (!visible) setVisible(true)
    }

    const onOver = (e: MouseEvent) => {
      const target = e.target as Element
      setHovered(!!target.closest("a, button, [data-cursor-hover]"))
    }

    const onDown = () => setClicked(true)
    const onUp = () => setClicked(false)
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

  const dotSize = 6
  const ringSize = hovered ? 56 : 36

  return (
    <>
      {/* Dot — sticks precisely to the cursor */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full bg-white mix-blend-difference"
        style={{ width: dotSize, height: dotSize }}
        animate={{
          x: pos.x - dotSize / 2,
          y: pos.y - dotSize / 2,
          scale: clicked ? 0.4 : 1,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 3000, damping: 100, mass: 0.1 }}
      />
      {/* Ring — lags behind for organic feel */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full border-2 border-white mix-blend-difference"
        style={{ width: ringSize, height: ringSize }}
        animate={{
          x: pos.x - ringSize / 2,
          y: pos.y - ringSize / 2,
          opacity: visible ? (clicked ? 0.5 : 1) : 0,
        }}
        transition={{ type: "spring", stiffness: 110, damping: 20, mass: 0.8 }}
      />
    </>
  )
}
