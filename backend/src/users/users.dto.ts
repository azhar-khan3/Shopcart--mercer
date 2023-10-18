import { Role } from "./role.enum";

export class UsersDto {
  readonly id: string;
  readonly username: string;
  readonly password: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly mobile:string;
  readonly imageUrl:string;
  readonly role: Role;
    
}
