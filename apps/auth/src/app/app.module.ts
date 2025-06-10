import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DestinationOfUser, ReviewImage, Place, User, UserReview, PlaceType, PlaceImage } from 'libs/entities';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/auth/.env',
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: '1h',
        },
      }),
    }),
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
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule { }


