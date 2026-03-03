import express from "express";
import nodemailer from "nodemailer";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

// cPanel / Passenger often runs behind a proxy
app.set("trust proxy", 1);

app.use(express.json({ limit: "200kb" }));

/** ---------- helpers ---------- */
function esc(s = "") {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function nl2br(s = "") {
  return esc(s).replaceAll("\n", "<br/>");
}

/** ---------- email templates ---------- */
function buildAdminEmail({ name, email, message, submittedAt }) {
  const brandHeader = `
    <div style="background:#0F1419;padding:18px 24px;border-top-left-radius:12px;border-top-right-radius:12px;">
      <div style="font-size:22px;font-weight:700;font-family:Arial,Helvetica,sans-serif;">
        <span style="color:#10B981;">code</span><span style="color:#FFFFFF;">nest</span>
      </div>
    </div>
  `;

  const safeName = esc(name);
  const safeEmail = esc(email);
  const safeMessage = nl2br(message);

  const html = `<!doctype html>
  <html>
    <body style="margin:0;background:#f3f4f6;padding:30px;font-family:Arial,Helvetica,sans-serif;">
      <div style="max-width:640px;margin:auto;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e5e7eb;">
        ${brandHeader}
        <div style="padding:24px;color:#111827;">
          <h2 style="margin:0 0 20px;font-size:18px;color:#111827;">New Contact Message</h2>

          <table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;">
            <tr>
              <td style="color:#6b7280;padding:6px 0;width:120px;">Name</td>
              <td style="padding:6px 0;"><strong>${safeName}</strong></td>
            </tr>
            <tr>
              <td style="color:#6b7280;padding:6px 0;">Email</td>
              <td style="padding:6px 0;">
                <a href="mailto:${safeEmail}" style="color:#10B981;text-decoration:none;">${safeEmail}</a>
              </td>
            </tr>
            <tr>
              <td style="color:#6b7280;padding:6px 0;">Submitted</td>
              <td style="padding:6px 0;">${esc(submittedAt)}</td>
            </tr>
          </table>

          <div style="margin-top:20px;border-top:1px solid #e5e7eb;padding-top:20px;">
            <div style="font-size:13px;font-weight:700;margin-bottom:10px;color:#111827;">Message</div>
            <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:10px;padding:16px;font-size:14px;line-height:1.6;color:#111827;">
              ${safeMessage}
            </div>
          </div>
        </div>

        <div style="background:#f9fafb;padding:14px 24px;border-top:1px solid #e5e7eb;color:#6b7280;font-size:12px;">
          © ${new Date().getFullYear()} CodeNest • codenest.ro
        </div>
      </div>
    </body>
  </html>`;

  const text = `New Contact Message

Name: ${name}
Email: ${email}
Submitted: ${submittedAt}

Message:
${message}
`;

  return { html, text };
}

function buildUserEmail({ name, message, siteUrl }) {
  const brandHeader = `
    <div style="background:#0F1419;padding:18px 24px;border-top-left-radius:12px;border-top-right-radius:12px;">
      <div style="font-size:22px;font-weight:700;font-family:Arial,Helvetica,sans-serif;">
        <span style="color:#10B981;">code</span><span style="color:#FFFFFF;">nest</span>
      </div>
    </div>
  `;

  const safeName = esc(name);
  const safeMessage = nl2br(message);

  const html = `<!doctype html>
  <html>
    <body style="margin:0;background:#f3f4f6;padding:30px;font-family:Arial,Helvetica,sans-serif;">
      <div style="max-width:640px;margin:auto;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e5e7eb;">
        ${brandHeader}

        <div style="padding:24px;color:#111827;">
          <h2 style="margin:0 0 16px;font-size:18px;">Thanks for reaching out, ${safeName}!</h2>

          <p style="margin:0 0 16px;font-size:14px;line-height:1.6;color:#374151;">
            We’ve received your message and will reply shortly.
          </p>

          <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:10px;padding:16px;font-size:14px;line-height:1.6;color:#111827;">
            ${safeMessage}
          </div>

          <div style="margin-top:20px;">
            <a href="${esc(siteUrl)}"
               style="display:inline-block;background:#10B981;color:#0F1419;text-decoration:none;padding:10px 16px;border-radius:8px;font-weight:700;font-size:13px;">
              Visit CodeNest
            </a>
          </div>

          <p style="margin-top:20px;font-size:12px;color:#6b7280;">
            This is an automated message. If you need to add more details, reply to this email and it will reach our team.
          </p>
        </div>

        <div style="background:#f9fafb;padding:14px 24px;border-top:1px solid #e5e7eb;color:#6b7280;font-size:12px;">
          © ${new Date().getFullYear()} CodeNest • codenest.ro
        </div>
      </div>
    </body>
  </html>`;

  const text = `Hi ${name},

We received your message and will reply shortly.

Your message:
${message}

${siteUrl}
— CodeNest
`;

  return { html, text };
}

/** ---------- mailer ---------- */
function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: String(process.env.SMTP_SECURE).toLowerCase() === "true", // true for 465
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

/** ---------- API ---------- */
app.get("/api/health", (req, res) => res.json({ ok: true }));

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message, website } = req.body || {};

    // Honeypot for bots
    if (website) return res.json({ ok: true });

    if (!name || !email || !message) {
      return res.status(400).json({ ok: false, error: "Missing fields" });
    }

    // Optional: basic length limits
    if (
      String(name).length > 120 ||
      String(email).length > 200 ||
      String(message).length > 5000
    ) {
      return res.status(400).json({ ok: false, error: "Input too long" });
    }

    const transporter = createTransporter();

    // In RO timezone you might prefer local time, but ISO is fine
    const submittedAt = new Date().toISOString().slice(0, 16).replace("T", " ");

    // 1) Admin email
    const admin = buildAdminEmail({ name, email, message, submittedAt });
    await transporter.sendMail({
      from: `"${process.env.MAIL_FROM_NAME || "CodeNest"}" <${process.env.MAIL_FROM || process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO || process.env.MAIL_FROM || process.env.SMTP_USER,
      replyTo: `"${name}" <${email}>`,
      subject: "New contact form message",
      html: admin.html,
      text: admin.text,
    });

    // 2) User confirmation email
    const user = buildUserEmail({
      name,
      message,
      siteUrl: process.env.SITE_URL || "https://codenest.ro",
    });

    await transporter.sendMail({
      from: `"${process.env.MAIL_FROM_NAME || "CodeNest"}" <${process.env.MAIL_NOREPLY || process.env.MAIL_FROM || process.env.SMTP_USER}>`,
      to: email,
      replyTo: `"${process.env.MAIL_FROM_NAME || "CodeNest"}" <${process.env.MAIL_FROM || process.env.SMTP_USER}>`,
      subject: "We received your message",
      html: user.html,
      text: user.text,
    });

    return res.json({ ok: true });
  } catch (err) {
    console.error("Contact error:", err);
    return res.status(500).json({ ok: false, error: "Failed to send message" });
  }
});

/** ---------- Serve frontend (Vite build) ---------- */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Build Vite into: server/public
const publicDir = path.join(__dirname, "public");

// Serve static assets
app.use(express.static(publicDir));

// SPA fallback (React Router)
app.get("*", (req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

/** ---------- Start server ---------- */
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on ${port}`));