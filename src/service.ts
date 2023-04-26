import { ioc } from 'lite-ts-ioc';
import { RpcBase } from 'lite-ts-rpc';

import { IUserService } from './i-service';
import { UserValue } from './value';

export const userGetEntryRoute = '/prop/get-entry';

export class UserService implements IUserService {
    private m_Module: { [key: string]: any } = {};

    private m_Entry: Promise<UserValue>;
    public get entry() {
        this.m_Entry ??= new Promise<UserValue>(async (s, f) => {
            try {
                const resp = await this.m_Rpc.call<UserValue>({
                    isThrow: true,
                    route: userGetEntryRoute,
                });
                s(resp.data);
            } catch (ex) {
                delete this.m_Entry;
                f(ex);
            }
        });
        return this.m_Entry;
    }

    public constructor(
        private m_Rpc: RpcBase,
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