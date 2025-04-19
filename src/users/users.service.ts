import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { User } from "./users.model"
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    // Registrar usuário
     async registrarUsuario(user: User) {
        const existingUser = await this.userRepository.findOne({
            where: {email: user.email}
        });
        if (existingUser) throw new ConflictException('Email já existente');
        
        const newUser = await this.userRepository.save(user);
        return newUser;
    }

    // Get Usuario
    async getUser(userId: string) {
        const findUser = await this.userRepository.findOne({
            where: {id: userId}
        });
        if (!findUser) throw new NotFoundException(`Usuario de id ${userId} não encontrado.`);
        return findUser;
    }

}