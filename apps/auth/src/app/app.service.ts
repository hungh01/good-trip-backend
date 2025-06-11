import { LoginRequest, RegisterRequest } from '@app/type';
import { Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'libs/entities';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
    constructor(
        private readonly jwtService: JwtService,
        @InjectRepository(User) private readonly userRepo: Repository<User>
    ) { }

    async login(login: LoginRequest) {
        const user = await this.userRepo.findOne({ where: { email: login.email } });

        if (user && user.password === login.password) {
            const payload = { userId: user.id, email: user.email, role: 'admin' };
            const token = this.jwtService.sign(payload);
            return {
                status: 'success',
                token,
            };
        }
        return {
            status: 'error',
            code: 401,
            message: 'Invalid credentials',
        };
    }

    validateUser(token: string) {
        try {
            const decoded = this.jwtService.verify(token);
            return {
                valid: 'true',
                userId: decoded.userId,
                role: decoded.role,
            };
        } catch (error) {
            return {
                valid: 'false',
                userId: null,
                role: null,
            };
        }
    }

    async register(register: RegisterRequest) {
        try {
            const user = this.userRepo.create({ ...register });
            await this.userRepo.save(user);              // Ghi vào DB
            return { status: 'success', message: 'User registered successfully' };
        } catch (error) {
            return {
                status: 'error',
                code: 500,
                message: 'Registration failed',
            };
        }
    }

    async getAllUsers() {
        return await this.userRepo.find();
    }
}
