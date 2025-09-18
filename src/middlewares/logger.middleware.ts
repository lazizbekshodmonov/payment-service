import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggerMiddleware.name);
  private readonly logFilePath = path.join(process.cwd(), 'logs', 'app.log');

  constructor() {
    if (!fs.existsSync(path.dirname(this.logFilePath))) {
      fs.mkdirSync(path.dirname(this.logFilePath), { recursive: true });
    }
  }

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, body } = req as any;

    const start = Date.now();

    const oldSend = res.send;
    let responseBody: any;

    (res as any).send = function (data) {
      responseBody = data;
      return oldSend.apply(res, arguments as any);
    };

    res.on('finish', () => {
      const { statusCode } = res;
      const delay = Date.now() - start;
      const user = res.locals.user ?? null;

      const details = {
        user: user,
        requestBody: body,
        responseBody: this.tryParseJson(responseBody),
      };
      const shortMessage = `${method} - ${statusCode} ${originalUrl} - ${delay}ms`;

      if (statusCode >= 500) {
        this.logger.error(shortMessage + ' ' + JSON.stringify(details));
      } else if (statusCode >= 400) {
        this.logger.warn(shortMessage + ' ' + JSON.stringify(details));
      } else {
        this.logger.log(shortMessage + ' ' + JSON.stringify(details));
      }
      const logObject = {
        timestamp: new Date().toISOString(),
        level: statusCode >= 500 ? 'error' : statusCode >= 400 ? 'warn' : 'log',
        context: 'HTTP',
        method,
        url: originalUrl,
        statusCode,
        delay: `${delay}ms`,
        ...details,
      };

      fs.appendFileSync(this.logFilePath, JSON.stringify(logObject) + '\n');
    });

    next();
  }

  private tryParseJson(data: any) {
    try {
      return typeof data === 'string' ? JSON.parse(data) : data;
    } catch {
      return data;
    }
  }
}
