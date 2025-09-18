import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseUserDto } from './dto/response-user.dto';

export class UserMapper {
  static fromCreateDto(dto: CreateUserDto, passwordHash?: string, apiKey?: string): UserEntity {
    const user = new UserEntity();
    user.name = dto.name;
    user.username = dto.username;
    user.type = dto.type ?? 'SERVICE';
    user.passwordHash = passwordHash ?? null;
    user.apiKey = apiKey ?? null;
    user.isActive = dto.isActive;
    return user;
  }
  static fromUpdateDto(dto: UpdateUserDto, entity: UserEntity): UserEntity {
    const user = new UserEntity();
    user.name = dto.name ?? entity.name;
    user.username = dto.username ?? entity.username;
    user.passwordHash = dto.password ?? entity.passwordHash;
    user.isActive = dto.isActive ?? entity.isActive;
    return user;
  }
}
