import mongoose from "mongoose";
import { Role } from "./role.enum";

export interface Users {
  
  id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  mobile:string;
  imageUrl:string;
  role: Role;
 


}
