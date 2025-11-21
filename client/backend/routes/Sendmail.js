import { SESClient, SendEmailCommand, SendRawEmailCommand, } from "@aws-sdk/client-ses";
import { z } from "zod";
const BRAND_PRIMARY = "#2baee3";
const BRAND_DARK = "#1f2b5c";
const TEXT_MUTED = "#6b7280";
const scheduleSchema = z.object({
    demoTitle: z.string().min(1),
    name: z.string().min(1),
    email: z.string().email(),
    phone: z.string().min(4),
    company: z.string().min(1),
    date: z.string().min(1),
    time: z.string().min(1),
});
const contactSchema = z.object({
    first_name: z.string().min(1),
    last_name: z.string().min(1),
    email: z.string().email(),
    phone_no: z.string().min(4),
    message: z.string().min(1),
});
const applyJobSchema = z.object({
    job_title: z.string().min(1),
    job_id: z.string().optional().default(""),
    department: z.string().optional().default(""),
    location: z.string().optional().default(""),
    first_name: z.string().min(1),
    last_name: z.string().min(1),
    email: z.string().email(),
    phone_no: z.string().optional().default(""),
    linkedin: z.string().optional().default(""),
    portfolio: z.string().optional().default(""),
    resume: z.string().optional().default(""),
    message: z.string().optional().default(""),
});
function getEnv(name) {
    const v = process.env[name];
    if (!v)
        throw new Error(`Missing environment variable ${name}`);
    return v;
}
function createSesClient() {
    const region = "ap-south-1";
    return new SESClient({ region });
}
async function sendEmail(params) {
    const Source = "noreply@mylapay.com";
    const DestinationEmail = "contactus@mylapay.com";
    const ses = createSesClient();
    const command = new SendEmailCommand({
        Source,
        Destination: { ToAddresses: [DestinationEmail] },
        ReplyToAddresses: params.replyTo ? [params.replyTo] : undefined,
        Message: {
            Subject: { Data: params.subject, Charset: "UTF-8" },
            Body: {
                Html: { Data: params.html, Charset: "UTF-8" },
                Text: { Data: params.text, Charset: "UTF-8" },
            },
        },
    });
    const res = await ses.send(command);
    return res.MessageId;
}
async function sendEmailcareer(params) {
    const Source = "noreply@mylapay.com";
    const DestinationEmail = "career@mylapay.com";
    const ses = createSesClient();
    const command = new SendEmailCommand({
        Source,
        Destination: { ToAddresses: [DestinationEmail] },
        ReplyToAddresses: params.replyTo ? [params.replyTo] : undefined,
        Message: {
            Subject: { Data: params.subject, Charset: "UTF-8" },
            Body: {
                Html: { Data: params.html, Charset: "UTF-8" },
                Text: { Data: params.text, Charset: "UTF-8" },
            },
        },
    });
    const res = await ses.send(command);
    return res.MessageId;
}
async function sendRawEmail(params) {
    const Source = "noreply@mylapay.com";
    const DestinationEmail = "career@mylapay.com";
    const ses = createSesClient();
    const boundaryMixed = `mixed_${Date.now()}_${Math.random().toString(16).slice(2)}`;
    const boundaryAlt = `alt_${Date.now()}_${Math.random().toString(16).slice(2)}`;
    const headers = [
        `From: ${Source}`,
        `To: ${DestinationEmail}`,
        `Subject: ${params.subject}`,
        `MIME-Version: 1.0`,
        `Content-Type: multipart/mixed; boundary="${boundaryMixed}"`,
        params.replyTo ? `Reply-To: ${params.replyTo}` : undefined,
    ]
        .filter(Boolean)
        .join("\r\n");
    const altPart = [
        `--${boundaryMixed}`,
        `Content-Type: multipart/alternative; boundary="${boundaryAlt}"`,
        "",
        `--${boundaryAlt}`,
        `Content-Type: text/plain; charset=UTF-8`,
        `Content-Transfer-Encoding: 7bit`,
        "",
        params.text,
        "",
        `--${boundaryAlt}`,
        `Content-Type: text/html; charset=UTF-8`,
        `Content-Transfer-Encoding: 7bit`,
        "",
        params.html,
        "",
        `--${boundaryAlt}--`,
    ].join("\r\n");
    let mixedBody = `${headers}\r\n\r\n${altPart}`;
    if (params.attachment) {
        const base64 = params.attachment.data
            .toString("base64")
            .replace(/.{76}/g, "$&\n");
        const attPart = [
            ``,
            `--${boundaryMixed}`,
            `Content-Type: ${params.attachment.contentType}; name="${params.attachment.filename}"`,
            `Content-Disposition: attachment; filename="${params.attachment.filename}"`,
            `Content-Transfer-Encoding: base64`,
            "",
            base64,
        ].join("\r\n");
        mixedBody += `\r\n${attPart}`;
    }
    mixedBody += `\r\n--${boundaryMixed}--`;
    const raw = new TextEncoder().encode(mixedBody);
    const res = await ses.send(new SendRawEmailCommand({
        RawMessage: { Data: raw },
        Source,
        Destinations: [DestinationEmail],
    }));
    return res.MessageId;
}
function escapeHtml(input) {
    return input
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
function fieldRow(label, value) {
    return `
    <tr>
      <td style="padding:8px 0;color:${TEXT_MUTED};font-size:12px;letter-spacing:.02em;text-transform:uppercase">${escapeHtml(label)}</td>
    </tr>
    <tr>
      <td style="padding:0 0 16px 0;font-size:16px;color:#111827;font-weight:600">${escapeHtml(value)}</td>
    </tr>
  `;
}
function rowsFromEntries(entries) {
    return entries
        .filter(([, v]) => typeof v === "string" && v.trim() !== "")
        .map(([l, v]) => fieldRow(l, v))
        .join("");
}
function renderEmail(opts) {
    const preheader = opts.intro.replace(/<[^>]+>/g, "").slice(0, 140);
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <meta name="x-apple-disable-message-reformatting" />
  <title>${escapeHtml(opts.title)}</title>
  <style>
    @media (prefers-color-scheme: dark) {
      .card { background:#0b1220 !important; }
      .title { color:#E5E7EB !important; }
      .muted { color:#9CA3AF !important; }
      .value { color:#F9FAFB !important; }
    }
  </style>
</head>
<body style="margin:0;background:#f5f7fb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent">${escapeHtml(preheader)}</div>
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#f5f7fb;padding:24px 0">
    <tr>
      <td align="center">
        <table role="presentation" cellpadding="0" cellspacing="0" width="640" class="card" style="background:#ffffff;border-radius:16px;box-shadow:0 10px 30px rgba(31,43,92,0.08);overflow:hidden">
          <tr>
            <td style="background:${BRAND_DARK};padding:20px 24px">
              <table width="100%" role="presentation">
                <tr>
                  <td style="color:#ffffff;font-weight:800;font-size:20px;letter-spacing:.3px">Mylapay</td>
                  <td align="right">
                    <span style="display:inline-block;padding:6px 10px;border-radius:999px;background:${BRAND_PRIMARY};color:#fff;font-size:12px;font-weight:700;">Notification</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 28px 10px 28px">
              <h1 class="title" style="margin:0 0 6px 0;font-size:24px;line-height:1.3;color:#111827">${escapeHtml(opts.title)}</h1>
              <p class="muted" style="margin:0;color:${TEXT_MUTED};font-size:14px;line-height:1.6">${opts.intro}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 28px 8px 28px">
              <hr style="border:none;height:1px;background:linear-gradient(90deg, ${BRAND_DARK}, ${BRAND_PRIMARY});opacity:.15" />
            </td>
          </tr>
          <tr>
            <td style="padding:0 28px 24px 28px">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                ${opts.fieldsHtml}
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:0 28px 28px 28px">
              <table role="presentation" width="100%">
                <tr>
                  <td>
                    <a href="mailto:${escapeHtml("contactus@mylapay.com")}" style="display:inline-block;background:${BRAND_PRIMARY};color:#ffffff;text-decoration:none;padding:12px 16px;border-radius:10px;font-weight:700;font-size:14px">Reply</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="background:#f8fafc;padding:18px 24px;color:${TEXT_MUTED};font-size:12px;line-height:1.6">
              ${opts.footerNote ? escapeHtml(opts.footerNote) : "This email was sent automatically by the website forms."}
            </td>
          </tr>
        </table>
        <div style="color:${TEXT_MUTED};font-size:12px;margin-top:12px">&copy; ${new Date().getFullYear()} Mylapay. All rights reserved.</div>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
export const handleScheduleDemo = async (req, res) => {
    try {
        const data = scheduleSchema.parse(req.body);
        const subject = `Schedule a Demo: ${data.demoTitle} — ${data.name} (${data.company})`;
        const fields = rowsFromEntries([
            ["Title", data.demoTitle],
            ["Name", data.name],
            ["Email", data.email],
            ["Phone", data.phone],
            ["Company", data.company],
            ["Date", data.date],
            ["Time", data.time],
        ]);
        const html = renderEmail({
            title: "Schedule a Demo Request",
            intro: `A new demo request was submitted.`,
            fieldsHtml: fields,
            footerNote: "Please respond to coordinate the demo schedule.",
        });
        const text = `Schedule a Demo Request\nTitle: ${data.demoTitle}\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nCompany: ${data.company}\nDate: ${data.date}\nTime: ${data.time}`;
        const messageId = await sendEmail({
            subject,
            html,
            text,
            replyTo: data.email,
        });
        res.json({ ok: true, messageId });
    }
    catch (err) {
        const message = err?.message || "Failed to send email";
        res.status(500).json({ ok: false, error: message });
    }
};
export const handleContactUs = async (req, res) => {
    try {
        const data = contactSchema.parse(req.body);
        const subject = `Contact Us: ${data.first_name} ${data.last_name}`;
        const fields = rowsFromEntries([
            ["First Name", data.first_name],
            ["Last Name", data.last_name],
            ["Email", data.email],
            ["Phone", data.phone_no],
            ["Message", data.message],
        ]);
        const html = renderEmail({
            title: "Contact Us Submission",
            intro: `You received a new inquiry via the website contact form.`,
            fieldsHtml: fields,
            footerNote: "Reply directly to the sender to continue the conversation.",
        });
        const text = `Contact Us Submission\nFirst Name: ${data.first_name}\nLast Name: ${data.last_name}\nEmail: ${data.email}\nPhone: ${data.phone_no}\nMessage: ${data.message}`;
        const messageId = await sendEmail({
            subject,
            html,
            text,
            replyTo: data.email,
        });
        res.json({ ok: true, messageId });
    }
    catch (err) {
        const message = err?.message || "Failed to send email";
        res.status(500).json({ ok: false, error: message });
    }
};
export const handleApplyJob = async (req, res) => {
    try {
        const data = applyJobSchema.parse(req.body);
        const subject = `Job Application: ${data.job_title} — ${data.first_name} ${data.last_name}`;
        const fields = rowsFromEntries([
            ["Job Title", data.job_title],
            ["Job ID", data.job_id],
            ["Department", data.department],
            ["Location", data.location],
            ["First Name", data.first_name],
            ["Last Name", data.last_name],
            ["Email", data.email],
            ["Phone", data.phone_no],
            ["LinkedIn", data.linkedin],
            ["Portfolio", data.portfolio],
            ["Resume URL", data.resume],
            ["Message", data.message],
        ]);
        const html = renderEmail({
            title: "New Job Application",
            intro: `A new job application was submitted via the careers page.`,
            fieldsHtml: fields,
            footerNote: "Use the links above to view the candidate's profile and resume.",
        });
        const text = `Job Application\nJob Title: ${data.job_title}\nJob ID: ${data.job_id}\nDepartment: ${data.department}\nLocation: ${data.location}\nFirst Name: ${data.first_name}\nLast Name: ${data.last_name}\nEmail: ${data.email}\nPhone: ${data.phone_no}\nLinkedIn: ${data.linkedin}\nPortfolio: ${data.portfolio}\nResume URL: ${data.resume}\nMessage: ${data.message}`;
        const file = req.file;
        if (file) {
            const allowed = ["application/pdf", "application/msword"];
            if (!allowed.includes(file.mimetype)) {
                return res
                    .status(400)
                    .json({
                    ok: false,
                    error: "Unsupported file type. Only PDF and DOC are allowed.",
                });
            }
            const attachment = {
                filename: file.originalname,
                contentType: file.mimetype,
                data: file.buffer,
            };
            const messageId = await sendRawEmail({
                subject,
                html,
                text,
                replyTo: data.email,
                attachment,
            });
            return res.json({ ok: true, messageId });
        }
        // const messageId = await sendEmailcareer({
        //   subject,
        //   html,
        //   text,
        //   replyTo: data.email,
        // });
        // res.json({ ok: true, messageId });
    }
    catch (err) {
        const message = err?.message || "Failed to send email";
        res.status(500).json({ ok: false, error: message });
    }
};
