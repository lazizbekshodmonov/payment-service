import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import Hashids from 'hashids';
import { ConfigService } from '@nestjs/config';
import { FileEntity } from './entities/file.entity';

@Injectable()
export class FileRepository extends Repository<FileEntity> {
  constructor(
    private configService: ConfigService,
    private dataSource: DataSource,
  ) {
    super(FileEntity, dataSource.createEntityManager());
  }
  findByOriginalNameAndSize(originalName: string, size: number): Promise<FileEntity | null> {
    return this.findOne({ where: { originalName, size } });
  }

  findById(id: number): Promise<FileEntity | null> {
    return this.findOne({ where: { id } });
  }

  findByHashId(hashId: string): Promise<FileEntity | null> {
    return this.findOne({ where: { hashId } });
  }
  createFile(filename: string, path: string, originalName: string, mimetype: string, size: number): Promise<FileEntity> {
    const hashSalt: string = this.configService.get<string>('hash.file_salt') as string;
    const hashGenerator = new Hashids(hashSalt, 10);
    const hashId: string = hashGenerator.encode(Date.now(), Math.floor(Math.random() * 1000));

    const entity = new FileEntity();
    entity.filename = filename;
    entity.hashId = hashId;
    entity.path = path;
    entity.size = size;
    entity.originalName = originalName;
    entity.mimetype = mimetype;

    return this.save(entity);
  }
}
