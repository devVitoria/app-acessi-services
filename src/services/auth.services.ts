import { eq } from "drizzle-orm";
import { tokensTable, usersTable } from "../db/schema";
import {
	JwtPayloadInterface,
	LoginInterface,
	RegisterInterface,
	UserJwtPayload,
} from "../utils/interface";

export class AuthService {
	private users = usersTable;
	private tokens = tokensTable;

	async existingUser(cpf: string, db: any) {
    try {
		const user = await db
			.select()
			.from(this.users)
			.where(eq(this.users.cpf, cpf))
			.limit(1);
      
		if (user.length > 0) {
			return true;
		}
		return false;
	} catch (e) {
			throw new Error("Erro ao verificar usuário", e ?? "");
  }

} 

	async register(data: RegisterInterface, db: any) {
    
		try {

			const validation = await this.existingUser(data.cpf, db);
 
      if (validation) {
				throw new Error("Usuário já cadastrado com esse CPF.");
			}


			await db.insert(usersTable).values({
				name: data.name,
				email: data.email,
				cpf: data.cpf,
				password: data.password,
			});


			return {
				message: `Registrado com sucesso. CPF: ${data.cpf}`,
			};
		} catch (e) {
			throw new Error("Erro ao registrar", e ?? "");
		}
	}

	async login(
		data: LoginInterface,
		db: any,
		jwt: JwtPayloadInterface<UserJwtPayload>,
	) {
		try {
			const validation = this.existingUser(data.cpf, db);

			if (!validation) {
				throw new Error("Usuário não encontrado.");
			}

			const user = await db
				.select()
				.from(this.users)
				.where(
					eq(this.users.cpf, data.cpf),
					eq(this.users.password, data.password),
				)
				.limit(1);

			if (user.length === 0) {
				throw new Error("CPF ou senha inválidos.");
			}

			const tkUser = await jwt.sign({
				userId: user[0].id,
				name: user[0].name,
				email: user[0].email,
				cpf: user[0].cpf,
			});

			await db
				.insert(this.tokens)
				.values({
					userId: user[0].id,
					token: tkUser,
				})
				.onConflictDoUpdate({
					target: this.tokens.userId,
					set: { token: tkUser },
				});

			return {
				message: `Logado`,
				token: tkUser,
			};
		} catch (e) {
			throw new Error("Erro ao logar", e ?? "");
		}
	}
}
