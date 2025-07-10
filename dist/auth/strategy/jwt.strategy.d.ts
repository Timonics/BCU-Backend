import { Strategy } from "passport-jwt";
import { AccessTokenPayload } from "src/types/access-token.type";
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(payload: AccessTokenPayload): Promise<AccessTokenPayload>;
}
export {};
