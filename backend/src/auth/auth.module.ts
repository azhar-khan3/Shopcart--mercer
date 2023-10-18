import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { UsersSchema } from 'src/users/users.schema';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

// import { roles } from './user-roles';

@Module({
  imports: [

    MongooseModule.forFeature([{ name: 'Users.name', schema: UsersSchema, collection: 'RegisteredUser' }]),
    ConfigModule.forRoot(),
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '900s' },
    }),

    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: process.env.EMAIL_HOST,

          port: 587,
          ignoreTLS: true,
          secure: false,

          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
          },
        },
        // template: {
        //   dir: join(__dirname, 'templates'),
        //   adapter: new HandlebarsAdapter(),
        //   options: {
        //     strict: true
        //   },
        // },

      }),

      inject: [ConfigService],
    }),
    ConfigModule.forRoot(),
    //  AccessControlModule.forRoles(roles),

  ],
  exports: [JwtModule],
  providers: [AuthService, LocalStrategy, JwtStrategy
  ],

  controllers: [AuthController],
})
export class AuthModule { }
