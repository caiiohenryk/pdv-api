import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}
    async canActivate(context: ExecutionContext): Promise<boolean>{
        const request = context.switchToHttp().getRequest();
        const authorization = request.headers.authorization;
        const token = authorization?.split(' ')[1];
        if (!token) {
            console.log('Token não existe.');
            throw new UnauthorizedException({message:"Usuário não autorizado ou token inválido."});
        }

        try {
            await this.jwtService.verifyAsync(token);
            return true;
        } catch(error) {
            throw new UnauthorizedException({message:"Usuário não autorizado ou token inválido."});
        }
    }
}