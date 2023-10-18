import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CheckOut } from "./checkout.interface";
import { Model } from 'mongoose';

@Injectable()
export class CheckoutService {
  constructor(@InjectModel('Checkout.name') private readonly checkModel: Model<CheckOut>) {
            
  }

  
  async create(checkout: CheckOut) {

    try {
      const newCheckout = new this.checkModel(checkout);

      const create = await newCheckout.save();
      // const resUser = {
      //   _id: create._id,
      //   username: create.username,
      //    role: create.role,
      // };

      return create;
    }
    catch (error) {
      console.log(error);
    } 

}

readAll() {
    try {
        return this.checkModel.find();
    }
    catch (error) {
        console.log(error);
    }
}



}
