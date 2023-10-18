import { Injectable, CanActivate, ExecutionContext, Req } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { request } from 'http';
import { Observable } from 'rxjs';
import { Role } from '../users/role.enum';
import { Roles, ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }

    /// role from request jwt
    const {user} = context.switchToHttp().getRequest();

    // console.log(user.role);
    //  users: Users = {
       
    //     username: '',
    //     password: '',
    //     name: '',
    //     mobile: '',
    //     role: Role.Admin,  
    // };

      return requiredRoles.some((role) => user.role?.includes(role));
  }
}