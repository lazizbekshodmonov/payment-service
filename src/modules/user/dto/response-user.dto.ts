import { UserType } from '../user.enum';
import { UserEntity } from '../entities/user.entity';

export class ResponseUserDto {
  id: number;
  name: string;
  type: UserType;
  username?: string | null;
  apiKey?: string | null;
  isActive: boolean;

  constructor(user: UserEntity) {
    this.id = user.id;
    this.name = user.name;
    this.type = user.type;
    this.username = user.username;
    this.apiKey = user.apiKey;
    this.isActive = user.isActive;
  }
}
