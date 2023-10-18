import mongoose from "mongoose";

export const CheckoutSchema = new mongoose.Schema({
  
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String},
    address: { type: String },
    country: { type: String },
    state: { type: String },
    zip: { type: Number},
    products: []
    
    
});