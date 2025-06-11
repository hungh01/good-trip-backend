import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserController } from './user/user.controller';
import { PlaceController } from './place/place.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'auth',
          port: 3001,
        }
      },
      {
        name: 'USER_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'user',
          port: 3002,
        }
      },
      {
        name: 'PLACE_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'place',
          port: 3003,
        }
      }
    ]),
  ],
  controllers: [AppController, AuthController, UserController, PlaceController],
  providers: [AppService]
})
export class AppModule { }
