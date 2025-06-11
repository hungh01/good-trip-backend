import { Body, Controller, Get, Inject, InternalServerErrorException, Logger, Post, Res, UnauthorizedException } from '@nestjs/common';

import { ClientProxy } from '@nestjs/microservices';
import { catchError, firstValueFrom, timeout } from 'rxjs';
import { Response } from 'express';
import { LoginRequest, RegisterRequest } from '@app/type';

@Controller('auth')
export class AuthController {
    constructor(
        @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
    ) { }

    @Post('login')
    async login(@Body() loginRequest: LoginRequest, @Res() res: Response) {
        const result = await firstValueFrom(
            this.authClient.send('auth-login', loginRequest).pipe(
                timeout(5000),
                catchError((err) => {
                    Logger.error('Error from auth service:', err);
                    throw err;
                }),
            ),
        );
        if (result?.status === 'error') {
            if (result.code === 401) {
                throw new UnauthorizedException(result.message);
            }
            throw new InternalServerErrorException(result.message || 'Unknown error');
        }

        res.cookie('authorization', result.token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
        });
        return res.status(200).json({ message: 'Login successful' });
    }

    @Post('register')
    async register(@Body() registerRequest: RegisterRequest, @Res() res: Response) {
        try {
            const result = await firstValueFrom(
                this.authClient.send('auth-register', registerRequest).pipe(
                    timeout(5000),
                    catchError((err) => {
                        Logger.error('Error from auth service:', err);
                        throw err;
                    }),
                ),
            );
            if (result?.status === 'error') {
                throw new InternalServerErrorException(result.message || 'Registration failed');
            }
            return res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            throw new InternalServerErrorException('Registration failed');
        }
    }

    @Post('logout')
    logout(@Res() res: Response) {
        res.clearCookie('authorization', {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
        });

        return res.status(200).json({ message: 'Logged out successfully' });
    }
    @Get('check-health')
    async checkHealth() {
        return { status: 'ok' };
    }

    @Get("all-users")
    async getAllUsers(@Res() res: Response) {
        try {
            const result = await firstValueFrom(
                this.authClient.send('auth-get-all-users', {}).pipe(
                    timeout(5000),
                    catchError((err) => {
                        Logger.error('Error from auth service:', err);
                        throw err;
                    }),
                ),
            );
            return res.status(200).json(result);
        } catch (error) {
            Logger.error('Error fetching users:', error);
            throw new InternalServerErrorException('Failed to fetch users');
        }
    }
}


