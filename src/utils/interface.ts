export interface LoginInterface {
	cpf: string;
	password: string;
}

export interface RegisterInterface extends LoginInterface {
	name: string;
	email: string;
}

export interface JwtPayloadInterface {
	sign(
		signValue: Omit<ClaimType, NormalizedClaim> & JWTPayloadInput,
	): Promise<string>;
	verify(
		jwt?: string,
		options?: JWTVerifyOptions,
	): Promise<false | (ClaimType & Omit<JWTPayloadSpec, never>)>;
}
