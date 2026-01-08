import { eq } from "drizzle-orm";
import { usersTable } from "../db/schema";

export class AuthService {
  private users = usersTable;
  
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

  async register(
    data: { email?: any; cpf: string; name: string; password: string },
    db: any
  ) {

    const validation = await this.existingUser(data.cpf, db);
    
    if (validation) {
      throw new Error("Usuário já existe.");
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
}
