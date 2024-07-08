import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator";

export class RegisterDTO {
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    firstName: string;

    @IsString()
    @MinLength(3)
    @MaxLength(20)
    lastName: string;

    @IsEmail()
    email: string;

    @IsString()
    @IsStrongPassword()
    @IsNotEmpty()
    password: string;

    @IsString()
    phone: string;
}