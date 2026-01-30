import { Static, t } from "elysia";

export interface LoginInterface {
	cpf: string;
	password: string;
}

export interface RegisterInterface extends LoginInterface {
	name: string;
	email: string;
}

export interface JwtPayloadInterface<TPayload> {
	sign(payload: TPayload): Promise<string>;
	verify(jwt?: string): Promise<false | TPayload>;
}

export interface UserJwtPayload {
	userId: number;
	name: string;
	email: string;
	cpf: string;
	createdAt: string;
	validated: boolean;
}

export interface SendCodeInterface {
	cpf: string;
}

export interface SendEmailCodeInterface {
	code: number;
	email: string;
	name: string;
}

export interface VerifyCodeInterface {
	code: string;
	cpf: string;
}

export interface ResetPasswordInterface {
	cpf: string;
	newPsd: string;
}

export interface FinanceChatInterface {
	value: number;
	reason: string;
	category: number;
	cpf: string;
}

export interface GetAllFinanceChatsInterface {
	cpf: string;
}

export const authLoginReqValidator = t.Object({
				cpf: t.String({
					minLength: 11,
					maxLength: 11,
					error: "CPF inválido",
				}),
				password: t.String({
					minLength: 6,
					maxLength: 6,
				})})

export type AuthLoginReq = Static<typeof authLoginReqValidator>;

				
export const authRegisterReqValidator = t.Object({
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
			})