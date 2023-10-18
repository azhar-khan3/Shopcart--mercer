import { Body, Controller, Get, Post } from "@nestjs/common";
import { UsersDto } from "src/users/users.dto";
import { CheckoutDto } from "./checkout.dto";
import { CheckoutService } from "./checkout.service";

@Controller('ckeckout')
export class CheckoutController {
  imageUrl: string;


  constructor(private check:CheckoutService) { }

  
  @Post("")
  async create(@Body() checkDto:CheckoutDto){
     
   const createdCheck =  this.check.create(checkDto);
   return createdCheck;

  }

 @Get("")
 async getAll(){
 const checkout = this.check.readAll();
 return checkout;
 }
  

}