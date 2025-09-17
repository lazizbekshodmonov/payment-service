import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import Hashids from 'hashids';
import { ConfigService } from '@nestjs/config';
import { File } from './entities/file.entity';

@Injectable()
export class FileRepository extends Repository<File> {
  constructor(
    private configService: ConfigService,
    private dataSource: DataSource,
  ) {
    super(File, dataSource.createEntityManager());
  }
  findByOriginalNameAndSize(originalName: string, size: number): Promise<File | null> {
    return this.findOne({ where: { originalName, size } });
  }

  findById(id: number): Promise<File | null> {
    return this.findOne({ where: { id } });
  }

  findByHashId(hashId: string): Promise<File | null> {
    return this.findOne({ where: { hashId } });
  }
  createFile(filename: string, path: string, originalName: string, mimetype: string, size: number): Promise<File> {
    const hashSalt: string = this.configService.get<string>('hash.file_salt') as string;
    const hashGenerator = new Hashids(hashSalt, 10);
    const hashId: string = hashGenerator.encode(Date.now(), Math.floor(Math.random() * 1000));

    const entity = new File();
    entity.filename = filename;
    entity.hashId = hashId;
    entity.path = path;
    entity.size = size;
    entity.originalName = originalName;
    entity.mimetype = mimetype;

    return this.save(entity);
  }
}
