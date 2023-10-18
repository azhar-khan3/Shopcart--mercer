import { BadRequestException, Body, Injectable, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FileInterceptor } from '@nestjs/platform-express';
import { Product } from './product.interface';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import { Readable } from 'stream';
import { Request } from "express";
import { ProductDto } from './product.dto';
import { filterDto } from './filterDto.dto';
import { ProductDocument } from './product.schema';
// import { ProductDocument } from './product.schema';
@Injectable()
export class ProductService {

    // constructor(@InjectModel('Product.name') private readonly productModel: Model<ProductDocument>) { }
    constructor(@InjectModel('Product.name') private readonly productModel: Model<Product>) { }

    readAll() {
        try {
            return this.productModel.find();
        }
        catch (error) {
            console.log(error);
        }
    }





    async getProductsWithFilter(filterDto: filterDto, @Req() req: Request) {

        const { category, search, range, sort, min, max } = filterDto;
        let products = await this.readAll();
        let query = this.readAll();

        if (category) {
            products = products.filter(task => task.category === category)
        }

        if (req.query.sort) {
            query = query.sort(
                {
                    price: req.query.sort
                }
            );
            return query;
        }
        if (search) {
            products = products.filter(task =>
                task.title.trim().toLowerCase().includes(search) ||
                task.description.trim().toLowerCase().includes(search),
            );
            return products;
        }
        if (min || max) {

            products = products.filter(task => task.price >= min
                && task.price <= max)
            // return products;
        }

        return products;
    }



    @UseInterceptors(FileInterceptor('file'))
    async create(@UploadedFile() file: Express.Multer.File, @Body() productDto: ProductDto):

        Promise<UploadApiResponse | UploadApiErrorResponse> {

        try {
            return new Promise((resolve, reject) => {
                const upload = v2.uploader.upload_stream((error, result) => {

                    if (error) return reject(error);
                    // @ts-ignore
                    resolve(result);

                    const product = new this.productModel(productDto);
                    //image
                    product.imageUrl = result.url;
                    product.save();
                });
                Readable.from(file.buffer).pipe(upload);
            });
        }
        catch (error) {
            console.log(error);
        }
    }


    async delete(id: string) {
        try {
            return await this.productModel.findByIdAndDelete(id);
        }
        catch (error) {
            console.log(error);
        }
    }
    async findById(id: string) {
        try {
            return await this.productModel.findById(id);
        }
        catch (error) {
            console.log(error);
        }
    }

    async update(id: string, product: Product): Promise<Product> {
        try {
            return await this.productModel.findByIdAndUpdate(id, product, { new: true })
        }
        catch (error) {
            console.log(error);
        }
    }

}




// count(options: any) {
//     try {
//         return this.productModel.count(options).exec();
//     }

//     catch (error) {
//         console.log(error);
//     }
// }



// async search(@Req() req: Request) {


    //     try {
    //         let options = {};
    //         if (req.query.search) {
    //             options = {
    //                 $or: [
    //                     { title: new RegExp(req.query.search.toString(), 'i') },
    //                     { description: new RegExp(req.query.search.toString(), 'i') },
    //                 ]
    //             }
    //         }

    //         const query = this.readAll();

    //         if (req.query.sort) {
    //             query.sort({
    //                 price: req.query.sort
    //             })
    //         }

    //         const page: number = parseInt(req.query.page as any) || 1;
    //         const limit = 9;
    //         const total = await this.count(options);

    //         const data = await query.skip((page - 1) * limit).limit(limit).exec();

    //         return {
    //             data,
    //             total,
    //             page,
    //             last_page: Math.ceil(total / limit)
    //         };
    //     }
    //     catch (error) {
    //         console.log(error);
    //     }
    // }