"use client"
import { useRef, ReactNode } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

type Props = {
  children: ReactNode
  /** How far the element drifts toward cursor (0–1). 0.35 default. */
  strength?: number
  /** Scale on hover. 1 disables. */
  scale?: number
  className?: string
}

export default function Magnetic({
  children,
  strength = 0.35,
  scale = 1,
  className,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const s = useMotionValue(1)

  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 })
  const springS = useSpring(s, { stiffness: 220, damping: 18, mass: 0.4 })

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    x.set((e.clientX - cx) * strength)
    y.set((e.clientY - cy) * strength)
  }

  const onEnter = () => s.set(scale)
  const onLeave = () => {
    x.set(0)
    y.set(0)
    s.set(1)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{ x: springX, y: springY, scale: springS, display: "inline-block" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
