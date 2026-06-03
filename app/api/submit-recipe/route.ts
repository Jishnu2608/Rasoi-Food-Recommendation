import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    const resend = new Resend(resendApiKey);

    const body = await request.json();
    const { recipeName, ingredients, instructions, yourName, yourEmail } = body;

    if (!recipeName || !ingredients || !instructions || !yourName || !yourEmail) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const recipientEmail = process.env.RECIPE_SUBMISSION_EMAIL;
    if (!recipientEmail) {
      return NextResponse.json(
        { error: "Email configuration error" },
        { status: 500 }
      );
    }

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .container {
              background: #faf6f0;
              border-radius: 16px;
              padding: 32px;
              box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            }
            .header {
              text-align: center;
              margin-bottom: 32px;
              padding-bottom: 20px;
              border-bottom: 2px solid #c45c26;
            }
            .header h1 {
              color: #c45c26;
              margin: 0;
              font-size: 28px;
            }
            .section {
              margin-bottom: 24px;
            }
            .section h2 {
              color: #3d2914;
              font-size: 18px;
              margin: 0 0 12px 0;
            }
            .section p {
              margin: 0;
              color: #6b5344;
              white-space: pre-wrap;
            }
            .label {
              font-weight: 600;
              color: #3d2914;
            }
            .footer {
              margin-top: 32px;
              padding-top: 20px;
              border-top: 1px solid #e5d5c0;
              text-align: center;
              font-size: 14px;
              color: #6b5344;
            }
            .badge {
              display: inline-block;
              background: #c45c26;
              color: #fffdf9;
              padding: 4px 12px;
              border-radius: 20px;
              font-size: 12px;
              margin-bottom: 8px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <span class="badge">New Recipe Submission</span>
              <h1>🍛 Rasoi Recipe Submission</h1>
            </div>

            <div class="section">
              <h2>Recipe Details</h2>
              <p><span class="label">Recipe Name:</span> ${recipeName}</p>
            </div>

            <div class="section">
              <h2>Ingredients</h2>
              <p>${ingredients}</p>
            </div>

            <div class="section">
              <h2>Cooking Instructions</h2>
              <p>${instructions}</p>
            </div>

            <div class="section">
              <h2>Submitted By</h2>
              <p><span class="label">Name:</span> ${yourName}</p>
              <p><span class="label">Email:</span> ${yourEmail}</p>
            </div>

            <div class="footer">
              <p>This recipe was submitted via the Rasoi app contact form.</p>
              <p>Please review and consider adding it to the recipe catalog.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const { data, error } = await resend.emails.send({
      from: "Rasoi Recipe Submission <onboarding@resend.dev>",
      to: recipientEmail,
      subject: `New Recipe Submission: ${recipeName}`,
      html: emailHtml,
      replyTo: yourEmail,
    });

    if (error) {
      console.error("Email send error:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
