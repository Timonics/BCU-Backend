import { UserTokenPayload } from "src/types/access-token.type";
export declare const GetUser: <K extends keyof UserTokenPayload>(...dataOrPipes: (import("@nestjs/common").PipeTransform<any, any> | import("@nestjs/common").Type<import("@nestjs/common").PipeTransform<any, any>> | K | undefined)[]) => ParameterDecorator;
