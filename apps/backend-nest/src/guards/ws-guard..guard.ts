import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class WSAuthGuard extends AuthGuard('jwt') implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    if (context.getType() !== 'ws') {
      return true;
    }

    const handshake = context.switchToWs().getClient().handshake;
    const token = handshake.auth.token;

    if (!token) {
      return false;
    }

    context.switchToWs().getClient().headers.set('Authorization', token);

    return super.canActivate(context) as Promise<boolean>;
  }
}
