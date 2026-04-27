"use client"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { motion, AnimatePresence } from "framer-motion"

const schema = z.object({
  name:    z.string().min(1, "Name required").max(120),
  email:   z.string().email("Invalid email").max(200),
  subject: z.string().min(1, "Subject required").max(200),
  message: z.string().min(5, "Message too short").max(4000),
  website: z.string().max(0).optional(),
})

type FormData = z.infer<typeof schema>

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "ok"; note?: string }
  | { kind: "error"; msg: string }

export default function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" })
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", subject: "", message: "", website: "" },
  })

  const onSubmit = async (data: FormData) => {
    setStatus({ kind: "sending" })
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (res.ok && json.ok) {
        setStatus({ kind: "ok", note: json.note })
        reset()
      } else {
        setStatus({ kind: "error", msg: json.error || "Something went wrong" })
      }
    } catch {
      setStatus({ kind: "error", msg: "Network error — please try again" })
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="relative w-full grid gap-5 p-4 sm:p-6 md:p-8"
      style={{
        background:
          "linear-gradient(160deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
        border: "1px solid rgba(255,255,255,0.10)",
        backdropFilter: "blur(8px)",
      }}
    >
      {/* Glowing corner brackets */}
      <span aria-hidden className="absolute top-0 left-0 w-4 h-4"
        style={{ borderTop: "1px solid #fee801", borderLeft: "1px solid #fee801", boxShadow: "0 0 6px rgba(254,232,1,0.6)" }} />
      <span aria-hidden className="absolute bottom-0 right-0 w-4 h-4"
        style={{ borderBottom: "1px solid #fee801", borderRight: "1px solid #fee801", boxShadow: "0 0 6px rgba(254,232,1,0.6)" }} />

      {/* Header label */}
      <div
        className="flex items-center justify-between font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.3em] uppercase"
        style={{ color: "rgba(255,255,255,0.7)" }}
      >
        <span><span style={{ color: "#fee801" }}>●</span> SECURE_CHANNEL — OPEN</span>
        <span style={{ color: "rgba(255,255,255,0.5)" }}>v1.0</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Name" error={errors.name?.message}>
          <input
            type="text"
            autoComplete="name"
            placeholder="Your name"
            {...register("name")}
            className={inputCls}
          />
        </Field>

        <Field label="Email" error={errors.email?.message}>
          <input
            type="email"
            autoComplete="email"
            placeholder="you@domain.com"
            {...register("email")}
            className={inputCls}
          />
        </Field>
      </div>

      <Field label="Subject" error={errors.subject?.message}>
        <input
          type="text"
          placeholder="Project, role, collaboration…"
          {...register("subject")}
          className={inputCls}
        />
      </Field>

      <Field label="Message" error={errors.message?.message}>
        <textarea
          rows={5}
          placeholder="Tell me what you're building."
          {...register("message")}
          className={inputCls + " resize-none min-h-[120px] sm:min-h-[140px]"}
        />
      </Field>

      {/* Honeypot — hidden field bots fill */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        {...register("website")}
        className="absolute opacity-0 pointer-events-none -left-[9999px]"
        aria-hidden
      />

      {/* Submit row */}
      <div className="flex items-center justify-between gap-4 pt-2">
        <div className="flex-1 font-[family-name:var(--font-geist-mono)] text-[10px] tracking-widest min-h-[16px]">
          <AnimatePresence mode="wait">
            {status.kind === "ok" && (
              <motion.span
                key="ok"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{ color: "#39c4b6", textShadow: "0 0 6px rgba(57,196,182,0.4)" }}
              >
                ✓ TRANSMISSION RECEIVED — I&apos;LL REPLY WITHIN 24H
                {status.note && <span className="block opacity-60 mt-1">{status.note}</span>}
              </motion.span>
            )}
            {status.kind === "error" && (
              <motion.span
                key="err"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{ color: "#fee801" }}
              >
                ✗ {status.msg.toUpperCase()}
              </motion.span>
            )}
            {status.kind === "sending" && (
              <motion.span
                key="sending"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ color: "rgba(255,255,255,0.7)" }}
              >
                ◌ ENCRYPTING & SENDING…
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <button
          type="submit"
          data-cursor-hover
          disabled={status.kind === "sending"}
          className="inline-flex items-center gap-3 px-7 py-3 text-[10px] tracking-[0.3em] uppercase font-[family-name:var(--font-geist-mono)] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            color: "#fee801",
            border: "1px solid rgba(254,232,1,0.55)",
            boxShadow: "0 0 12px rgba(254,232,1,0.1)",
          }}
          onMouseEnter={(e) => {
            if (status.kind === "sending") return
            ;(e.currentTarget as HTMLElement).style.background = "#fee801"
            ;(e.currentTarget as HTMLElement).style.color = "#00060e"
          }}
          onMouseLeave={(e) => {
            ;(e.currentTarget as HTMLElement).style.background = "transparent"
            ;(e.currentTarget as HTMLElement).style.color = "#fee801"
          }}
        >
          <span>&gt;_</span>
          {status.kind === "sending" ? "Sending" : "Transmit"} →
        </button>
      </div>
    </form>
  )
}

const inputCls =
  "w-full bg-transparent px-3 py-3 text-foreground text-base sm:text-sm outline-none transition-colors duration-200 font-[family-name:var(--font-geist-mono)] placeholder:text-foreground/40"

function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <label className="block">
      <span
        className="block text-[9px] sm:text-[10px] tracking-[0.4em] uppercase mb-1.5 font-[family-name:var(--font-geist-mono)]"
        style={{ color: "rgba(255,255,255,0.6)" }}
      >
        {label} {error && <span style={{ color: "#fee801" }}>{"// "}{error}</span>}
      </span>
      <div
        className="transition-all duration-200 focus-within:[box-shadow:0_1px_0_0_#fee801]"
        style={{
          borderBottom: error
            ? "1px solid #fee801"
            : "1px solid rgba(255,255,255,0.16)",
        }}
      >
        {children}
      </div>
    </label>
  )
}
