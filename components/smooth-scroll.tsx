"use client"
import { useEffect, ReactNode } from "react"
import Lenis from "lenis"

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Honour reduced-motion: skip Lenis so scroll stays native + instant
    if (typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })

    let rafId: number

    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
