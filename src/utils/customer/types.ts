import { t } from "elysia";

export const SenCodeTypes = t.Object({
  cpf: t.String({
    minLength: 11,
    maxLength: 11,
    error: "CPF inválido",
  }),
});

export const VerifyCodeTypes = t.Object({
  code: t.String({
    minLength: 4,
    maxLength: 4,
  }),
  cpf: t.String({
    minLength: 11,
    maxLength: 11,
    error: "CPF inválido",
  }),
});

export const ResetPasswordTypes = t.Object({
  cpf: t.String({
    minLength: 11,
    maxLength: 11,
    error: "CPF inválido",
  }),
  newPsd: t.String({
    minLength: 6,
    maxLength: 6,
  }),
});
