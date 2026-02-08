import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { name, email, company, message } = await req.json();

    /* ===========================
       1. EMAIL TO YOU (BRANDED)
    ============================ */
    await resend.emails.send({
      from: "Legacy Imprint Website <info@legacyimprint.co.uk>",
      to: ["info@legacyimprint.co.uk"],
      reply_to: email,
      subject: `New Quote Enquiry from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; background:#f7f8fa; padding:24px;">
          <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:12px; padding:24px;">
            
            <img 
              src="https://legacyimprint.co.uk/raya-logo.png"
              alt="Legacy Imprint"
              style="height:40px; margin-bottom:20px;"
            />

            <h2 style="color:#111827; margin-bottom:16px;">
              New Website Enquiry
            </h2>

            <p style="color:#374151; font-size:14px;">
              You’ve received a new quote enquiry from your website.
            </p>

            <hr style="margin:20px 0;" />

            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Company:</strong> ${company || "N/A"}</p>

            <p style="margin-top:16px;"><strong>Message:</strong></p>
            <p style="white-space:pre-line; color:#374151;">
              ${message}
            </p>

            <hr style="margin:24px 0;" />

            <p style="font-size:12px; color:#6b7280;">
              This enquiry was sent from the Legacy Imprint website.
            </p>
          </div>
        </div>
      `,
    });

    /* ===========================
       2. AUTO-REPLY TO CUSTOMER
    ============================ */
    await resend.emails.send({
      from: "Legacy Imprint <info@legacyimprint.co.uk>",
      to: [email],
      subject: "Thanks for contacting Legacy Imprint",
      html: `
        <div style="font-family: Arial, sans-serif; background:#f7f8fa; padding:24px;">
          <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:12px; padding:24px;">
            
            <img 
              src="https://legacyimprint.co.uk/logo.png"
              alt="Legacy Imprint"
              style="height:40px; margin-bottom:20px;"
            />

            <h2 style="color:#111827; margin-bottom:16px;">
              Thanks for getting in touch, ${name}
            </h2>

            <p style="color:#374151; font-size:14px;">
              We’ve received your enquiry and one of our team members will review
              your requirements shortly.
            </p>

            <p style="color:#374151; font-size:14px;">
              We usually respond within <strong>1 business day</strong>.
            </p>

            <p style="margin-top:24px; font-size:14px; color:#374151;">
              Kind regards,<br />
              <strong>Legacy Imprint SW Team</strong>
            </p>

            <hr style="margin:24px 0;" />

            <p style="font-size:12px; color:#6b7280;">
              Legacy Imprint · Branded Merchandise & Printing
            </p>
          </div>
        </div>
      `,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });

  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ success: false }), { status: 500 });
  }
}
