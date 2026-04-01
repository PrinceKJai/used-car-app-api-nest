import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";
import { plainToInstance } from 'class-transformer'
import { UserResponseDto } from "src/users/dtos/user-response.dto";

export class SerializeInterceptor implements NestInterceptor{
    constructor(private dto: any) {}
    intercept(context: ExecutionContext, handler: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        //Run something before a request is handled
        console.log("I am running before the handler", context);

        return handler.handle().pipe(
            map((data: any) => {
                console.log("I am running before response is sent out", data);
                return plainToInstance(this.dto, data, {
                    excludeExtraneousValues: true
                });
            }),
        )
    }
}