import { Observable } from "rxjs";

export type ControllerResponse<data> = Promise<data> | Observable<data> | data;

export type IUsecase<func extends (...args: any[]) => any> = {
    handler: (...args: Parameters<func>) => ReturnType<func>
}

export class Usecase<func extends (...args: any[]) => any> implements IUsecase<func> {
    handler(...args: Parameters<func>): ReturnType<func> {
        throw 'handler is not exists';
    }

    excecute(...args: Parameters<func>): ReturnType<func> {
        try {
            return this.handler(...args)
        } catch (e) {
            throw e
        }
    }
}