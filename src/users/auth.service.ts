import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";
import { UsersService } from "./users.service";

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signup(email: string, password: string) {
    const users = await this.userService.find(email);

    if(users.length) {
      throw new BadRequestException('email in use')
    }

    // hash password
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    const result = salt + '.' + hash.toString('hex')

    const user = await this.userService.create(email, result);

    return user;
  }

  async signin(email: string, password: string) {
    // look for the user by email
    const [user] = await this.userService.find(email);

    if(!user) {
      // if no user is found, throw an error
      throw new NotFoundException('user not found')
    }

    // get the salt and hash from the user's password
    const [salt, storedHash] = user.password.split('.')

    let hash: Buffer;
    try {
      // hash the password provided by the user
      hash = (await scrypt(password, salt, 32)) as Buffer;
    } catch(err) {
      // if there is an error, throw a bad request error
      throw new BadRequestException('invalid user or password')
    }

    // compare the stored hash to the hash of the password provided by the user
    if(storedHash !== hash.toString('hex')) {
      // if the hashes don't match, throw an error
      throw new BadRequestException('invalid user or password')
    }

    // if the hashes match, return the user
    return user;
  }
}