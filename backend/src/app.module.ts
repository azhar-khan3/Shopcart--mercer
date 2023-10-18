import {  Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadApiErrorResponse, UploadApiResponse, v2
}  from 'cloudinary';

import { MulterModule } from '@nestjs/platform-express';
import multer, { diskStorage } from 'multer';

import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';

import { APP_GUARD } from '@nestjs/core';
// import { RolesGuard } from './users/roles.guard';
import { ACGuard } from 'nest-access-control';
import { RolesGuard } from './auth/roles.guard';
import { AuthService } from './auth/auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants';
import { CheckoutModule } from './chekout/checkout.module';
import path from 'path';
const cloudinary = require("cloudinary").v2;


// v2.config({ 
//     cloud_name: 'dd6rkfwjr', 
//     api_key: '844285553352693', 
//     api_secret: 'cWeDtsVBucD3sr4huiOff0p-x24',
//     secure: false,
//     // process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0,
   
// });
cloudinary.config({ 
    cloud_name: 'dd6rkfwjr', 
    api_key: '844285553352693', 
    api_secret: 'cWeDtsVBucD3sr4huiOff0p-x24',
    secure: false,
    // process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0,
   
});
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

@Module({
  imports: [MongooseModule.forRoot(process.env.DB_URL), 
    // imports: [MongooseModule.forRoot('mongodb+srv://azharmev:Azhar123@cluster0.xucuk.mongodb.net/?retryWrites=true&w=majority'), 
 
  MulterModule.register({
    storage: diskStorage({}),
    fileFilter: (req, file, cb) => {
      let ext = path.extname(file.originalname);
      if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
          cb(new Error("Unsupported file type!"), false);
          return;
      }
      cb(null, true);
  }, // use memory storage for having the buffer
  }),





  ConfigModule.forRoot({
    isGlobal: true, // no need to import into other modules
  }),
    UsersModule,
    AuthModule,
    ProductModule,
    CheckoutModule,

    // ACGuard
],
  controllers: [AppController],
  providers: [  
  //    {
  //   provide: APP_GUARD,
  //   useClass: RolesGuard,
  // }, 
 
  AppService,


],
})
export class AppModule {}
