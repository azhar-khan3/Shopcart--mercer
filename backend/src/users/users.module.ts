import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AccessControlModule } from 'nest-access-control';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { jwtConstants } from 'src/auth/constants';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { LocalStrategy } from 'src/auth/local.strategy';
import { RolesGuard } from '../auth/roles.guard';
// import { roles } from './user-roles';



import { UsersSchema } from './users.schema';
import { UsersService } from './users.service';

@Module({
imports: [MongooseModule.forFeature([{name:'Users.name', schema:UsersSchema, collection:'RegisteredUser'}]) ,
ConfigModule.forRoot(),

// AccessControlModule.forRoles(roles)
],

providers: [ UsersService],
exports: [UsersService],

})
export class UsersModule {}
