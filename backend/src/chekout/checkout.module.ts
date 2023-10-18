import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CheckoutController } from "./checkout.controller";
import { CheckoutSchema } from "./checkout.schema";
import { CheckoutService } from "./checkout.service";

@Module({

    imports: [MongooseModule.forFeature([{name:'Checkout.name', schema:CheckoutSchema, collection:'Checkout'}]),
],
providers: [CheckoutService],
controllers: [CheckoutController],
})

export class CheckoutModule {}
