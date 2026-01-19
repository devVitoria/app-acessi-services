import { eq } from "drizzle-orm";
import { usersTable } from "../db/schema";
import {
	ResetPasswordInterface,
	SendCodeInterface,
	VerifyCodeInterface,
} from "../utils/interface";
import { sendMail } from "./mail.services";

export class CustomerService {
	private users = usersTable;

	async sendCode(data: SendCodeInterface, db: any) {
		try {
			const channel = await db
				.select({
					email: this.users.email,
					name: this.users.name,
				})
				.from(this.users)
				.where(eq(this.users.cpf, data.cpf));
			if (channel.length === 0) {
				throw new Error("Canal não encontrado");
			}

			const code = Math.floor(1000 + Math.random() * 9000);

			await db
				.update(this.users)
				.set({ emailCode: code })
				.where(eq(this.users.cpf, data.cpf));

			await sendMail({
				code: code,
				name: channel[0].name,
				email: channel[0].email,
			});

			return {
				message: `Código enviado ao canal de recuperação`,
				receiver: channel[0].email,
			};
		} catch (e) {
			throw new Error(`Erro ao enviar código de recuperação ${e ?? ""}`);
		}
	}

	async verifyCode(data: VerifyCodeInterface, db: any) {
		try {
			const code = await db
				.select({
					emailCode: this.users.emailCode,
				})
				.from(this.users)
				.where(eq(this.users.cpf, data.cpf));

			if (code.length === 0) {
				throw new Error("Código não encontrado");
			}

			if (String(code[0].emailCode) !== String(data.code)) {
				return {
					status: "unauthorized",
					message: "Código não corresponde.",
				};
			}

			await db
				.update(this.users)
				.set({ emailCode: null, validated: true })
				.where(eq(this.users.cpf, data.cpf));

			return {
				status: "authorized",
				message: `Autorizado`,
			};
		} catch (e) {
			throw new Error(`Erro ao verificar código de recuperação ${e ?? ""}`);
		}
	}

	async resetPassword(data: ResetPasswordInterface, db: any) {
		try {
			const user = await db
				.select()
				.from(this.users)
				.where(eq(this.users.cpf, data.cpf));

			if (user.length === 0) {
				throw new Error("Usuário nao encontrado");
			}

			await db
				.update(this.users)
				.set({ password: data.newPsd })
				.where(eq(this.users.cpf, data.cpf));

			return {
				status: "success",
				message: `Senha resetada com sucesso!`,
			};
		} catch (e) {
			throw new Error(`Erro ao atualizar senha ${e ?? ""}`);
		}
	}
}
