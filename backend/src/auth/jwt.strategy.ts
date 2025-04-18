import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UserService } from '../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') { // Nome da estratégia: 'jwt'
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'Qy9fW2sL@8nJp#4rXt!7zDhUvE3cMk2G',
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.userService.findOne(payload.sub);

    if (!user) {
      throw new Error('User not found');
    }

    return { ...user, sub: payload.sub };
  }
}
