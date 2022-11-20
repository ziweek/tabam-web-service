import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

import { CarsModule } from './cars/cars.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/entity/user.entity';

import { Car } from './cars/entity/car.entity';

import { Sharing } from './sharings/entity/sharing.entity';
import { SharingsModule } from './sharings/sharings.module';
import { AuthModule } from './auth/auth.module';
import { EventsModule } from './events/events.module';
import { UserAuthority } from './auth/entity/user-authority.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,

      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,

      entities: [User, Car, Sharing, UserAuthority],
      synchronize: true,
    }),
    UsersModule,
    CarsModule,
    SharingsModule,
    AuthModule,
    EventsModule,
    EventsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
