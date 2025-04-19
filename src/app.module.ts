import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.model';
import { UserController } from './users/users.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'pdv-api',
      entities: [User],
      synchronize: true // Lembra de mudar pra false quando for pra deploy
    })
    ,UsersModule],
  controllers: [UserController],
  providers: [],
})
export class AppModule {}
