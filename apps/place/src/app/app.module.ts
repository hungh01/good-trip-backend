import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DestinationOfUser, ReviewImage, Place, User, UserReview, PlaceType, PlaceImage } from 'libs/entities';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres', // hoặc localhost nếu không dùng Docker
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'goodtrip',
      entities: [User, UserReview, DestinationOfUser, Place, ReviewImage, PlaceType, PlaceImage],
      synchronize: true, // ❗ Không dùng trong production
    }),
    TypeOrmModule.forFeature([Place, PlaceType, PlaceImage]),
  ],
})
export class AppModule { }
