"use client"
import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Magnetic from "./magnetic"

/* ── Palette ── */
const C_YELLOW = "#fee801"
const C_CYAN   = "#54c1e6"
const C_TEAL   = "#39c4b6"
const C_OLIVE  = "#9a9f17"
const C_BG     = "#00060e"

const EASE = [0.76, 0, 0.24, 1] as const

const CHIP_CLIP =
  "polygon(10px 0%, 100% 0%, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0% 100%, 0% 10px)"

/* ── Types ── */
type Project = {
  id:          string
  feed:        string
  title:       string
  subtitle:    string
  description: string
  year:        string
  tags:        string[]
  video:       string
  href:        string
  accentColor: string
  client:      string
  type:        string
  status:      string
  role:        string
}

const PROJECTS: Project[] = [
  {
    id: "01",
    feed: "FEED [01]",
    title: "DON MOLANO",
    subtitle: "LUXURY MENSWEAR E-COMMERCE",
    description:
      "Brand & e-commerce experience for a luxury menswear label — buttery scrolling, refined product reveals, and a full Stripe integration across every touch-point.",
    year: "2024",
    tags: ["Next.js", "Stripe", "Shopify"],
    video: "/DonMolano.mp4",
    href: "#",
    accentColor: C_CYAN,
    client: "Don Molano",
    type: "E-Commerce",
    status: "DELIVERED",
    role: "Full-Stack Dev",
  },
  {
    id: "02",
    feed: "FEED [02]",
    title: "INTRIGROW",
    subtitle: "GROWTH-MARKETING AGENCY",
    description:
      "A growth-marketing agency site with custom motion choreography. Every section earned its weight in performance and polish.",
    year: "2025",
    tags: ["Next.js", "Framer Motion", "Tailwind"],
    video: "/Intrigrow.mp4",
    href: "#",
    accentColor: C_TEAL,
    client: "Intrigrow Agency",
    type: "Marketing Site",
    status: "LIVE",
    role: "UI + Full-Stack",
  },
  {
    id: "03",
    feed: "FEED [03]",
    title: "DIGITAL CONCIERGE",
    subtitle: "AI-POWERED TOURIST CONCIERGE",
    description:
      "Official tourist application deployed across hotels in Abu Dhabi — guests interact with an AI chatbot acting as a personal concierge, surfacing local recommendations, bookings, and city intel on demand.",
    year: "2025",
    tags: ["React", "Node.js", "OpenAI API"],
    video: "/culturehero.mp4",
    href: "#",
    accentColor: C_OLIVE,
    client: "Abu Dhabi Tourism",
    type: "Mobile App",
    status: "DEPLOYED",
    role: "Full-Stack Dev",
  },
]

/* ── Corner Brackets ── */
function CornerBrackets({ color, active }: { color: string; active: boolean }) {
  const c = active ? color : "rgba(255,255,255,0.18)"
  const shadow = active ? `0 0 8px ${color}88` : "none"
  const base: React.CSSProperties = {
    position: "absolute",
    width: 20,
    height: 20,
    transition: "border-color 0.4s ease, box-shadow 0.4s ease",
  }
  return (
    <>
      <span aria-hidden style={{ ...base, top: 12, left: 12, borderTop: `1px solid ${c}`, borderLeft: `1px solid ${c}`, boxShadow: shadow }} />
      <span aria-hidden style={{ ...base, top: 12, right: 12, borderTop: `1px solid ${c}`, borderRight: `1px solid ${c}`, boxShadow: shadow }} />
      <span aria-hidden style={{ ...base, bottom: 12, left: 12, borderBottom: `1px solid ${c}`, borderLeft: `1px solid ${c}`, boxShadow: shadow }} />
      <span aria-hidden style={{ ...base, bottom: 12, right: 12, borderBottom: `1px solid ${c}`, borderRight: `1px solid ${c}`, boxShadow: shadow }} />
    </>
  )
}

/* ── Scanline overlay ── */
function ScanlineOverlay() {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 4,
        background:
          "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px)",
      }}
    />
  )
}

/* ── Video player with IntersectionObserver ── */
function SurveillanceFeed({ video, isFocused }: { video: string; isFocused: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {})
        else el.pause()
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <video
      ref={videoRef}
      src={video}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        filter: isFocused
          ? "brightness(1.15) saturate(1.1)"
          : "brightness(0.6) saturate(0.8)",
        transition: "filter 0.55s ease",
        zIndex: 1,
      }}
    />
  )
}

/* ── Pulsing REC indicator ── */
function RecIndicator() {
  return (
    <div
      style={{
        position: "absolute",
        top: 20,
        right: 20,
        zIndex: 10,
        display: "flex",
        alignItems: "center",
        gap: 6,
        fontFamily: "var(--font-geist-mono)",
        fontSize: 9,
        letterSpacing: "0.3em",
        color: "rgba(255,255,255,0.5)",
      }}
    >
      <motion.span
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: C_YELLOW,
          display: "inline-block",
          boxShadow: `0 0 6px ${C_YELLOW}`,
        }}
        animate={{ opacity: [1, 0.3, 1] }}
        transition={{ duration: 1.4, repeat: Infinity }}
      />
      REC
    </div>
  )
}

/* ── Top-left HUD label ── */
function FeedLabel({
  feed,
  year,
  isFocused,
  color,
}: {
  feed: string
  year: string
  isFocused: boolean
  color: string
}) {
  return (
    <div
      style={{
        position: "absolute",
        top: 20,
        left: 20,
        zIndex: 10,
        fontFamily: "var(--font-geist-mono)",
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <span
        style={{
          fontSize: 9,
          letterSpacing: "0.35em",
          color: isFocused ? color : "rgba(255,255,255,0.35)",
          textShadow: isFocused ? `0 0 8px ${color}` : "none",
          transition: "color 0.4s ease, text-shadow 0.4s ease",
        }}
      >
        {feed}
      </span>
      <span
        style={{
          fontSize: 9,
          letterSpacing: "0.3em",
          color: "rgba(255,255,255,0.25)",
        }}
      >
        {year}
      </span>
    </div>
  )
}

/* ── One surveillance panel ── */
function SurveillancePanel({
  project,
  isFocused,
}: {
  project: Project
  isFocused: boolean
}) {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
      <SurveillanceFeed video={project.video} isFocused={isFocused} />

      <motion.div
        animate={{ opacity: isFocused ? 0.28 : 0.78 }}
        transition={{ duration: 0.45, ease: EASE }}
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(0,6,14,0.8) 0%, transparent 28%, transparent 52%, rgba(0,6,14,0.95) 100%)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      <ScanlineOverlay />
      <CornerBrackets color={project.accentColor} active={isFocused} />
      <RecIndicator />
      <FeedLabel
        feed={project.feed}
        year={project.year}
        isFocused={isFocused}
        color={project.accentColor}
      />

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "28px 24px",
          zIndex: 10,
        }}
      >
        <h3
          style={{
            fontFamily: "var(--font-bebas-neue)",
            fontSize: "clamp(2rem, 3.5vw, 4rem)",
            lineHeight: 0.9,
            color: isFocused ? "#e8f4ff" : "rgba(232,244,255,0.65)",
            textShadow: isFocused ? `0 0 24px ${project.accentColor}44` : "none",
            transition: "color 0.4s ease, text-shadow 0.4s ease",
            marginBottom: 12,
          }}
        >
          {project.title}
        </h3>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
          {project.tags.map((t) => (
            <span
              key={t}
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: 9,
                letterSpacing: "0.25em",
                padding: "3px 10px",
                color: isFocused ? project.accentColor : "rgba(255,255,255,0.35)",
                border: `1px solid ${
                  isFocused ? project.accentColor + "77" : "rgba(255,255,255,0.12)"
                }`,
                transition: "color 0.4s ease, border-color 0.4s ease",
              }}
            >
              {t}
            </span>
          ))}
        </div>

        <motion.div
          animate={{ opacity: isFocused ? 1 : 0, y: isFocused ? 0 : 14 }}
          transition={{ duration: 0.3, ease: EASE }}
          style={{
            fontFamily: "var(--font-geist-mono)",
            fontSize: 9,
            letterSpacing: "0.4em",
            color: project.accentColor,
            textShadow: `0 0 8px ${project.accentColor}88`,
          }}
        >
          ACCESS FILE ▶
        </motion.div>
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          boxShadow: isFocused
            ? `inset 0 0 0 1px ${project.accentColor}66, inset 0 0 40px ${project.accentColor}0a`
            : "inset 0 0 0 1px rgba(255,255,255,0.06)",
          transition: "box-shadow 0.45s ease",
          zIndex: 12,
          pointerEvents: "none",
        }}
      />
    </div>
  )
}

/* ── Modal: HUD data row ── */
function DataRow({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        padding: "12px 0",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-geist-mono)",
          fontSize: 8,
          letterSpacing: "0.4em",
          color: "rgba(255,255,255,0.25)",
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: "var(--font-geist-mono)",
          fontSize: 11,
          letterSpacing: "0.2em",
          color,
        }}
      >
        {value}
      </span>
    </div>
  )
}

/* ── Modal: section label ── */
function SectionLabel({ text, color }: { text: string; color: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        marginBottom: 14,
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-geist-mono)",
          fontSize: 8,
          letterSpacing: "0.4em",
          color: "rgba(255,255,255,0.25)",
        }}
      >
        {text}
      </span>
      <div
        style={{
          flex: 1,
          height: 1,
          background: `linear-gradient(90deg, ${color}44 0%, transparent 100%)`,
        }}
      />
    </div>
  )
}

/* ── Modal: full-screen overlay ── */
function ProjectModal({
  project,
  onClose,
  isMobile = false,
}: {
  project: Project
  onClose: () => void
  isMobile?: boolean
}) {
  const modalRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    document.body.style.overflow = "hidden"
    modalRef.current?.focus()
    videoRef.current?.play().catch(() => {})
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [onClose])

  return (
    <>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 200,
          background: "rgba(0,6,14,0.88)",
          backdropFilter: "blur(14px)",
        }}
      />

      {/* Modal shell */}
      <motion.div
        ref={modalRef}
        key="modal"
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        transition={{ duration: 0.5, ease: EASE }}
        tabIndex={-1}
        style={{
          position: "fixed",
          inset: isMobile ? 0 : "3vh 3vw",
          zIndex: 201,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          border: `1px solid ${project.accentColor}33`,
          boxShadow: `0 0 80px ${project.accentColor}14, 0 40px 80px rgba(0,0,0,0.8)`,
          outline: "none",
          background: C_BG,
        }}
      >
        {/* ── TOP HEADER BAR ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 24px",
            height: 40,
            flexShrink: 0,
            borderBottom: `1px solid ${project.accentColor}22`,
            background: `linear-gradient(90deg, ${project.accentColor}08 0%, transparent 60%)`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <motion.span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: project.accentColor,
                display: "inline-block",
                boxShadow: `0 0 6px ${project.accentColor}`,
              }}
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            />
            <span
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: 9,
                letterSpacing: "0.4em",
                color: project.accentColor,
              }}
            >
              CLASSIFIED // PROJECT [{project.id}] // {project.status}
            </span>
          </div>
          <button
            onClick={onClose}
            data-cursor-hover
            aria-label="Close project"
            style={{
              color: isMobile ? "#e8f4ff" : "rgba(255,255,255,0.35)",
              fontFamily: "var(--font-geist-mono)",
              fontSize: isMobile ? 11 : 9,
              letterSpacing: "0.3em",
              background: "none",
              border: isMobile ? `1px solid ${project.accentColor}55` : "none",
              cursor: "pointer",
              transition: "color 0.2s",
              padding: isMobile ? "5px 12px" : "0",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#e8f4ff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = isMobile ? "#e8f4ff" : "rgba(255,255,255,0.35)")}
          >
            {isMobile ? "✕ CLOSE" : "[ ESC ] ✕"}
          </button>
        </div>

        {/* ── MAIN BODY ── */}
        <div
          style={{
            flex: 1,
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            overflow: "hidden",
            minHeight: 0,
          }}
        >
          {/* ── LEFT: VIDEO COLUMN ── */}
          {!isMobile && (
            <div
              style={{
                position: "relative",
                overflow: "hidden",
                borderRight: `1px solid ${project.accentColor}18`,
              }}
            >
              <video
                ref={videoRef}
                src={project.video}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              {/* Dark gradient overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(0,6,14,0.55) 0%, transparent 30%, transparent 60%, rgba(0,6,14,0.8) 100%)",
                  pointerEvents: "none",
                  zIndex: 2,
                }}
              />
              <ScanlineOverlay />

              {/* Video bottom HUD */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "20px 24px",
                  zIndex: 10,
                  borderTop: `1px solid ${project.accentColor}18`,
                  background: "linear-gradient(180deg, transparent 0%, rgba(0,6,14,0.9) 100%)",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "0 24px",
                  }}
                >
                  <DataRow label="Client" value={project.client} color="rgba(232,244,255,0.7)" />
                  <DataRow label="Role" value={project.role} color="rgba(232,244,255,0.7)" />
                  <DataRow
                    label="Signal"
                    value="ACQUIRED"
                    color={project.accentColor}
                  />
                  <DataRow label="Year" value={project.year} color="rgba(232,244,255,0.5)" />
                </div>
              </div>

              {/* Top HUD: feed label */}
              <div
                style={{
                  position: "absolute",
                  top: 16,
                  left: 20,
                  zIndex: 10,
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: 9,
                  letterSpacing: "0.35em",
                  color: project.accentColor,
                  textShadow: `0 0 8px ${project.accentColor}`,
                }}
              >
                {project.feed}
              </div>
            </div>
          )}

          {/* ── RIGHT: DETAILS COLUMN ── */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: isMobile ? "32px 24px" : "36px 40px",
              overflowY: "auto",
              position: "relative",
            }}
          >
            <CornerBrackets color={project.accentColor} active />

            {/* Title block */}
            <div style={{ marginBottom: 28 }}>
              <p
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: 9,
                  letterSpacing: "0.4em",
                  color: "rgba(255,255,255,0.28)",
                  marginBottom: 10,
                }}
              >
                {project.subtitle}
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-bebas-neue)",
                  fontSize: "clamp(3.2rem, 5.5vw, 6.5rem)",
                  lineHeight: 0.86,
                  color: "#e8f4ff",
                  marginBottom: 0,
                }}
              >
                {project.title}
              </h2>
            </div>

            {/* Accent divider */}
            <div
              style={{
                height: 1,
                background: `linear-gradient(90deg, ${project.accentColor}77 0%, transparent 100%)`,
                marginBottom: 28,
              }}
            />

            {/* Mission Brief */}
            <div style={{ marginBottom: 28 }}>
              <SectionLabel text="MISSION BRIEF" color={project.accentColor} />
              <p
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: 14,
                  lineHeight: 1.8,
                  color: "rgba(232,244,255,0.65)",
                }}
              >
                {project.description}
              </p>
            </div>

            {/* Technical Loadout */}
            <div style={{ marginBottom: 28 }}>
              <SectionLabel text="TECHNICAL LOADOUT" color={project.accentColor} />
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {project.tags.map((t) => (
                  <span
                    key={t}
                    style={{
                      fontFamily: "var(--font-geist-mono)",
                      fontSize: 10,
                      letterSpacing: "0.22em",
                      padding: "5px 14px",
                      color: project.accentColor,
                      border: `1px solid ${project.accentColor}44`,
                      boxShadow: `0 0 10px ${project.accentColor}1a`,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Intel grid */}
            <div style={{ marginBottom: 32 }}>
              <SectionLabel text="FIELD INTEL" color={project.accentColor} />
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  borderTop: "1px solid rgba(255,255,255,0.07)",
                  borderLeft: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                {[
                  { label: "CLIENT", value: project.client },
                  { label: "TYPE", value: project.type },
                  { label: "STATUS", value: project.status },
                  { label: "YEAR", value: project.year },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    style={{
                      padding: "12px 14px",
                      borderBottom: "1px solid rgba(255,255,255,0.07)",
                      borderRight: "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "var(--font-geist-mono)",
                        fontSize: 8,
                        letterSpacing: "0.4em",
                        color: "rgba(255,255,255,0.22)",
                        marginBottom: 5,
                      }}
                    >
                      {label}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-geist-mono)",
                        fontSize: 11,
                        letterSpacing: "0.18em",
                        color:
                          label === "STATUS"
                            ? project.accentColor
                            : "rgba(232,244,255,0.7)",
                      }}
                    >
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            {project.href !== "#" ? (
              <Magnetic strength={0.35} scale={1.04}>
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-hover
                  className="group relative inline-flex items-center"
                  style={{ clipPath: CHIP_CLIP }}
                >
                  <span
                    aria-hidden
                    className="absolute inset-0"
                    style={{ background: project.accentColor }}
                  />
                  <span
                    aria-hidden
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "rgba(255,255,255,0.18)", mixBlendMode: "screen" }}
                  />
                  <span
                    className="relative z-10 inline-flex items-center gap-2 px-8 py-3 text-[10px] tracking-[0.3em] uppercase font-[family-name:var(--font-geist-mono)]"
                    style={{ color: C_BG }}
                  >
                    VISIT SITE →
                  </span>
                </a>
              </Magnetic>
            ) : (
              <div
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: 9,
                  letterSpacing: "0.35em",
                  color: "rgba(255,255,255,0.2)",
                  borderLeft: "2px solid rgba(255,255,255,0.07)",
                  paddingLeft: 12,
                }}
              >
                PRIVATE DEPLOYMENT // ACCESS RESTRICTED
              </div>
            )}
          </div>
        </div>

        {/* ── MOBILE CLOSE BAR ── */}
        {isMobile && (
          <div
            style={{
              flexShrink: 0,
              padding: "10px 20px 20px",
              borderTop: `1px solid ${project.accentColor}22`,
              background: `linear-gradient(to top, ${project.accentColor}08, transparent)`,
            }}
          >
            <button
              onClick={onClose}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                padding: "14px",
                width: "100%",
                color: "#e8f4ff",
                fontFamily: "var(--font-geist-mono)",
                fontSize: 11,
                letterSpacing: "0.35em",
                background: `${project.accentColor}18`,
                border: `1px solid ${project.accentColor}55`,
                cursor: "pointer",
              }}
            >
              ✕ CLOSE
            </button>
          </div>
        )}
      </motion.div>
    </>
  )
}

/* ── Mobile layout ── */
function ProjectsMobile() {
  const [openId, setOpenId] = useState<string | null>(null)
  const openProject = PROJECTS.find((p) => p.id === openId) ?? null

  return (
    <section id="projects" style={{ position: "relative", background: C_BG, paddingBottom: 80 }}>
      <div style={{ padding: "48px 16px 32px" }}>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: "var(--font-geist-mono)",
            fontSize: 9,
            letterSpacing: "0.4em",
            color: C_CYAN,
            marginBottom: 12,
          }}
        >
          CLASSIFIED DOSSIER // 0x03 ENTRIES
        </motion.p>
        <h2
          className="cyber-glitch font-[family-name:var(--font-bebas-neue)]"
          data-text="PROJECTS"
          style={{
            fontSize: "clamp(4rem, 18vw, 8rem)",
            color: "#e8f4ff",
            lineHeight: 0.88,
          }}
        >
          PROJECTS
        </h2>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {PROJECTS.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
            onClick={() => setOpenId(project.id)}
            tabIndex={0}
            role="button"
            aria-label={`View ${project.title} project details`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                setOpenId(project.id)
              }
            }}
            style={{
              position: "relative",
              height: "60vw",
              minHeight: 200,
              overflow: "hidden",
              cursor: "pointer",
            }}
          >
            <video
              src={project.video}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "brightness(0.6)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, transparent 40%, rgba(0,6,14,0.92) 100%)",
                zIndex: 2,
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 20,
                left: 20,
                right: 20,
                zIndex: 3,
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-bebas-neue)",
                  fontSize: "clamp(1.4rem, 6vw, 3rem)",
                  lineHeight: 0.9,
                  color: "#e8f4ff",
                  marginBottom: 8,
                }}
              >
                {project.title}
              </h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                {project.tags.map((t) => (
                  <span
                    key={t}
                    style={{
                      fontFamily: "var(--font-geist-mono)",
                      fontSize: 8,
                      letterSpacing: "0.2em",
                      padding: "2px 8px",
                      color: project.accentColor,
                      border: `1px solid ${project.accentColor}55`,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <CornerBrackets color={project.accentColor} active={false} />
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {openProject && (
          <ProjectModal
            project={openProject}
            onClose={() => setOpenId(null)}
            isMobile
          />
        )}
      </AnimatePresence>
    </section>
  )
}

/* ── Desktop layout ── */
function ProjectsDesktop() {
  const [focusedId, setFocusedId] = useState<string | null>(null)
  const [openId, setOpenId] = useState<string | null>(null)
  const openProject = PROJECTS.find((p) => p.id === openId) ?? null

  const panelWidth = (id: string): string => {
    if (focusedId === null) return "33.33%"
    if (focusedId === id) return "55%"
    return "22.5%"
  }

  return (
    <section id="projects" style={{ position: "relative", background: C_BG }}>
      {/* Section header */}
      <div style={{ padding: "80px 52px 52px", position: "relative", zIndex: 10 }}>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: "var(--font-geist-mono)",
            fontSize: 9,
            letterSpacing: "0.4em",
            color: C_CYAN,
            marginBottom: 14,
          }}
        >
          CLASSIFIED DOSSIER // 0x03 ENTRIES
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE }}
          className="cyber-glitch font-[family-name:var(--font-bebas-neue)]"
          data-text="PROJECTS"
          style={{
            fontSize: "clamp(5rem, 12vw, 10rem)",
            color: "#e8f4ff",
            lineHeight: 0.88,
          }}
        >
          PROJECTS
        </motion.h2>
      </div>

      {/* Panel array */}
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "85vh",
          gap: "1px",
          background: "rgba(255,255,255,0.05)",
        }}
      >
        {PROJECTS.map((project) => (
          <div
            key={project.id}
            role="button"
            tabIndex={0}
            aria-label={`View ${project.title} project details`}
            onMouseEnter={() => setFocusedId(project.id)}
            onMouseLeave={() => setFocusedId(null)}
            onFocus={() => setFocusedId(project.id)}
            onBlur={() => setFocusedId(null)}
            onClick={() => setOpenId(project.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                setOpenId(project.id)
              }
            }}
            style={{
              flexBasis: panelWidth(project.id),
              flexShrink: 0,
              flexGrow: 0,
              transition: "flex-basis 0.55s cubic-bezier(0.76, 0, 0.24, 1)",
              position: "relative",
              overflow: "hidden",
              cursor: "pointer",
              background: C_BG,
            }}
          >
            <SurveillancePanel
              project={project}
              isFocused={focusedId === project.id}
            />
          </div>
        ))}
      </div>

      <div style={{ height: 80 }} />

      {/* Watermark */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          right: 0,
          bottom: 8,
          fontFamily: "var(--font-bebas-neue)",
          fontSize: "22vw",
          lineHeight: 1,
          color: "rgba(255,255,255,0.035)",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        05
      </div>

      <AnimatePresence>
        {openProject && (
          <ProjectModal project={openProject} onClose={() => setOpenId(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}

/* ── Main export ── */
export default function Projects() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)")
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  return isMobile ? <ProjectsMobile /> : <ProjectsDesktop />
}
