import { Module } from '@nestjs/common';
import { UsersModule } from '@users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@users/users.model';
import { UserController } from '@users/users.controller';
import { AuthModule } from '@auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from '@auth/auth.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
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
    ,UsersModule, AuthModule],
  controllers: [UserController, AuthController],
  providers: [],
})
export class AppModule {}
