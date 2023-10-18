import { Body, Injectable, Req, Res, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from './users.interface';
import * as SendGrid from '@sendgrid/mail';
import { UploadApiResponse, UploadApiErrorResponse, v2 } from 'cloudinary';

import { Readable } from 'stream';
import { FileInterceptor } from '@nestjs/platform-express';
import { resolve } from 'path';

@Injectable()
export class UsersService {
  public imageUrl: any;
  result:any = [];
   image:any;
  constructor(@InjectModel('Users.name') private readonly userModel: Model<Users>, private readonly configService: ConfigService) {
    SendGrid.setApiKey(this.configService.get<string>('EMAIL_PASSWORD'));
  }

  async findAll(): Promise<Users[]> {
    try {
      return await this.userModel.find();
    }
    catch (error) {
      console.log(error);
    }
  }


  @UseInterceptors(FileInterceptor('file'))
  async create(@UploadedFiles() file: Express.Multer.File, users: Users):

    Promise<UploadApiResponse | UploadApiErrorResponse> {

    try {
      return new Promise((resolve, reject) => {
        const upload = v2.uploader.upload_stream((error, result) => {

          if (error) return reject(error);
          // @ts-ignore
          resolve(result);

          const newUser = new this.userModel(users);

          newUser.imageUrl = result.url;

          newUser.save();


        });
        Readable.from(file.buffer).pipe(upload);

      });
    } catch (error) {
      console.log(error);
    }

  }


  async delete(id: string) {

    try {
      return await this.userModel.findByIdAndDelete(id);
    }
    catch (error) {
      console.log(error);
    }
  }


  async findOne(username: string): Promise<Users> {
    try {
      return await this.userModel.findOne({ username: username });
    }
    catch (error) {
      console.log(error);
    }
  }

  async findById(id: string) {
    try {
      return await this.userModel.findById(id);
    }
    catch (error) {
      console.log(error);
    }
  }






  //Azhar

  async send(mail: SendGrid.MailDataRequired) {
    try {
      const transport = await SendGrid.send(mail);
      // avoid this on production. use log instead :)
      console.log(`E-Mail sent to ${mail.to}`);
      // console.log(transport);
      return transport;

    }
    catch (error) {
      console.log(error);
    }
  }


  async update(id: string, user: Users) {
    try {
      console.log("service", user);
      return await this.userModel.findByIdAndUpdate(id, user, { new: true })

    }
    catch (error) {
      console.log(error);
    }
  }


  @UseInterceptors(FileInterceptor('file')) 
  async updateImage(id: string, @UploadedFiles() file: Express.Multer.File, users: Users) {
   
    try {
 this.result =  await new Promise((resolve, reject) => {
        const upload = v2.uploader.upload_stream((error, result) => {

          if (error) return reject(error);
          // @ts-ignore
           resolve(result);
        });
        Readable.from(file.buffer).pipe(upload);

      });
    
      users.imageUrl = this.result.secure_url;
      users.id = id;
      const data = await this.userModel.findByIdAndUpdate(id, users, { new: true });
      return data;
    }
    catch (error) {
      console.log(error);
    }
  }




  // async create(user: Users) {

  //   try {
  //     const newUser = new this.userModel(user);

  //     const create = await newUser.save();
  //     // const resUser = {
  //     //   _id: create._id,
  //     //   username: create.username,
  //     //    role: create.role,
  //     // };

  //     return create;
  //   }
  //   catch (error) {
  //     console.log(error);
  //   } 

}




