import { NextResponse } from "next/server"
import { Resend } from "resend"
import { z } from "zod"

const schema = z.object({
  name:    z.string().min(1).max(120),
  email:   z.string().email().max(200),
  subject: z.string().min(1).max(200),
  message: z.string().min(5).max(4000),
  // Honeypot — bots fill this; humans don't
  website: z.string().max(0).optional(),
})

export async function POST(req: Request) {
  let payload: unknown
  try {
    payload = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 })
  }

  const parsed = schema.safeParse(payload)
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Invalid input", issues: parsed.error.flatten() },
      { status: 400 },
    )
  }

  const { name, email, subject, message } = parsed.data
  const apiKey = process.env.RESEND_API_KEY

  // No key configured — fall through to a graceful "log only" mode in dev
  if (!apiKey) {
    console.log("[contact] RESEND_API_KEY missing — logging payload only:", {
      name, email, subject, message,
    })
    return NextResponse.json({
      ok: true,
      mode: "logged",
      note: "RESEND_API_KEY not set; message was logged on the server.",
    })
  }

  const resend = new Resend(apiKey)
  const to = process.env.CONTACT_TO_EMAIL || "raylak82@gmail.com"
  const fromAddress =
    process.env.RESEND_FROM_EMAIL ||
    process.env.CONTACT_FROM_EMAIL ||
    "onboarding@resend.dev"
  const from = fromAddress.includes("<") ? fromAddress : `Portfolio <${fromAddress}>`

  try {
    const { data, error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 560px; padding: 24px;">
          <h2 style="margin: 0 0 8px; color: #fee801;">New message from ${name}</h2>
          <p style="margin: 0 0 20px; color: #555;">Reply directly to <a href="mailto:${email}">${email}</a></p>
          <div style="border-left: 3px solid #fee801; padding-left: 16px; color: #222; line-height: 1.6;">
            <p style="margin: 0 0 8px;"><strong>Subject:</strong> ${subject}</p>
            <p style="margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error("[contact] Resend error:", error)
      return NextResponse.json({ ok: false, error: error.message }, { status: 502 })
    }
    return NextResponse.json({ ok: true, id: data?.id })
  } catch (err) {
    console.error("[contact] Unexpected error:", err)
    return NextResponse.json({ ok: false, error: "Send failed" }, { status: 500 })
  }
}
