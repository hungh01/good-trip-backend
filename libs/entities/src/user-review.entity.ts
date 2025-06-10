import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
import { User } from './users.entity';
import { Place } from './places.entity';
import { ReviewImage } from './review-image.entity';



@Entity('user_reviews')
export class UserReview {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('int')
    rating: number;

    @Column()
    comment: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => User, (user) => user.reviews)
    user: User;

    @ManyToOne(() => Place, (place) => place.reviews)
    place: Place;

    @OneToMany(() => ReviewImage, (img) => img.userReview)
    images: ReviewImage[];
}
