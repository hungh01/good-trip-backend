import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";

export class LoginRequest {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
    })
    password: string;
}