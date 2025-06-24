import { Type } from "class-transformer";
import { IsArray, IsLatitude, IsLongitude, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { HasMimeType, IsFile, MemoryStoredFile } from "nestjs-form-data";

export class CreatePlaceRequest {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    description: string;

    @IsNotEmpty()
    @Type(() => Number)
    @IsLatitude()
    latitude: number;

    @IsNotEmpty()
    @Type(() => Number)
    @IsLongitude()
    longitude: number;

    @IsNotEmpty()
    @IsString()
    placeTypeId: string;

    @IsArray()
    @IsFile({ each: true })
    @HasMimeType(['image/jpeg', 'image/png'], { each: true })
    placeImages: MemoryStoredFile[];
}
