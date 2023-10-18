import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Roles } from './roles.decorator';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // async validateUser(username: string, pass: string): Promise<any> {
  //   const user = await this.usersService.findOne(username);
  //   const password = await bcrypt.compare(pass, user?.password);

  //   if (user && password) {
  //     // const { password,  ...result } = user; 
  //     // return result;
  //     return {user};
  //   } 
  //   return null;
 
  // }

  async login(user: any) {
    // const payload = { username:user._doc.username, role:user._doc.role, firstName:user._doc.firstName, lastName:user._doc.lastName, mobile:user._doc.mobile, password:user._doc.password, imageUrl:user._doc.imageUrl,  sub: user._doc._id };
  
    return  {  
      access_token: this.jwtService.sign(user)
      };
  }
}