import { FileEntity } from '../entities/file.entity';

export class FileResponseDto {
  id: number;
  name: string;
  hashId: string;
  size: number;
  type: string;
  constructor(entity: FileEntity) {
    this.id = entity.id;
    this.name = entity.originalName;
    this.hashId = entity.hashId;
    this.size = entity.size;
    this.type = entity.mimetype;
  }
}
