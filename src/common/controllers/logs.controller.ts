import { Controller, Get, Query } from '@nestjs/common';
import * as fs from 'fs';
import * as readline from 'readline';
import * as path from 'path';

@Controller('logs')
export class LogsController {
  private readonly logFile = path.join(process.cwd(), 'logs', 'app.log');

  @Get()
  async getLogs(@Query('page') page = 1, @Query('limit') limit = 10) {
    const lines: string[] = [];

    const rl = readline.createInterface({
      input: fs.createReadStream(this.logFile),
      crlfDelay: Infinity,
    });

    for await (const line of rl) {
      if (line.trim()) {
        try {
          lines.push(JSON.parse(line));
        } catch {
          // agar JSON bo‘lmasa, tashlab yuboriladi
        }
      }
    }

    // eng oxirgi loglar yuqorida ko‘rinsin
    const reversed = lines.reverse();

    const start = (page - 1) * limit;
    const end = start + limit;

    return {
      page: +page,
      limit: +limit,
      total: reversed.length,
      data: reversed.slice(start, end),
    };
  }
}
