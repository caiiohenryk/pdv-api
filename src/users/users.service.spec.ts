import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './users.service';
import { Repository } from 'typeorm';
import { User } from './users.model';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt'); // Isso substitui bcrypt por um mock em todos os testes

describe('UsersService', ()=> {
    let service: UserService;
    let repository: jest.Mocked<Repository<User>>;

    beforeEach(async ()=> {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UserService,
                {
                    provide: getRepositoryToken(User),
                    useValue: {
                        save: jest.fn(),
                        create: jest.fn(),
                        findOne: jest.fn(),
                    }
                }
            ],
        }).compile();

        service = module.get<UserService>(UserService);
        repository = module.get(getRepositoryToken(User));
    });

    // Verificar se a declaração do módulo está certa.
    it('Deve estar definido', async ()=>{
        expect(service).toBeDefined();
    });

    // Verificar POST /users/register
    it('Deve retornar o User com senha criptografada', async ()=> {
        const password = 'passwordTeste';
        const hashedPass = 'hashedPassword';

        (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPass);

        const newUser:User = {
            id: 'uuid123',
            nome: 'Caio',
            email: 'caio@email.com',
            password: hashedPass,
            hasActivePayment: false,
            createdAt: new Date()
        };
        
        repository.create.mockReturnValue(newUser as User);
        repository.save.mockResolvedValue(newUser as User);

        const result = await service.registrarUsuario(newUser);

        expect(bcrypt.hash).toHaveBeenCalledWith(password, 10);
        expect(repository.create).toHaveBeenCalledWith({
        name: newUser.nome,
        email: newUser.email,
        password: hashedPass,
        });
        expect(repository.save).toHaveBeenCalledWith(newUser);
        expect(result).toEqual(newUser);
    });
});