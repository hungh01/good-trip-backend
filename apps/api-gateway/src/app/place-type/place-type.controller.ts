import { Controller, Get, Inject, InternalServerErrorException, Param } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('place-type')
export class PlaceTypeController {
    constructor(
        @Inject('PLACE_SERVICE') private readonly placeClient: ClientProxy, // Injecting the PLACE_SERVICE client
    ) { }
    @Get()
    async getAllPlaceTypes() {
        try {
            const result = await firstValueFrom(this.placeClient.send('place-get-all-place-types', {}));
            if (result?.status === 'error') {
                throw new InternalServerErrorException(result.message || 'Failed to retrieve place types');
            }
            return result;
        } catch (error) {
            throw new InternalServerErrorException('Failed to retrieve place types', error.message);
        }
    }

    @Get('/:id')
    async getAllPlace(@Param('id') id: string) {
        try {
            const result = await firstValueFrom(this.placeClient.send('place-get-all-places-by-type', id));
            if (result?.status === 'error') {
                throw new InternalServerErrorException(result.message || 'Failed to retrieve place types');
            }
            return result;
        } catch (error) {
            throw new InternalServerErrorException('Failed to retrieve place types', error.message);
        }
    }

}
