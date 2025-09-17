import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { UserMapper } from './user.mapper';
import { ConfigService } from '@nestjs/config';
import { async } from 'rxjs';

@Injectable()
export class UserService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userRepository: UserRepository,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepository.findByUsername(createUserDto.username);

    if (existingUser) {
      throw new ConflictException('User with this username already exists');
    }

    const apiKey = uuidv4();
    const tokenSecret = randomBytes(32).toString('hex');

    const jwtSecret = this.configService.get<string>('security.jwtSecret');
    if (!jwtSecret) throw new BadRequestException();
    const passwordHash = await bcrypt.hash(jwtSecret, 10);

    const entity = UserMapper.fromCreateDto(createUserDto, passwordHash, apiKey, tokenSecret);

    await this.userRepository.save(entity);
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
