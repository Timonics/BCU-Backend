import { CallHandler, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
export declare class ResponseInterceptor implements NestInterceptor {
    intercept(_: any, next: CallHandler<any>): Observable<any> | Promise<Observable<any>>;
}
