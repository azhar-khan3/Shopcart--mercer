import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose";
import {Factory} from "nestjs-seeder";
import {randomInt} from "crypto";
import { Categories } from "./product.interface";


export type ProductDocument = Product & Document;

@Schema()
export class Product {
  
    // @Factory(faker => faker.lorem.words(2))
    @Prop()
    title: string;

    @Factory(faker => faker.lorem.words(2))
    @Prop()
    description: string;


    // @Factory(faker => faker.lorem.words(2))
    @Prop()
    category: Categories;
    
   
    @Prop()
    imageUrl: string;
  
    @Factory(faker => faker.lorem.words(2))
    @Prop()
    price: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);




// import * as mongoose from 'mongoose';

// export const ProductSchema = new mongoose.Schema({

//     title:{ type: String, required: true, unique: true },
//     description:String,
//     category:String,
//     imageUrl:String,
//     price:Number,
  
// },{
//     versionKey:false
// });  