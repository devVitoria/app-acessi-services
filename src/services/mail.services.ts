import { SendEmailCodeInterface } from "../utils/interface";

export async function sendMail(data: SendEmailCodeInterface) {
	try {
		const response = await fetch("https://api.brevo.com/v3/smtp/email", {
			method: "POST",
			headers: {
				accept: "application/json",
				"content-type": "application/json",
				"api-key": process.env.BREVO_API_KEY!,
			},
			body: JSON.stringify({
				sender: {
					email: process.env.MAIL_SENDER,
					name: process.env.NAME_SENDER,
				},
				to: [
					{
						email: data.email,
						name: data.name,
					},
				],
				subject: "Código de verificação",
				htmlContent: `
        <html>
          <body style="font-family: Arial, sans-serif; background-color:#fefce8; padding:24px;">
            <h1>Código de verificação</h1>
            <p>Olá, ${data.name}. Seu código de verificação chegou.</p>
            <div style="background-color:#a16207; border-radius:6px; padding:16px; text-align:center; margin:24px 0;">
              <span style="color:#ffffff; font-size:32px; font-weight:bold;">
                ${data.code}
              </span>
            </div>
            <p style="font-size:14px; color:#555;">
              Caso não tenha solicitado este código, desconsidere este e-mail.
            </p>
          </body>
        </html>
      `,
			}),
		});

		if (!response.ok) {
			const error = await response.text();
			throw new Error(`Brevo error: ${error}`);
		}

		return response.json();
	} catch (e) {
		throw new Error("Erro BREVO API", e ?? "");
	}
}
