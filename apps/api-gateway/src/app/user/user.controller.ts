import { Controller, Get, Inject, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../guards/auth/auth.guard';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { Request } from 'express';

@Controller('user')
export class UserController {
    constructor(
        @Inject('USER_SERVICE') private readonly userClient: ClientProxy, // Inject the user service
    ) { }

    @UseGuards(AuthGuard) // Add your authentication guard here
    @Get('profile')
    async getProfile(@Req() req: Request) {
        // Type assertion to inform TypeScript about the 'user' property
        const user = (req as Request & { user: { userId: string, role: string } }).user;
        return await firstValueFrom(
            this.userClient.send('user-profile', user.userId)
        );
    }

}
