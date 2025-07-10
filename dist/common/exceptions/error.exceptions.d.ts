import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
export declare class ErrorException implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost): void;
}
