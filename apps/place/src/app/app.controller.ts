import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { CreatePlaceRequest, CreatePlaceTypeRequest } from '@app/type';

@Controller()
export class AppController {

    constructor(
        private readonly appService: AppService, // Assuming AppService is defined and imported
    ) { }

    @MessagePattern('place-create-place')
    async createPlace(data: CreatePlaceRequest) {
        return this.appService.addPlace(data);
    }

    @MessagePattern('place-create-place-type')
    async addPlaceType(data: CreatePlaceTypeRequest) {
        return this.appService.addPlaceType(data);
    }
}
