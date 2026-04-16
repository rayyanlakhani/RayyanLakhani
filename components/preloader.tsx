"use client"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const EASE = [0.76, 0, 0.24, 1] as const

const FIRST = "RAYYAN"
const LAST = "LAKHANI"

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setShow(false), 2500)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {show && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[9998] bg-background flex flex-col items-center justify-center select-none"
          exit={{
            y: "-100%",
            transition: { duration: 0.9, ease: EASE },
          }}
        >
          {/* Progress bar */}
          <div className="absolute bottom-16 left-16 right-16 h-px bg-border overflow-hidden">
            <motion.div
              className="h-full bg-primary origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 2.3, ease: EASE }}
            />
          </div>

          {/* First name */}
          <div className="flex">
            {FIRST.split("").map((letter, i) => (
              <div key={i} className="overflow-hidden">
                <motion.span
                  className="inline-block font-[family-name:var(--font-bebas-neue)] text-[clamp(3.5rem,10vw,8rem)] leading-none text-foreground tracking-widest"
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{
                    delay: 0.1 + i * 0.06,
                    duration: 0.65,
                    ease: EASE,
                  }}
                >
                  {letter}
                </motion.span>
              </div>
            ))}
          </div>

          {/* Last name */}
          <div className="flex">
            {LAST.split("").map((letter, i) => (
              <div key={i} className="overflow-hidden">
                <motion.span
                  className="inline-block font-[family-name:var(--font-bebas-neue)] text-[clamp(3.5rem,10vw,8rem)] leading-none text-primary tracking-widest"
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{
                    delay: 0.45 + i * 0.06,
                    duration: 0.65,
                    ease: EASE,
                  }}
                >
                  {letter}
                </motion.span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
