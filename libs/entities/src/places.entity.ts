import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { DestinationOfUser } from './destination-of-user.entity';
import { UserReview } from './user-review.entity';
import { PlaceType } from './place-type.entity';
import { PlaceImage } from './place-image.entity';

@Entity('places')
export class Place {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column('float')
    latitude: number;

    @Column('float')
    longitude: number;

    @Column('float', { default: 0 })
    rate: number;

    @OneToMany(() => PlaceImage, (placeImage) => placeImage.place)
    images: PlaceImage[];

    @OneToMany(() => DestinationOfUser, (dest) => dest.place)
    destinations: DestinationOfUser[];

    @OneToMany(() => UserReview, (review) => review.place)
    reviews: UserReview[];

    @ManyToOne(() => PlaceType, (PlaceType) => PlaceType.places)
    placeType: PlaceType;
}
