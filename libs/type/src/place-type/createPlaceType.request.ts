import { IsNotEmpty } from "class-validator";


export class CreatePlaceTypeRequest {
    @IsNotEmpty()
    name: string;
}