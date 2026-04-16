"use client"
import { useState } from "react"
import Cursor from "@/components/cursor"
import Preloader from "@/components/preloader"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import About from "@/components/about"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Contact from "@/components/contact"

export default function Home() {
  const [ready, setReady] = useState(false)

  return (
    <>
      <Cursor />
      <Preloader onComplete={() => setReady(true)} />

      <Navbar isReady={ready} />

      <main>
        <Hero isReady={ready} />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </>
  )
}
