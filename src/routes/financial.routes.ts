import { Elysia, t } from "elysia";
import { basePlugin } from "../plugins/base.plugin";
import { jwtPlugin } from "../plugins/jwt.plugin";
import { FinancialService } from "../services/financial.services";

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
			body: t.Object({
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
			}),
		},
	)
	.get(
		"/finance-chat",
		({ db, body }) => {
			return financialService.getAllChats(body, db);
		},
		{
			body: t.Object({
				cpf: t.String({
					minLength: 11,
					maxLength: 11,
				}),
			}),
		},
	);
