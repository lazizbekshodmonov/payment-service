import { BadRequestException, Injectable, InternalServerErrorException, StreamableFile } from '@nestjs/common';
import { join } from 'path';
import * as fs from 'node:fs';
import { ConfigService } from '@nestjs/config';
import { FileEntity } from './entities/file.entity';
import { FileRepository } from './file.repository';
import { FileResponseDto } from './dto/file.dto';

@Injectable()
export class FileService {
  constructor(
    private readonly fileRepository: FileRepository,
    private configService: ConfigService,
  ) {}

  async uploadFile(file: Express.Multer.File) {
    try {
      if (!file) {
        throw new BadRequestException();
      }

      const existingFile = await this.fileRepository.findByOriginalNameAndSize(file.originalname, file.size);

      if (existingFile) {
        const fileResponse = new FileResponseDto();
        fileResponse.name = existingFile.originalName;
        fileResponse.hashId = existingFile.hashId;
        fileResponse.size = existingFile.size;
        fileResponse.type = existingFile.mimetype;

        return fileResponse;
      }

      const cleanedName = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '_');

      const configUploadPath = this.configService.get<string>('file.upload_path') as string;

      if (!fs.existsSync(configUploadPath)) {
        fs.mkdirSync(configUploadPath, { recursive: true });
      }

      const path = join(configUploadPath, cleanedName);

      fs.writeFileSync(path, file.buffer);

      const fileInfo = await this.fileRepository.createFile(cleanedName, path, file.originalname, file.mimetype, file.size);
      const fileResponse = new FileResponseDto();
      fileResponse.name = fileInfo.originalName;
      fileResponse.hashId = fileInfo.hashId;
      fileResponse.size = fileInfo.size;
      fileResponse.type = fileInfo.mimetype;

      return fileResponse;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async downloadFile(hashId: string): Promise<StreamableFile | null> {
    try {
      const file = await this.findByHashId(hashId);

      const filePath = join(process.cwd(), file.path);
      const fileStream = fs.createReadStream(filePath);

      return new StreamableFile(fileStream, {
        disposition: `attachment; filename="${file.originalName}"`,
        type: file.mimetype,
        length: file.size,
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
  async findByHashId(hashId: string): Promise<FileEntity> {
    try {
      const file = await this.fileRepository.findByHashId(hashId);
      if (!file) {
        throw new BadRequestException();
      }
      return file;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
