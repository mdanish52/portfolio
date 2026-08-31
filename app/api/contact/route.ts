// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, message } = await req.json();

    if (!name || !message || typeof name !== "string" || typeof message !== "string") {
      return NextResponse.json({ error: "Name and message are required." }, { status: 400 });
    }

    const toEmail = process.env.CONTACT_TO_EMAIL;
    if (!toEmail || !process.env.RESEND_API_KEY) {
      console.error("Missing Resend environment variables.");
      return NextResponse.json(
        { error: "Server is not configured to send messages." },
        { status: 500 }
      );
    }

    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: toEmail,
      subject: `Portfolio inquiry from ${name.slice(0, 100)}`,
      text: `From: ${name}\n\n${message}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6;">
          <p><strong>New portfolio inquiry</strong></p>
          <p><strong>From:</strong> ${escapeHtml(name)}</p>
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
        </div>
      `
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send message." }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}