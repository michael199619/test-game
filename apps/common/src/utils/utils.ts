import { RpcException } from "@nestjs/microservices";
import { Observable } from "rxjs";

type Response<data> = Promise<data> | Observable<data> | data;
export type ControllerResponse<data> = Promise<Response<data>> | Response<data>;

export type IUsecase<func extends (...args: any[]) => any> = {
    handler: (...args: Parameters<func>) => Promise<ReturnType<func>>
}

export class Usecase<func extends (...args: any[]) => any> implements IUsecase<func> {
    handler(...args: Parameters<func>): Promise<ReturnType<func>> {
        throw 'handler is not exists';
    }

    async excecute(...args: Parameters<func>): Promise<ReturnType<func>> {
        try {
            return await this.handler(...args)
        } catch (e) {
            throw new RpcException({ status: e.status, error: e.error, message: e.message })
        }
    }
}