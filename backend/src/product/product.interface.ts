import mongoose from "mongoose"

export interface Product   {

    title:string,
    description:string,
    price:number;
    category: Categories,
    imageUrl:string
} 

export enum Categories{
      
    Electronics = 'Electronics ',
     Fashion = 'Fashion ',
     Jewelery ='Jewelery'
}
