import { LoggerService, Injectable } from '@nestjs/common';

@Injectable()
export class JsonLoggerService implements LoggerService {
  log(message: any, context?: string) {
    this.write('info', message, context);
  }

  error(message: any, trace?: string, context?: string) {
    this.write('error', message, context, trace);
  }

  warn(message: any, context?: string) {
    this.write('warn', message, context);
  }

  private write(level: string, message: any, context?: string, trace?: string) {
    const log = {
      timestamp: new Date().toISOString(),
      level,
      context,
      message: typeof message === 'string' ? message : JSON.stringify(message),
      trace,
    };
    console.log(JSON.stringify(log));
  }
}
