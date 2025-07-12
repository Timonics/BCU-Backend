import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { UserTokenPayload } from "src/types/access-token.type";

export const GetUser = createParamDecorator(
  <K extends keyof UserTokenPayload>(
    key: K | undefined,
    ctx: ExecutionContext
  ): UserTokenPayload | UserTokenPayload[K] => {
    const request = ctx.switchToHttp().getRequest();
    const user: UserTokenPayload = request.user;

    if (!user) {
      throw new Error("User not found in request");
    }

    return key ? user[key] : user;
  }
);
