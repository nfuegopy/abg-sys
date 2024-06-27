import { Injectable, ExecutionContext, UnauthorizedException, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAuthGuard.name);

  canActivate(context: ExecutionContext) {
    this.logger.log('Activating JWT Guard');
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      this.logger.warn(`Request rejected: ${info?.message}`);
      throw err || new UnauthorizedException();
    }
    this.logger.log('JWT Guard validated the user successfully');
    return user;
  }
}
