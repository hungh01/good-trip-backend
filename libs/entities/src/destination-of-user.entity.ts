import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './users.entity';
import { Place } from './places.entity';

@Entity('destination_of_user')
export class DestinationOfUser {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    note: string;

    @ManyToOne(() => User, (user) => user.destinations)
    user: User;

    @ManyToOne(() => Place, (place) => place.destinations)
    place: Place;
}
