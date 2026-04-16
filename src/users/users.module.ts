import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { APP_INTERCEPTOR } from '@nestjs/core';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';
// import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { CurrentUSerMiddleware } from './middlewares/current-user.middleware';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UsersController],
    providers: [
        UsersService, 
        AuthService, 
        // {
        //     provide: APP_INTERCEPTOR,
        //     useClass: CurrentUserInterceptor
        // }
    ]
})
export class UsersModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(CurrentUSerMiddleware).forRoutes('*')
    }
}
