import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        // private usersService: UsersService,
        // private jwtService: JwtService
    ) {}

    // async signIn() {

    // }
}
