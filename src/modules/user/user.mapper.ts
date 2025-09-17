import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

export class UserMapper {
  static fromCreateDto(dto: CreateUserDto, passwordHash?: string, apiKey?: string, tokenSecret?: string): User {
    const user = new User();
    user.name = dto.name;
    user.username = dto.username;
    user.type = dto.type ?? 'SERVICE';
    user.passwordHash = passwordHash ?? null;
    user.apiKey = apiKey ?? null;
    user.tokenSecret = tokenSecret ?? null;
    user.isActive = dto.isActive;
    return user;
  }
}
