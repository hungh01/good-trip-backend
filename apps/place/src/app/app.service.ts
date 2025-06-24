import { CreatePlaceRequest, CreatePlaceTypeRequest, GetPlaceRequest } from '@app/type';
import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Place, PlaceImage, PlaceType } from 'libs/entities';
import * as fs from 'fs';
import { join } from 'path';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {

    constructor(
        @InjectRepository(Place) private readonly placeRepo: Repository<Place>,
        @InjectRepository(PlaceType) private readonly placeTypeRepo: Repository<PlaceType>,
        @InjectRepository(PlaceImage) private readonly placeImageRepo: Repository<PlaceImage>
    ) { }

    async addPlace(data: CreatePlaceRequest) {
        try {
            // Validate the placeTypeId exists
            const placeType = await this.placeTypeRepo.findOne({
                where: { id: data.placeTypeId },
            });

            if (!placeType) {
                return {
                    status: 'error',
                    code: 404,
                    message: 'Place type not found',
                };
            }
            console.log(data.placeImages);

            const place = this.placeRepo.create({ ...data, placeType });

            await this.placeRepo.save(place);

            for (const image of data.placeImages) {
                const fileName = `${Date.now()}-${image.originalName}`;
                const filePath = join(__dirname, '../../../', 'public/place-images', fileName);

                const buffer = Buffer.from(image.buffer);
                console.log('Buffer:', buffer);
                fs.writeFileSync(filePath, buffer);

                const placeImage = this.placeImageRepo.create({
                    place: place,
                    description: '',
                    url: `/public/place-images/${fileName}`
                });
                await this.placeImageRepo.save(placeImage);
            }
            return { status: 'success', message: 'Place added successfully', data: place };
        } catch (error) {
            return {
                status: 'error',
                code: 500,
                message: error.message,
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

    async getAllPlaceTypes() {
        try {
            return await this.placeTypeRepo.find();
        } catch (error) {
            return {
                status: 'error',
                code: 500,
                message: 'Failed to retrieve place types',
                error: error.message,
            };
        }
    }

    async getAllPlacesByType(type: string) {
        return await this.placeRepo.find({
            where: {
                placeType: {
                    id: type,
                },
            },
            relations: ['placeType'],
        });
    }

    async getAllPlaces(body: GetPlaceRequest) {
        const originLat = body.curLatitude;
        const originLng = body.curLongitude;

        const distanceFormula = `
            (
            6371 * acos(
                cos(radians(:originLat)) * cos(radians(place.latitude)) *
                cos(radians(place.longitude) - radians(:originLng)) +
                sin(radians(:originLat)) * sin(radians(place.latitude))
            )
            )
        `;

        const query = this.placeRepo
            .createQueryBuilder('place')
            .select([
                'place.id',
                'place.name',
                'place.latitude',
                'place.longitude',
                'place.rate',
            ])
            .addSelect(distanceFormula, 'distance')
            .innerJoin('place.placeType', 'placeType')
            .setParameters({ originLat, originLng });

        if (body.typeId) {
            query.where('placeType.id = :typeId', { typeId: body.typeId });
        }

        query.andWhere(`${distanceFormula} < :maxDistance`, { maxDistance: 5 });
        query.orderBy('distance', 'ASC');

        return query.getRawMany();
    }
}
