import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { InternalError } from 'src/core/common/errors';

@Catch()
export class InternalExceptionsFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    if (!(exception instanceof InternalError)) {
      super.catch(exception, host);
    } else {
      const statuses = { ValidationError: HttpStatus.CONFLICT };

      const httpStatus = statuses[exception.name];
      const error = new HttpException(exception.message, httpStatus);
      super.catch(error, host);
    }
  }
}
