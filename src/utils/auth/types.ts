import { t } from "elysia";

export const loginTypes = t.Object({
  cpf: t.String({
    minLength: 11,
    maxLength: 11,
    error: "CPF inválido",
  }),
  password: t.String({
    minLength: 6,
    maxLength: 6,
  }),
});

export const registerTypes = t.Object({
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
});

export const verifyToken = t.Object({
  token: t.String(),
});
