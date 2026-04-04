import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, Session, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserResponseDto } from './dtos/user-response.dto';
import { AuthService } from '../auth/auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { AuthGuard } from '../guards/auth.guard';

@Controller('auth')
@Serialize(UserResponseDto)
export class UsersController {
    constructor(private userService: UsersService, private authService: AuthService){}

    // @Get('whoami')
    // async getLoggedInUserInfo(@Session() session: any) {
    //     return this.userService.findOne(session.userId);
    // }

    @UseGuards(AuthGuard)
    @Get('whoami')
    async getLoggedInUserInfo(@CurrentUser() user: string) {
        return user;
    }

    @Post('signup')
    async createUser(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signup(body.email, body.password);
        session.email = user.email;
        // session.userId = user.id;
        // console.log("sefdgfdfgssion", session);
        return user;
    }

    @Post('signin')
    async signin(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signin(body.email, body.password);
        session.userId = user.id;
        return user;
    }

    @Post('signout')
    async signout(@Session() session: any) {
        session.userId = null;
    }

    @Get('/:id')
    async findUser(@Param('id') id: string) {
        console.log("running inside handler");
        const user =  await this.userService.findOne(parseInt(id));
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
