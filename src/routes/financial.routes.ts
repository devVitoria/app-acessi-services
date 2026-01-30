import { Elysia } from "elysia";
import { basePlugin } from "../plugins/base.plugin";
import { jwtPlugin } from "../plugins/jwt.plugin";
import { FinancialService } from "../services/financial.services";
import {
  FinanceChatQueryTypes,
  FinanceChatTypes,
} from "../utils/financial/types";

const financialService = new FinancialService();
export const financialRoutes = new Elysia({ prefix: "/financial" })
  .use(basePlugin)
  .use(jwtPlugin)
  .post(
    "/finance-chat",
    ({ db, body }) => {
      return financialService.financeChat(body, db);
    },
    {
      body: FinanceChatTypes,
    },
  )
  .get(
    "/finance-chat",
    ({ db, query }) => {
      return financialService.getAllChats(query, db);
    },
    {
      query: FinanceChatQueryTypes,
    },
  );
