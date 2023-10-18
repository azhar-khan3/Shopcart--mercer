import { Prop } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { SchemaTypes } from 'mongoose';
import { Role } from './role.enum';

export const UsersSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    //  username: { type: String, required: true},
    password: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    mobile: { type: String },
    imageUrl: { type: String },
    role:
        { type: SchemaTypes.String, enum: ['Admin', 'Customer'], default: Role.Admin, required: false },
  

});




