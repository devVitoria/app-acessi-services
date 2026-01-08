import { Elysia, t } from "elysia";
import { AuthService } from "../services/auth.services";
import { basePlugin } from "../db/base.plugin";


const authservice = new AuthService();
export const authRoutes = new Elysia({ prefix: "/auth" }).use(basePlugin).post(
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
