import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const body = await req.json();

    await resend.emails.send({
      from: "Website Enquiry <onboarding@resend.dev>",
      to: ["info@legacyimprint.co.uk"],
      reply_to: body.email,
      subject: `New Website Enquiry from ${body.name}`,
      text: `
Name: ${body.name}
Email: ${body.email}
Company: ${body.company || "N/A"}

Message:
${body.message}
      `,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ success: false }), { status: 500 });
  }
}
