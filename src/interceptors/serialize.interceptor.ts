import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";

export class SerializeInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext, handler: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        //Run something before a request is handled
        console.log("I am running before the handler", context);

        return handler.handle().pipe(
            map((data: any) => {
                console.log("I am running before response is sent out", data);
                return data;
            }),
        )
    }
}