import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

export class UserMapper {
  static fromCreateDto(dto: CreateUserDto, passwordHash?: string, apiKey?: string, tokenSecret?: string): UserEntity {
    const user = new UserEntity();
    user.name = dto.name;
    user.username = dto.username;
    user.type = dto.type ?? 'SERVICE';
    user.passwordHash = passwordHash ?? null;
    user.apiKey = apiKey ?? null;
    user.isActive = dto.isActive;
    return user;
  }
}
