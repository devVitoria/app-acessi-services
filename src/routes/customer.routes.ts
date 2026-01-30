import { Elysia } from "elysia";
import { basePlugin } from "../plugins/base.plugin";
import { CustomerService } from "../services/customer.services";
import {
  ResetPasswordTypes,
  SenCodeTypes,
  VerifyCodeTypes,
} from "../utils/customer/types";

const customerService = new CustomerService();
export const customerRoutes = new Elysia({ prefix: "/customer" })
  .use(basePlugin)
  .post(
    "/send-code",
    ({ db, body }) => {
      return customerService.sendCode(body, db);
    },
    {
      body: SenCodeTypes,
    },
  )
  .post(
    "/verify-code",
    ({ db, body }) => {
      return customerService.verifyCode(body, db);
    },
    {
      body: VerifyCodeTypes,
    },
  )
  .post(
    "/reset-password",
    ({ db, body }) => {
      return customerService.resetPassword(body, db);
    },
    {
      body: ResetPasswordTypes,
    },
  );
