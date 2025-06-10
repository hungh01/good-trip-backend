import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy, // Replace 'any' with the actual type of your auth service
  ) { }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies?.authorization;
    if (!token) {
      throw new UnauthorizedException('Invalid or expired token');
    }
    const authResult = await firstValueFrom(this.authClient.send('auth-validate', token));

    if (!authResult || authResult.valid === 'false') {
      throw new UnauthorizedException('Invalid or expired token');
    }

    request.user = {
      userId: authResult.userId,
      role: authResult.role,
    }
    return true;
  }
}
