import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductController } from './product.controller';
import { ProductSchema } from './product.schema';
import { ProductService } from './product.service';

@Module({

    imports: [MongooseModule.forFeature([{name:'Product.name', schema:ProductSchema, collection:'Products'}]),
],
providers: [ProductService],
controllers: [ProductController],
})

export class ProductModule {}
