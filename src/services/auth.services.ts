import { eq } from "drizzle-orm";
import { tokensTable, usersTable } from "../db/schema";
import {
  JwtPayloadInterface,
  LoginInterface,
  RegisterInterface,
} from "../utils/interface";

export class AuthService {
  private users = usersTable;
  private tokens = tokensTable;

  async existingUser(cpf: string, db: any) {
    const user = await db
      .select()
      .from(this.users)
      .where(eq(this.users.cpf, cpf))
      .limit(1);

    if (user.length > 0) {
      return true;
    }
    return false;
  }

  async register(data: RegisterInterface, db: any) {
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
  }

  async login(data: LoginInterface, db: any, jwt: JwtPayloadInterface) {
    const validation = this.existingUser(data.cpf, db);

    if (!validation) {
      throw new Error("Usuário não encontrado.");
    }

    const user = await db
      .select()
      .from(this.users)
      .where(
        eq(this.users.cpf, data.cpf),
        eq(this.users.password, data.password)
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

    const tokenExists = await db
      .select()
      .from(this.tokens)
      .where(eq(this.tokens.userId, user[0].id));

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
  }
}
