import { CreatePlaceRequest, CreatePlaceTypeRequest } from '@app/type';
import { Body, Controller, Inject, InternalServerErrorException, Post, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { AuthGuard } from '../../guards/auth/auth.guard';

@Controller('place')
export class PlaceController {

    constructor(
        @Inject('PLACE_SERVICE') private readonly placeClient: ClientProxy, // Injecting the PLACE_SERVICE client
    ) { }

    @UseGuards(AuthGuard)
    @Post('create-place-type')
    async createPlaceType(@Body() createPlaceTypeRequest: CreatePlaceTypeRequest) {
        try {
            const result = await firstValueFrom(this.placeClient.send('place-create-place-type', createPlaceTypeRequest));
            if (result?.status === 'error') {
                throw new InternalServerErrorException(result.message || 'Failed to create place type');
            }
            return {
                status: 'success',
                message: 'Place type created successfully',
                data: result.data,
            };

        } catch (error) {
            throw new InternalServerErrorException('Failed to create place type', error.message);
        }
    }
    @Post('create-place')
    async createPlace(@Body() createPlaceRequest: CreatePlaceRequest) {
        try {
            const result = await firstValueFrom(this.placeClient.send('place-create-place', createPlaceRequest));
            if (result?.status === 'error') {
                throw new InternalServerErrorException(result.message || 'Failed to create place');
            }
            return {
                status: 'success',
                message: 'Place created successfully',
                data: result.data,
            };
        }
        catch (error) {
            throw new InternalServerErrorException('Failed to create place', error.message);
        }
    }
}
