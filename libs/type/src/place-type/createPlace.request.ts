import { IsNotEmpty } from "class-validator";

export class CreatePlaceRequest {

    @IsNotEmpty()
    name: string;

    description?: string;

    @IsNotEmpty()
    latitude: number;

    @IsNotEmpty()
    longitude: number;

    @IsNotEmpty()
    placeTypeId: string;

}
