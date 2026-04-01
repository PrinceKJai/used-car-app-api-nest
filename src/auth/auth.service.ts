import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async signup(email: string, password: string) {
        //check if the email is already taken
        const users = await this.usersService.find(email);
        if(users.length) {
            throw new BadRequestException('email already in use');
        }
        //Hash the users password
        //Generate a salt
        const salt = randomBytes(8).toString('hex');

        //Hash the salt and the password together
        const hash = (await scrypt(password, salt, 32)) as Buffer;

        //Join the hashed result and the salt together
        const hashedPassword = salt + '.' + hash.toString('hex');

        //Create a new user ad save it
        const user = this.usersService.create(email, hashedPassword);

        //retrun the user
        return user;
    }
}