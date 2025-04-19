import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.model';
import { UserService } from './users.service';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [],
    providers: [UserService],
    exports: [UserService],
})
export class UsersModule {}
