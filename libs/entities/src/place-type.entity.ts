import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Place } from "./places.entity";

@Entity('place_types')
export class PlaceType {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @OneToMany(() => Place, (place) => place.placeType)
    places: Place[];
}