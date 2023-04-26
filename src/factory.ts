import { RpcBase } from 'lite-ts-rpc';

import { UserFactoryBase } from './factory-base';
import { IUserService } from './i-service';
import { UserService } from './service';

export class UserFactory extends UserFactoryBase {
    private m_UserService: { [userID: string]: IUserService } = {};

    public constructor(
        private m_Rpc: RpcBase,
        private m_ModuleBuildFunc: { [key: string]: (userService: IUserService) => any },
    ) {
        super();
    }

    public build(userID?: string) {
        userID ??= '';
        this.m_UserService[userID] ??= new UserService(this.m_Rpc, this.m_ModuleBuildFunc);
        return this.m_UserService[userID];
    }
}