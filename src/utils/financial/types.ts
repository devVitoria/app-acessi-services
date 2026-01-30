import { t } from "elysia";

export const FinanceChatTypes = t.Object({
  value: t.Number({
    minimum: 0,
    maximum: 1000000,
  }),
  reason: t.String(),
  category: t.Number({
    minimum: 0,
    maximum: 1000000,
  }),
  cpf: t.String({
    minLength: 11,
    maxLength: 11,
  }),
});

export const FinanceChatQueryTypes = t.Object({
  cpf: t.String({
    minLength: 11,
    maxLength: 11,
  }),
});
