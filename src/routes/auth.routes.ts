import { Elysia, t } from "elysia";
import { AuthService } from "../services/auth.services";


const authservice = new AuthService();
export const authRoutes = new Elysia({ prefix: "/auth" }).post(
  "/register",
  ({ body }) => {
    return authservice.register(body);
  },
  {
    body: t.Object({
      name: t.String({
        minLength: 2,
        maxLength: 100,
      }),
      email: t.String({
        format: "email",
      }),
      cpf: t.String({
        minLength: 11,
        maxLength: 11,
        error: "CPF inválido",
        
      }),
      password: t.String({
        minLength: 6,
        maxLength: 6,
      }),
    }),
  }
);
