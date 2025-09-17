import { Controller, Get, HttpCode, Post, Query, StreamableFile, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Express } from 'express';

@Controller()
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @HttpCode(200)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return await this.fileService.uploadFile(file);
  }

  @HttpCode(200)
  @Get('download')
  downloadFile(@Query('hashId') hashId: string): Promise<StreamableFile | null> {
    return this.fileService.downloadFile(hashId);
  }
}
