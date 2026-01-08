import { Elysia, t } from "elysia";
import { AuthService } from "../services/auth.services";


const authservice = new AuthService();
// TODO preciso remover o db null ali posteriormente, coloquei só pra evitar erro de tipagem por agr
export const authRoutes = new Elysia({ prefix: "/auth" }).decorate("db", null).post(
  "/register",
  ({ db, body}) => {
    return authservice.register(body, db);
  },
  {
    body: t.Object({
      name: t.String({
        minLength: 2,
        maxLength: 100,
      }), 
      email: t.String({
        format: "email",
        error: "Email inválido",  
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
