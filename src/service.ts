import { ioc } from 'lite-ts-ioc';

import { IUserService } from './i-service';

export class UserService implements IUserService {
    private m_Module: { [key: string]: any } = {};

    public constructor(
        private m_ModuleBuildFunc: { [key: string]: (userService: IUserService) => any },
    ) { }

    public getModule<TModule, TTable>(ctor: new () => TTable) {
        const key = ioc.getKey(ctor);
        if (!this.m_Module[key]) {
            if (!this.m_ModuleBuildFunc[key])
                throw new Error(`UserService.getModule: ${key}缺少创建函数`);

            this.m_Module[key] = this.m_ModuleBuildFunc[key](this);
        }

        return this.m_Module[key] as TModule;
    }
}