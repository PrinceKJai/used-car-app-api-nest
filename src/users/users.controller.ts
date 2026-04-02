import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserResponseDto } from './dtos/user-response.dto';
import { AuthService } from 'src/auth/auth.service';

@Controller('auth')
@Serialize(UserResponseDto)
export class UsersController {
    constructor(private userService: UsersService, private authService: AuthService){}
    @Post('signup')
    createUser(@Body() body: CreateUserDto) {
        return this.authService.signup(body.email, body.password);
    }

    @Post('signin')
    signin(@Body() body: CreateUserDto) {
        return this.authService.signin(body.email, body.password);
    }

    @Get('/:id')
    findUser(@Param('id') id: string) {
        console.log("running inside handler");
        const user =  this.userService.findOne(parseInt(id));
        if(!user) {
            throw new NotFoundException('User not found!')
        }
        return user;
    }

    @Get() 
    findAllUsers(@Query('email') email: string) {
        return this.userService.find(email);
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() body: CreateUserDto) {
        return this.userService.update(parseInt(id), body);
    }

    @Delete('/:id')
    removeUser(@Param('id') id: string) {
        return this.userService.remove(parseInt(id));
    }
}
