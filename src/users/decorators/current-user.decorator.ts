import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const CurrentUser = createParamDecorator((_data: never, context: ExecutionContext) => {
    //context: ExecutionContext is like a wrapper around the incoming request
    //_data: never is the data that we pass to the custom decorator as an argument
    const request = context.switchToHttp().getRequest();
    //we are able to get the session info since it';s happening after login
    //Once logged in the server sents the session info in cookie which is later sent on with every request
    //hence we are able to see the session info here
    // console.log("request.session",request.session);
    return request.currentUser;
})