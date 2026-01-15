import { eq } from "drizzle-orm";
import { usersTable } from "../db/schema";
import { SendCodeInterface } from "../utils/interface";
import { sendMail } from "./mail.services";

export class CustomerService {
	private users = usersTable;

	async sendCode(data: SendCodeInterface, db: any) {
		try {
			const chanel = await db
				.select({
					email: this.users.email,
					name: this.users.name,
				})
				.from(this.users)
				.where(eq(this.users.cpf, data.cpf));

				if (chanel.length === 0) {
				throw new Error("Canal não encontrado");
			}

			const code = Math.floor(1000 + Math.random() * 9000);

			await db
				.update(this.users)
				.set({ emailCode: code })
				.where(eq(this.users.cpf, data.cpf));

		
			const code_sent = await sendMail({
				code: code,
				name: chanel[0].name,
				email: chanel[0].email,
			});


			return {
				message: `Código enviado ao canal de recuperação`,
				id: code_sent
			};
		} catch (e) {
			throw new Error(
				"Erro ao enviar código de recuperação de senha,",
				e ?? "",
			);
		}
	}
}
