import { Test } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { UsersService } from "../users/users.service";
import { User } from "./user.entity";
import { BadRequestException, NotFoundException } from "@nestjs/common";

describe('AuthService', () => {
  let service: AuthService;
  let usersService: Partial<UsersService>;

  beforeEach(async () => {
    const users: User[] = [];	
  // create a fake users service
    usersService = {
      find: (email: string) => {
        return Promise.resolve(users.filter(user => user.email === email));
      },
      create: (email: string, password: string) => {
        const user = {
          id: Math.round(Math.random() * 10000),
          email,
          password,
        } as User;

        users.push(user);

        return Promise.resolve(user);
      }
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: usersService
        }
      ]
    }).compile();

    service = module.get(AuthService);
  });

  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  it('creates a new user with a salted and hashed password', async () => {
    const user = await service.signup('asdas@asda.com', 'asdasd');

    expect(user.password).not.toEqual('asdasd');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws an error if user signs up with email that is in use', async () => {
    await service.signup('aasd@asd.com', 'asdasd');

    await expect(service.signup('aasd@asd.com', 'asdasd')).rejects.toThrow(BadRequestException);
  });

  it('throws if signin is called with an unused email', async () => {
    await expect(service.signin('asdas@asdasd', 'asdasd')).rejects.toThrow(NotFoundException);
  });

  it('throws if an invalid password is provided', async () => {
    await service.signup('laskdjf@alskdfj.com', 'asdasd');

    await expect(
      service.signin('laskdjf@alskdfj.com', 'passowrd'),
    ).rejects.toThrow(BadRequestException);
  });

  it('returns a user if correct password is provided', async () => {
    await service.signup('123123@123123', 'mypassword');
    
    const user = await service.signin('123123@123123', 'mypassword');
    expect(user).toBeDefined();
  });
});