export class AuthService {
  existingUser(param: { email: string; cpf: string }) {
    if (param.email === "" || param.cpf === "") {
      return false;
    }
    return true;
  }
  register(data: { email?: any; cpf: string; name: string; password: string }) {
    const validation = this.existingUser({ email: data.email, cpf: data.cpf });
    if (!validation) {
      throw new Error("Dados inválidos.");
    }

    return {
      message: "Registrado com sucesso.",
      user: { name: data.name },
    };
  }
}
