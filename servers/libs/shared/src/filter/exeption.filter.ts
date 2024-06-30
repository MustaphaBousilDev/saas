import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { LoggerService } from 'apps/auth/src/infra/logger/logger.service';

interface IError {
  message: string;
  code_error: string;
}

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? (exception.getResponse() as IError)
        : { message: (exception as Error).message, code_error: null };

    const responseData = {
      ...{
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
      },
      ...message,
    };
    this.logMessage(request, message, status, exception);
    response.status(status).json(responseData);
  }

  private logMessage(
    request: any,
    message: IError,
    status: number,
    exception: any,
  ) {
    const logLevel =
      status === HttpStatus.INTERNAL_SERVER_ERROR ? 'error' : 'warn';
    const logMessage = `End Request for ${request.path}, method=${request.method} status=${status} code_error=${message.code_error ?? 'null'} message=${message.message ?? 'null'}`;

    if (logLevel === 'error') {
      this.logger.error(logMessage, exception.stack);
    } else {
      this.logger.warn('Warning', logMessage);
    }
  }
}
