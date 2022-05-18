import { ObjectType } from "@nestjs/graphql";
import { LoginResponse } from "./LoginResponse";

@ObjectType()
export class RegisterResponse extends LoginResponse {}
