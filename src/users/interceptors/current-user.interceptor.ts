import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { UsersService } from "../users.service";
import { Observable } from "rxjs";

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor{
    constructor(private usersService: UsersService) {}

    async intercept(context: ExecutionContext, handler: CallHandler<any>) {
        //context: ExecutionContext is like a wrapper around the incoming request
        //handler: CallHandler is used for handling the incoming request
        const request = context.switchToHttp().getRequest();
        const { userId} = request.session;
        if(userId) {
            const user = await this.usersService.findOne(userId);
            request.currentUser = user;
        }
        return handler.handle();
    }
}