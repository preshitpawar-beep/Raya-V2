import { Resend } from "resend";

export async function POST(req) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { email } = await req.json();
    if (!email) return new Response(JSON.stringify({ success: false }), { status: 400 });

    await resend.emails.send({
      from: "Legacy Imprint Website <info@legacyimprint.co.uk>",
      to: ["info@legacyimprint.co.uk"],
      reply_to: email,
      subject: "New guide sign-up / newsletter subscriber",
      html: `<p>New subscriber from the website:</p><p><strong>${email}</strong></p>`,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ success: false }), { status: 500 });
  }
}
