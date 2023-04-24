import { IUserService } from './i-service';
import { UserService } from './service';

export abstract class UserFactoryBase {
    public static areaNo = 0;
    public static ctor = 'UserFactoryBase';

    public abstract build(userID?: string): IUserService;
}

export class UserFactory extends UserFactoryBase {
    private m_UserService: { [userID: string]: IUserService } = {};

    public constructor(
        private m_ModuleBuildFunc: { [key: string]: (userService: IUserService) => any },
    ) {
        super();
    }

    public build(userID?: string) {
        userID ??= '';
        this.m_UserService[userID] ??= new UserService(this.m_ModuleBuildFunc);
        return this.m_UserService[userID];
    }
}