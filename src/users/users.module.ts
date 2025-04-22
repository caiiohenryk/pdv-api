import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.model';
import { UserService } from './users.service';
import { AuthGuard } from '@auth/guards/auth.guard';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UserService],
    exports: [UserService],
})
export class UsersModule {}
