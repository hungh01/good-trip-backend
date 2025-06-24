import { IsEmpty, IsNotEmpty } from "class-validator";


export class GetPlaceRequest {
    @IsNotEmpty()
    curLatitude: number;
    @IsNotEmpty()
    curLongitude: number;
    @IsEmpty()
    typeId: string;
}