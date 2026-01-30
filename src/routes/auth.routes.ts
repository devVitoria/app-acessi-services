import { Elysia, t } from "elysia";
import { AuthService } from "../services/auth.services";
import { basePlugin } from "../plugins/base.plugin";
import { jwtPlugin } from "../plugins/jwt.plugin";
import { authRegisterReqValidator, JwtPayloadInterface, UserJwtPayload } from "../utils/interface";

const authservice = new AuthService();
export const authRoutes = new Elysia({ prefix: "/auth" })
	.use(basePlugin)
	.use(jwtPlugin)
	.post(
		"/register",
		({ db, body }) => {
			return authservice.register(body, db);
		},
		{
			body: authRegisterReqValidator,
		},
	)
	.post(
		"/login",
		({ db, body, jwt }) => {
			// TODO: corrigir futuramente, tipagem fixa do jwt
			return authservice.login(
				body,
				db,
				jwt as unknown as JwtPayloadInterface<UserJwtPayload>,
			);
		},
		{
			body: t.Object({
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
		},
	);
