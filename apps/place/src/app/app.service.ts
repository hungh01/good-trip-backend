import { CreatePlaceRequest, CreatePlaceTypeRequest } from '@app/type';
import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Place, PlaceType } from 'libs/entities';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {

    constructor(
        @InjectRepository(Place) private readonly placeRepo: Repository<Place>,
        @InjectRepository(PlaceType) private readonly placeTypeRepo: Repository<PlaceType>
    ) { }

    async addPlace(data: CreatePlaceRequest) {
        try {
            const place = this.placeRepo.create({ ...data });
            await this.placeRepo.save(place); // Save to the database
            return { status: 'success', message: 'Place added successfully', data: place };
        } catch (error) {
            return {
                status: 'error',
                code: 500,
                message: 'Failed to add place',
                error: error.message,
            };
        }
    }

    async addPlaceType(data: CreatePlaceTypeRequest) {
        try {
            const placeType = this.placeTypeRepo.create({ ...data });
            await this.placeTypeRepo.save(placeType);
            return { status: 'success', message: 'Place type added successfully', data: placeType };
        }
        catch (error) {
            return {
                status: 'error',
                code: 500,
                message: 'Failed to add place type',
                error: error.message,
            };
        }
    }
}
