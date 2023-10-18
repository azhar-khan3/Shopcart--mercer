import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';

import * as bcrypt from 'bcryptjs';
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService,
    private readonly usersService: UsersService,) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    // const user = await this.authService.validateUser(username, password);
    const user = await this.usersService.findOne(username);
    const matchedPassword = await bcrypt.compare(password, user?.password);
    if (user && matchedPassword) {
      return {user};
    } 
    if (!user) {
      throw new UnauthorizedException();
    }
  // return user;
  }
}