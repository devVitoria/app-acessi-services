import type { db } from "../db";

declare module "elysia" {
	interface Context {
		db: typeof db;
		jwt: {
			sign(
				signValue: Omit<ClaimType, NormalizedClaim> & JWTPayloadInput,
			): Promise<string>;
			verify(
				jwt?: string,
				options?: JWTVerifyOptions,
			): Promise<false | (ClaimType & Omit<JWTPayloadSpec, never>)>;
		};
	}
}
