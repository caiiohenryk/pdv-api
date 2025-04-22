
import { Body, ClassSerializerInterceptor, Controller, Get, Param, Post, UseGuards, UseInterceptors } from "@nestjs/common";
import { UserService } from "./users.service";
import { User } from "./users.model";
import { AuthGuard } from "@auth/guards/auth.guard";

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('register')
    async register(@Body() user: User): Promise<{message: string; user: User}> {
        const newUser = await this.userService.registrarUsuario(user);
        return {
            message: `Usuário registrado com sucesso`,
            user: newUser
        }
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    async getUser(@Param('id') userId: string): Promise<{message: string; user: User}> {
        const user = await this.userService.getUser(userId);
        return {
            message: `Usuário encontrado com sucesso.`,
            user: user
        }
    } 


}