import { Elysia } from "elysia";
import { basePlugin } from "../plugins/base.plugin";
import { jwtPlugin } from "../plugins/jwt.plugin";
import { AuthService } from "../services/auth.services";
import { loginTypes, registerTypes, verifyToken } from "../utils/auth/types";
import { JwtPayloadInterface, UserJwtPayload } from "../utils/interface";

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
      body: registerTypes,
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
      body: loginTypes,
    },
  )
  .post(
    "/verify-token",
    ({ db, body, jwt }) => {
      return authservice.verifyToken(
        body,
        db,
        jwt as unknown as JwtPayloadInterface<UserJwtPayload>,
      );
    },
    {
      body: verifyToken,
    },
  );
