import { CreatePlaceRequest, CreatePlaceTypeRequest, GetPlaceRequest } from '@app/type';
import { Body, Controller, Get, Inject, InternalServerErrorException, Logger, Param, Post, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { AuthGuard } from '../../guards/auth/auth.guard';
import { FormDataRequest } from 'nestjs-form-data';


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
            return result;

        } catch (error) {
            throw new InternalServerErrorException('Failed to create place type', error.message);
        }
    }


    @Post('create-place')
    @FormDataRequest()
    async createPlace(@Body() createPlaceRequest: CreatePlaceRequest) {
        try {
            const result = await firstValueFrom(this.placeClient.send('place-create-place', createPlaceRequest));
            if (result?.status === 'error') {
                throw new InternalServerErrorException(result.message || 'Failed to create place');
            }
            return result;
        }
        catch (error) {
            throw new InternalServerErrorException('Failed to create place', error.message);
        }
    }

    @Get('get-all')
    async getAllPlaces(@Body() body: GetPlaceRequest) {
        try {
            const result = await firstValueFrom(this.placeClient.send('place-get-all-places', body));
            if (result?.status === 'error') {
                throw new InternalServerErrorException(result.message || 'Failed to retrieve places');
            }
            return result;
        } catch (error) {
            throw new InternalServerErrorException('Failed to retrieve places', error.message);
        }
    }

    @Get('/:id')
    async getPlaceById(@Param('id') id: string) {
        try {
            const result = await firstValueFrom(this.placeClient.send('place-get-place-by-id', { id }));
            if (result?.status === 'error') {
                throw new InternalServerErrorException(result.message || 'Failed to retrieve place');
            }
            return result;
        } catch (error) {
            throw new InternalServerErrorException('Failed to retrieve place', error.message);
        }
    }

}
