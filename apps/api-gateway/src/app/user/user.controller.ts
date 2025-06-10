import { Controller, Get, Inject, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../guards/auth/auth.guard';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('user')
export class UserController {
    constructor(
        @Inject('USER_SERVICE') private readonly userClient: ClientProxy, // Inject the user service
    ) { }

    @UseGuards(AuthGuard) // Add your authentication guard here
    @Get('profile')
    async getProfile(@Req() req: any) {
        return await firstValueFrom(
            this.userClient.send('user-profile', req.user.userId)
        );
    }

}
