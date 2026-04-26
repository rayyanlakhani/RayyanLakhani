"use client"
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

const EASE = [0.76, 0, 0.24, 1] as const

const C_YELLOW = "#fee801"
const C_CYAN   = "#54c1e6"
const C_TEAL   = "#39c4b6"
const C_OLIVE  = "#9a9f17"
const C_BG     = "#00060e"

const CARD_OUTER =
  "polygon(0 0, calc(100% - 22px) 0, 100% 22px, 100% 100%, 22px 100%, 0 calc(100% - 22px))"
const CARD_INNER =
  "polygon(0 0, calc(100% - 21px) 0, 100% 21px, 100% 100%, 21px 100%, 0 calc(100% - 21px))"
const CHIP_CLIP =
  "polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)"

/* ── Terminal types ── */
type LineKind = "prompt" | "out" | "info" | "err"
type Line = { kind: LineKind; text: string }

const SUGGESTIONS = ["help", "hire", "resume", "projects", "theme"] as const

export default function Footer() {
  /* Uptime (client-only — avoids hydration drift) */
  const [uptime, setUptime] = useState("000m 00s")
  useEffect(() => {
    const start = Date.now()
    const tick = () => {
      const s = Math.floor((Date.now() - start) / 1000)
      const m = Math.floor(s / 60)
      setUptime(
        `${String(m).padStart(3, "0")}m ${String(s % 60).padStart(2, "0")}s`,
      )
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  /* Terminal state */
  const [history, setHistory] = useState<Line[]>([
    {
      kind: "info",
      text: "✦ LAKHANI.NET TERMINAL · v2.077 · type 'help' to begin",
    },
  ])
  const [input, setInput] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const histRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = histRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [history])

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase()
    if (!cmd) return

    const next: Line[] = [{ kind: "prompt", text: `> ${cmd}` }]

    switch (cmd) {
      case "help":
        next.push(
          { kind: "info", text: "commands:" },
          { kind: "out",  text: "  about       hire        resume" },
          { kind: "out",  text: "  email       github      linkedin" },
          { kind: "out",  text: "  projects    contact     theme" },
          { kind: "out",  text: "  whoami      ls          sudo" },
          { kind: "out",  text: "  clear" },
        )
        break
      case "about":
        next.push(
          { kind: "out", text: "Rayyan Lakhani — Creative Engineer / Frontend Netrunner." },
          { kind: "out", text: "Based in Islamabad. Remote, worldwide. Open for 2026 Q2+." },
        )
        break
      case "hire":
      case "hiring":
      case "available":
        next.push(
          { kind: "info", text: "● AVAILABLE — full-time · contract · collab" },
          { kind: "out",  text: "  slot:     2026 · Q2+" },
          { kind: "out",  text: "  channel:  raylak82@gmail.com" },
          { kind: "out",  text: "  response: < 24h" },
        )
        break
      case "resume":
      case "cv":
        next.push({ kind: "info", text: "→ fetching dossier…" })
        window.open("/resume.pdf", "_blank", "noopener,noreferrer")
        next.push({ kind: "out", text: "  opened /resume.pdf in new tab ↗" })
        break
      case "email":
      case "mail":
        window.location.href = "mailto:raylak82@gmail.com"
        next.push({ kind: "info", text: "→ opening mail client…" })
        break
      case "github":
        window.open("https://github.com/rayyanlakhani", "_blank", "noopener,noreferrer")
        next.push({ kind: "info", text: "→ opening github.com/rayyanlakhani ↗" })
        break
      case "linkedin":
        next.push({ kind: "err", text: "linkedin channel not yet wired — use 'email'." })
        break
      case "projects":
      case "work":
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
        next.push({ kind: "info", text: "→ scrolling to projects…" })
        break
      case "contact":
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
        next.push({ kind: "info", text: "→ scrolling to contact…" })
        break
      case "theme":
        next.push(
          { kind: "out", text: "palette  #00060e · #fee801 · #54c1e6 · #39c4b6 · #9a9f17" },
          { kind: "out", text: "type     bebas neue · geist mono" },
          { kind: "out", text: "motion   framer-motion + lenis smooth scroll" },
        )
        break
      case "whoami":
        next.push({
          kind: "out",
          text: "rayyan.lakhani  uid=0xA4F1  gid=engineer  groups=frontend,backend,design",
        })
        break
      case "ls":
        next.push(
          { kind: "out", text: "about/    skills/     projects/   experience/" },
          { kind: "out", text: "contact/  resume.pdf  .dotfiles" },
        )
        break
      case "sudo":
      case "rm":
      case "rm -rf":
        next.push({ kind: "err", text: "nice try, runner. access denied." })
        break
      case "clear":
      case "cls":
        setHistory([])
        setInput("")
        return
      default:
        next.push({
          kind: "err",
          text: `command not found: ${cmd}. try 'help'.`,
        })
    }

    setHistory((h) => [...h, ...next])
    setInput("")
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    run(input)
  }

  return (
    <footer
      id="footer"
      className="relative overflow-hidden"
      style={{ background: C_BG }}
    >
      {/* Grid bg */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(154,159,23,0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(154,159,23,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 100% 80% at 50% 30%, #000 20%, transparent 90%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 100% 80% at 50% 30%, #000 20%, transparent 90%)",
        }}
      />

      {/* Giant watermark name */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-16 md:top-24 pointer-events-none select-none font-[family-name:var(--font-bebas-neue)] text-center whitespace-nowrap"
        style={{
          fontSize: "clamp(10rem, 26vw, 26rem)",
          lineHeight: 0.85,
          letterSpacing: "0.02em",
          WebkitTextStroke: `1px rgba(254,232,1,0.085)`,
          color: "transparent",
        }}
      >
        LAKHANI
      </div>

      {/* Top horizontal accent */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${C_YELLOW} 20%, ${C_CYAN} 50%, ${C_TEAL} 80%, transparent 100%)`,
          boxShadow: `0 0 10px rgba(254,232,1,0.4)`,
        }}
      />

      {/* ── SIGN-OFF BLOCK ── */}
      <div className="relative px-6 md:px-12 pt-28 pb-16 md:pb-20">
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
          className="flex items-center gap-3 mb-6 font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.4em] uppercase"
        >
          <motion.span
            aria-hidden
            className="inline-block w-[9px] h-[9px]"
            style={{
              background: C_YELLOW,
              clipPath: "polygon(50% 0, 100% 50%, 50% 100%, 0 50%)",
              boxShadow: `0 0 10px ${C_YELLOW}`,
            }}
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span style={{ color: C_TEAL }}>TRANSMISSION // END</span>
          <span style={{ color: C_OLIVE }}>·</span>
          <span style={{ color: C_YELLOW, textShadow: `0 0 6px rgba(254,232,1,0.5)` }}>
            SIGNAL OUT
          </span>
        </motion.div>

        <div className="max-w-6xl">
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "110%", opacity: 0 }}
              whileInView={{ y: "0%", opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease: EASE }}
              className="font-[family-name:var(--font-bebas-neue)] leading-[0.86] tracking-[0.01em]"
              style={{
                fontSize: "clamp(3.5rem, 14vw, 13rem)",
                color: C_YELLOW,
                textShadow: `0 0 28px rgba(254,232,1,0.4)`,
              }}
            >
              END OF
            </motion.h2>
          </div>

          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "110%", opacity: 0 }}
              whileInView={{ y: "0%", opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.95, delay: 0.08, ease: EASE }}
              className="cyber-glitch relative font-[family-name:var(--font-bebas-neue)] leading-[0.86] tracking-[0.01em]"
              data-text="TRANSMISSION."
              style={{
                fontSize: "clamp(3.5rem, 14vw, 13rem)",
                color: C_CYAN,
                textShadow: `0 0 28px rgba(84,193,230,0.4)`,
              }}
            >
              TRANSMISSION.
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 font-[family-name:var(--font-geist-mono)] text-[11px] md:text-[12px] tracking-[0.35em] uppercase"
            style={{ color: C_OLIVE }}
          >
            {"//"} keep running · build loud · stay jacked in
          </motion.p>
        </div>
      </div>

      {/* ── TERMINAL ── */}
      <div className="relative px-6 md:px-12 pb-16 md:pb-20">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="relative cursor-none"
            onClick={() => inputRef.current?.focus()}
          >
            {/* Bevel */}
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                clipPath: CARD_OUTER,
                background: `linear-gradient(135deg, ${C_YELLOW}55, ${C_CYAN}44, ${C_TEAL}33)`,
                boxShadow: `0 0 40px rgba(254,232,1,0.16)`,
              }}
            />
            <div
              aria-hidden
              className="absolute"
              style={{
                inset: "1px",
                clipPath: CARD_INNER,
                background:
                  "linear-gradient(145deg, rgba(0,6,14,0.96), rgba(6,12,22,0.98))",
                backdropFilter: "blur(6px)",
              }}
            />
            <span
              aria-hidden
              className="absolute top-[6px] right-[6px] w-[3px] h-[3px] z-10"
              style={{ background: C_YELLOW, boxShadow: `0 0 6px ${C_YELLOW}` }}
            />

            {/* Header bar */}
            <div
              className="relative flex items-center justify-between px-5 py-3 font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.35em]"
              style={{ borderBottom: `1px solid ${C_YELLOW}22` }}
            >
              <div className="flex items-center gap-2">
                <motion.span
                  aria-hidden
                  className="inline-block w-[7px] h-[7px] rounded-full"
                  style={{ background: C_TEAL, boxShadow: `0 0 6px ${C_TEAL}` }}
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                />
                <span style={{ color: C_OLIVE }}>TERMINAL</span>
                <span style={{ color: C_CYAN }}>/lakhani.net</span>
              </div>
              <div style={{ color: C_OLIVE }}>CH · 0xA4F1</div>
            </div>

            {/* History */}
            <div
              ref={histRef}
              className="relative px-5 py-4 font-[family-name:var(--font-geist-mono)] text-[11.5px] leading-[1.7] overflow-auto"
              style={{ minHeight: 180, maxHeight: 260 }}
            >
              {history.map((line, i) => (
                <div
                  key={i}
                  className="whitespace-pre"
                  style={{
                    color:
                      line.kind === "prompt"
                        ? C_YELLOW
                        : line.kind === "info"
                        ? C_CYAN
                        : line.kind === "err"
                        ? C_YELLOW
                        : "rgba(232,244,255,0.8)",
                    textShadow:
                      line.kind === "prompt"
                        ? `0 0 6px rgba(254,232,1,0.4)`
                        : line.kind === "info"
                        ? `0 0 5px rgba(84,193,230,0.35)`
                        : undefined,
                    opacity: line.kind === "err" ? 0.95 : 1,
                  }}
                >
                  {line.kind === "err" ? `⚠  ${line.text}` : line.text}
                </div>
              ))}
            </div>

            {/* Input */}
            <form
              onSubmit={onSubmit}
              className="relative px-5 py-3 flex items-center gap-3"
              style={{ borderTop: `1px solid ${C_YELLOW}22` }}
            >
              <span
                className="font-[family-name:var(--font-geist-mono)] text-[12px] shrink-0"
                style={{
                  color: C_YELLOW,
                  textShadow: `0 0 6px rgba(254,232,1,0.5)`,
                }}
              >
                &gt;_
              </span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                placeholder="type a command (try 'help')"
                className="flex-1 bg-transparent outline-none font-[family-name:var(--font-geist-mono)] text-[12px] tracking-wide placeholder:opacity-40"
                style={{
                  color: "#e8f4ff",
                  caretColor: C_YELLOW,
                  cursor: "text",
                }}
                data-cursor-hover
              />
              <button
                type="submit"
                aria-label="Execute command"
                className="shrink-0 text-[10px] tracking-[0.3em] font-[family-name:var(--font-geist-mono)] px-4 py-1 transition-all hover:brightness-110"
                style={{
                  clipPath: CHIP_CLIP,
                  background: C_YELLOW,
                  color: C_BG,
                  boxShadow: `0 0 10px rgba(254,232,1,0.35)`,
                }}
                data-cursor-hover
              >
                RUN ↵
              </button>
            </form>
          </motion.div>

          {/* Suggestions */}
          <div className="mt-3 flex flex-wrap gap-2 items-center font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.25em]">
            <span style={{ color: C_OLIVE }}>TRY:</span>
            {SUGGESTIONS.map((cmd) => (
              <button
                key={cmd}
                type="button"
                onClick={() => {
                  run(cmd)
                  inputRef.current?.focus()
                }}
                data-cursor-hover
                className="px-2.5 py-0.5 transition-all duration-200 hover:-translate-y-px"
                style={{
                  color: C_CYAN,
                  border: `1px solid ${C_CYAN}40`,
                  clipPath: CHIP_CLIP,
                }}
              >
                {cmd}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── STATUS STRIP ── */}
      <div
        className="relative px-6 md:px-12 py-6"
        style={{
          borderTop: "1px solid rgba(232,244,255,0.08)",
          borderBottom: "1px solid rgba(232,244,255,0.08)",
          background: "rgba(0,6,14,0.7)",
          backdropFilter: "blur(4px)",
        }}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-5 font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.3em]">
          <StatusItem label="UPTIME"   value={uptime}             color={C_YELLOW} mono />
          <StatusItem label="CHANNEL"  value="0xA4F1"             color={C_CYAN} />
          <StatusItem label="COORDS"   value="33.68°N / 73.04°E" color={C_CYAN} />
          <StatusItem label="LATENCY"  value="< 16MS"             color={C_TEAL} />
          <StatusItem label="STATUS"   value="ONLINE"             color={C_TEAL} live />
        </div>
      </div>

      {/* ── COPYRIGHT ── */}
      <div className="relative px-6 md:px-12 py-5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3 font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.3em]">
          <span style={{ color: C_OLIVE }} suppressHydrationWarning>
            © {new Date().getFullYear()} · RAYYAN LAKHANI · ALL RIGHTS
          </span>
          <span className="flex items-center gap-3">
            <span style={{ color: "rgba(232,244,255,0.5)" }}>
              BUILT FROM SCRATCH
            </span>
            <span
              aria-hidden
              className="inline-block w-[4px] h-[4px] rotate-45"
              style={{ background: C_YELLOW, boxShadow: `0 0 6px ${C_YELLOW}` }}
            />
            <span
              style={{
                color: C_YELLOW,
                textShadow: `0 0 6px rgba(254,232,1,0.5)`,
              }}
            >
              V.2.077
            </span>
          </span>
        </div>
      </div>
    </footer>
  )
}

function StatusItem({
  label,
  value,
  color,
  live,
  mono,
}: {
  label: string
  value: string
  color: string
  live?: boolean
  mono?: boolean
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span style={{ color: C_OLIVE }}>{label}</span>
      <span
        className={`flex items-center gap-2 ${mono ? "tabular-nums" : ""}`}
        style={{ color, textShadow: `0 0 5px ${color}44` }}
      >
        {live && (
          <motion.span
            aria-hidden
            className="inline-block w-[6px] h-[6px] rounded-full"
            style={{ background: color, boxShadow: `0 0 6px ${color}` }}
            animate={{ opacity: [1, 0.35, 1] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          />
        )}
        {value}
      </span>
    </div>
  )
}
