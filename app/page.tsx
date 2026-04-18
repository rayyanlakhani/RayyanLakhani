"use client"
import { useState } from "react"
import Cursor from "@/components/cursor"
import Preloader from "@/components/preloader"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import About from "@/components/about"
import Skills from "@/components/skills"
import Experience from "@/components/experience"
import Marquee from "@/components/marquee"
import Decode from "@/components/decode"
import Projects from "@/components/projects"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import ScrollProgress from "@/components/scroll-progress"

export default function Home() {
  const [ready, setReady] = useState(false)

  return (
    <>
      <Cursor />
      <Preloader onComplete={() => setReady(true)} />

      <Navbar isReady={ready} />
      <ScrollProgress />

      <main>
        <Hero isReady={ready} />
        <About />
        <Marquee />
        <Skills />
        <Experience />
        <Decode />
        <Marquee
          variant="ticker"
          baseVelocity={3}
          items={[
            "AWWWARDS-WORTHY",
            "PIXEL-PERFECT",
            "MOTION-FIRST",
            "PERFORMANCE-OBSESSED",
            "OPEN TO COLLAB",
            "LATENCY < 16MS",
            "SHIP THE SIGNAL",
          ]}
        />
        <Projects />
        <Contact />
        <Footer />
      </main>
    </>
  )
}
