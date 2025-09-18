import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { UserRepository } from '../../user/user.repository';
import { JwtPayload } from '../../../types/jwt-payload.interface';
import { response } from 'express';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly userRepository: UserRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const authHeader = request.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Basic ')) {
      throw new ForbiddenException('API key missing');
    }

    const apiKey = authHeader.replace('Basic ', '').trim();
    if (!apiKey) throw new ForbiddenException('Invalid API key');
    const user = await this.userRepository.findByApiKey(apiKey);

    if (!user) {
      throw new ForbiddenException('Invalid API key');
    }

    request.user = {
      sub: user.id,
      username: user.username,
      name: user.name,
      role: user.type,
    } as JwtPayload;

    response.locals.user = request.user;
    return true;
  }
}
