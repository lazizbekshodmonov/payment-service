import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UserRepository } from '../user/user.repository';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserType } from '../user/user.enum';
import { TokensResponseDto } from './dto/token-response.dto';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../../types/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async login(dto: LoginAuthDto) {
    const user = await this.userRepository.findByUsername(dto.username);

    if (!user) throw new BadRequestException('User not found');

    if (user.type !== UserType.ADMIN && user.isActive) throw new BadRequestException();

    const isPasswordValid = await bcrypt.compare(dto.password, user.passwordHash!);
    console.log(isPasswordValid);
    if (!isPasswordValid) throw new BadRequestException('Invalid credentials');

    const payload = { sub: user.id, name: user.name, username: user.username, role: user.type };

    const jwtSecret = this.configService.get<string>('security.jwt.jwt_secret');
    const accessExpiresIn = this.configService.get<string>('security.jwt.access_expires_in');
    const refreshExpiresIn = this.configService.get<string>('security.jwt.refresh_expires_in');

    if (!jwtSecret && accessExpiresIn && refreshExpiresIn) throw new BadRequestException();

    const accessToken = this.jwtService.sign(payload, {
      secret: jwtSecret,
      expiresIn: accessExpiresIn,
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: jwtSecret,
      expiresIn: refreshExpiresIn,
    });

    return new TokensResponseDto(accessToken, refreshToken);
  }

  async refreshTokens(userId: number, refreshToken: string): Promise<TokensResponseDto> {
    const jwtSecret = this.configService.get<string>('security.jwt.jwt_secret');
    const accessExpiresIn = this.configService.get<string>('security.jwt.access_expires_in');

    if (!jwtSecret) throw new BadRequestException();
    let decoded: JwtPayload;
    try {
      decoded = await this.jwtService.verifyAsync<JwtPayload>(refreshToken, {
        secret: jwtSecret,
      });
    } catch (error) {
      throw new BadRequestException('Invalid refresh token');
    }

    if (decoded.sub !== userId) {
      throw new BadRequestException('Invalid refresh token');
    }

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const payload = { sub: user.id, name: user.name, username: user.username, role: user.type };

    const accessToken = this.jwtService.sign(payload, { expiresIn: accessExpiresIn });

    return new TokensResponseDto(accessToken, refreshToken);
  }
}
