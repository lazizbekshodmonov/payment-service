import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Basic ')) {
      throw new UnauthorizedException('API key missing');
    }

    const apiKey = authHeader.replace('Basic ', '').trim();
    const user = await this.authService.validateApiKey(apiKey);

    if (!user) {
      throw new UnauthorizedException('Invalid API key');
    }

    request.user = user;
    return true;
  }
}
