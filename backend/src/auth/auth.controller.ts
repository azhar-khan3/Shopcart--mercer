import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Body,
  Req,
  UploadedFile,
  UseInterceptors,
  Delete,
  Res,
  Param,
  HttpStatus,
  Put,
  Patch,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import * as bcrypt from 'bcryptjs';
import { AuthService } from './auth.service';

import { UsersService } from '../users/users.service';
import { UsersDto } from 'src/users/users.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { create } from 'handlebars';
import { FileInterceptor } from '@nestjs/platform-express';
import { Users } from 'src/users/users.interface';
import { Roles } from './roles.decorator';
import { Role } from 'src/users/role.enum';
import { RolesGuard } from './roles.guard';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import { Role } from 'src/users/role.enum';
// import { Roles } from 'src/users/roles.decorator';


@Controller()
export class AuthController {
  constructor(
    @InjectModel('Users.name') private readonly userModel: Model<Users>,

    private readonly authService: AuthService,
    private readonly userService: UsersService,
    private mailerService: MailerService,

  ) { }

  @UseGuards(AuthGuard('local'))
  // @UseGuards(AuthGuard('jwt'))
  @Post('user/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Delete('user/:id')
  async Delete(@Res() response, @Param('id') _id: string) {
    const deletedUser = await this.userService.delete(_id);
    return response.status(HttpStatus.OK).json({
      deletedUser
    })
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('user/:id')
  async update(@Res() response, @Param('id') id, @Body() user: Users) {
    const updatedUser = await this.userService.update(id, user);
    console.log("controller",updatedUser);
    return response.status(HttpStatus.OK).json({
      updatedUser
    })
  }

  @Patch('image/:id')
  @UseInterceptors(FileInterceptor('file'))
  async updateImage(@UploadedFile() file: Express.Multer.File, @Res() response, @Param('id') id, @Body() data: Users) {
   
      const updatedUser = await this.userService.updateImage(id, file, data) ;
      console.log("controller", this.updateImage);
      return response.status(HttpStatus.OK).json({
        updatedUser
      })
  }

  @Post('user/register')
  @UseInterceptors(FileInterceptor('file'))
  async create(@UploadedFile() file: Express.Multer.File, @Res() response, @Body() data: UsersDto) {

    const user = {
      id: data.id,
      username: data.username,
      firstName: data.firstName,
      lastName: data.lastName,
      mobile: data.mobile,
      imageUrl: data.imageUrl,
      password: await bcrypt.hash(data.password, 10),
      // password:data.password,
      role: data.role
    };

    const updatedUser = await this.userService.create(file, user);
    return response.status(HttpStatus.OK).json({
      updatedUser
    })
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('users')
  getProfile() {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('user/:id')
  findOne(@Param('id') id: string) {
    return this.userService.findById(id);
  }


  //   @Post('register')
  //   async register(@Body() data: UsersDto, @Req() req) {
  //     const user = {
  //       username: data.username,
  //       name: data.name,
  //       mobile: data.mobile,
  //       password: await bcrypt.hash(data.password, 10),
  //       // password:data.password,
  //       role: data.role
  //     };

  //  ///Azhar

  //     const mail = {
  //       to: data.username,
  //       subject: 'Hello from sendgrid',
  //       from: 'azharmev@gmail.com', // Fill it with your validated email on SendGrid account
  //       text: 'Hello ',
  //       html: '<h1>Welcome, You have Registered Successfully</h1>' 
  //     };


  //    /// Rohit

  //     //   this.mailerService.sendMail( {
  //     //   to: data.username,
  //     //   subject: 'Hello from sendgrid',
  //     //   from: 'azharmev@gmail.com',
  //     //   text: 'Hello ',
  //     //   template: './email',
  //     //   // html: '<h1>Welcome, You have Registered Successfully</h1>' ,

  //     // }) .then((success) => {
  //     //   console.log(success)
  //     // })


  //     // .catch((err) => {
  //     //   console.log(err)

  //     // });


  //     this.userService.send(mail);
  //     return await this.userService.create(user);
  //   }
}