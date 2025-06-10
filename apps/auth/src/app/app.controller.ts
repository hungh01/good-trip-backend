import { Controller, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { LoginRequest } from './dto/login.request';
import { RegisterRequest } from './dto/register.request';

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService, // Assuming AppService is defined and imported
    ) { }

    @MessagePattern('auth-login')
    async login(@Payload() data: LoginRequest) {
        return this.appService.login(data);
    }
    @MessagePattern('auth-validate')
    async validateUser(@Payload() token: string) {
        return this.appService.validateUser(token);
    }

    @MessagePattern('auth-register')
    async register(@Payload() data: RegisterRequest) {
        return await this.appService.register(data);
    }
    @MessagePattern('auth-get-all-users')
    async getAllUsers() {
        try {
            const users = await this.appService.getAllUsers();
            return users;
        } catch (error) {
            Logger.error('Error fetching all users:', error);
            throw error; // Re-throw the error to be handled by the caller
        }
    }
}