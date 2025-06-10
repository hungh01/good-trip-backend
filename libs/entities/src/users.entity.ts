import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { DestinationOfUser } from './destination-of-user.entity';
import { UserReview } from './user-review.entity';


@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    name: string;

    @Column()
    phone: string;

    @Column()
    address: string;

    @OneToMany(() => DestinationOfUser, (dest) => dest.user)
    destinations: DestinationOfUser[];

    @OneToMany(() => UserReview, (review) => review.user)
    reviews: UserReview[];
}
