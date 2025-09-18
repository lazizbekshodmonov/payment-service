import { BadRequestException, ConflictException, ForbiddenException, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { UserMapper } from './user.mapper';
import { ConfigService } from '@nestjs/config';
import { ResponseUserDto } from './dto/response-user.dto';
import { UserRequestQueryDto } from './dto/user-request-query.dto';
import { PaginationResponseDto } from '../../common/dto/pagination-response.dto';
import { UserType } from './user.enum';

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

    const passwordHash = await bcrypt.hash(createUserDto.password, 10);

    let apiKey: string | undefined;

    if (createUserDto.type === UserType.SERVICE) {
      apiKey = uuidv4();
    }

    const entity = UserMapper.fromCreateDto(createUserDto, passwordHash, apiKey);

    await this.userRepository.save(entity);
  }

  async findAll(query: UserRequestQueryDto) {
    const [entity, total] = await this.userRepository.findOfPagination(query);

    const responseList = entity.map((entity) => new ResponseUserDto(entity));

    return new PaginationResponseDto(responseList, total, query);
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new BadRequestException(`User with id ${id} not found`);
    }

    return new ResponseUserDto(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new BadRequestException(`User with id ${id} not found`);
    }

    if (updateUserDto.username && updateUserDto.username !== user.username) {
      const existingUser = await this.userRepository.findByUsername(updateUserDto.username);
      if (existingUser) {
        throw new ConflictException('User with this username already exists');
      }
    }

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    const updatedEntity = UserMapper.fromUpdateDto(updateUserDto, user);

    await this.userRepository.update({ id }, updatedEntity);
  }

  async delete(id: number, currentUserId: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new BadRequestException(`User with id ${id} not found`);
    }

    if (user.id === currentUserId) {
      throw new ForbiddenException('You cannot delete your own account');
    }

    await this.userRepository.softDelete({ id: user.id });
  }
}
