import { BadRequestException, Body, Controller, Delete, Get, HttpException, HttpStatus, NotFoundException, Param, Patch, Post, Put, Query, Req, Res, SetMetadata, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthGuard } from '@nestjs/passport';
import {Request} from "express";



import { Role } from 'src/users/role.enum';
import { ProductDto } from './product.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { filterDto } from './filterDto.dto';
import { Product } from './product.interface';
// import { Roles } from 'src/users/roles.decorator';
// import { Role } from 'src/users/role.enum';



@Controller('product')
export class ProductController {
  imageUrl: string;

  constructor(private productService: ProductService) { }
  
  @Roles(Role.Admin, Role.Customer)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get()
  async fetchAll(){
  const products = await this.productService.readAll();
    // console.log(products);
   return  products;
  
  }

  // @Roles(Role.Admin, Role.Customer)
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('product/:id')
  async findOne(@Param('id') id: string) {
    return await this.productService.findById(id);
    
  }

  
  @Get('/filter')
  async searchProduct(@Query()  filterDto:filterDto, @Req() req: Request) {
     return await this.productService.getProductsWithFilter(filterDto, req);
  }
  
  @Roles(Role.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async  create(@UploadedFile() file:Express.Multer.File, @Body() productDto: ProductDto, @Res() response) {
   
   const newProduct = await this.productService.create(file,  productDto);
    return response.status(HttpStatus.OK).json({
      newProduct
    })
}


// decorator role
@Roles(Role.Admin)
@UseGuards(AuthGuard('jwt'), RolesGuard)
  @Delete('/:id')
  async Delete(@Res() response, @Param('id') _id: string) {
    const deletedProduct = await this.productService.delete(_id);
    return response.status(HttpStatus.OK).json({
      deletedProduct
    })
  }


 
  @Roles(Role.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Patch('/:id')
  async update(@Res() response, @Param('id') id, @Body() product: Product) {
    const updatedProduct = await this.productService.update(id, product);
    return response.status(HttpStatus.OK).json({
      updatedProduct
    })
  }



}




 // @UseGuards(AuthGuard('jwt'))
  // @Post()
  // @UseInterceptors(FileInterceptor("file", {

  //   storage: diskStorage({

  //     destination: "./uploads",
  //     filename: (req, file, cb) => {
  //       const name = file.originalname.split(".")[0];
  //       const fileExtension = file.originalname.split(".")[1];
  //       const newFileName = name.split(" ").join("_") + "_" + Date.now() + "." + fileExtension;
  //       cb(null, newFileName);
  //     }
  //   }),
  //   fileFilter: (req, file, cb) => {
  //     if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
  //       return cb(null, false);
  //     }
  //     cb(null, true);
  //   }
  // }))
  // uploadPhoto(@UploadedFile() file: Express.Multer.File, @Req() req, product: { title: string, description: string, price: string, category: string, imageUrl: string }) {

  //   if (!file) {
  //     throw new BadRequestException("File is not an image");
  //   }
  //   else {
  //     const response = {
  //       filePath: `http://localhost:3000/product/${file.filename}`
  //     };

  //     const uploadedImage = new this.productModel(product);
  //     uploadedImage.title = req.body.title;
  //     uploadedImage.description = req.body.description;
  //     uploadedImage.price = req.body.price;
  //     uploadedImage.category = req.body.category;
  //     uploadedImage.imageUrl = response.filePath;

  //     uploadedImage.save();

  //     return response;
  //   }
  // }

  // @UseGuards(AuthGuard('jwt'))
  // @Post()
  // async createProduct(@UploadedFile() file: Express.Multer.File, @Req() req@Body() product: Product) {

  //     const newProduct = await this.productService.create(file, req, product);

  //       return newProduct;
  // }



  
  // @Get('/:filename')
  // async getPicture(@Param('filename') filename, @Res() res: Response) {


  //   res.sendFile(filename, { root: './uploads' });

  // }