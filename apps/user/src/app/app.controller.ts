import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
    @MessagePattern('user-profile')
    async getUserProfile(@Payload() userId: string) {
        return { message: 'User profile data', userId };
    }
}
