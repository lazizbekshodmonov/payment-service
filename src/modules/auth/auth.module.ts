import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ApiKeyGuard } from './guards/api-key.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserRepository } from '../user/user.repository';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt.guard';

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('security.jwt.jwt_secret'),
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserRepository],
  exports: [JwtModule, AuthService],
})
export class AuthModule {}
