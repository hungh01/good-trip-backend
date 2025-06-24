import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { CreatePlaceRequest, CreatePlaceTypeRequest, GetPlaceRequest } from '@app/type';

@Controller()
export class AppController {

    constructor(
        private readonly appService: AppService, // Assuming AppService is defined and imported
    ) { }

    @MessagePattern('place-create-place')
    async createPlace(@Payload() data: CreatePlaceRequest) {
        return this.appService.addPlace(data);
    }

    @MessagePattern('place-create-place-type')
    async addPlaceType(@Payload() data: CreatePlaceTypeRequest) {
        return this.appService.addPlaceType(data);
    }

    @MessagePattern('place-get-all-place-types')
    async getAllPlaceTypes() {
        return this.appService.getAllPlaceTypes();
    }

    @MessagePattern('place-get-all-places-by-type')
    async getAllPlacesByType(@Payload() type: string) {
        return await this.appService.getAllPlacesByType(type);
    }

    @MessagePattern('place-get-all-places')
    async getAllPlaces(@Payload() body: GetPlaceRequest) {
        return await this.appService.getAllPlaces(body);
    }
}
