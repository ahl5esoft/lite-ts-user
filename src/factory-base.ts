import { IUserService } from './i-service';

export abstract class UserFactoryBase {
    public static areaNo = 0;
    public static ctor = 'UserFactoryBase';

    public abstract build(userID?: string): IUserService;
}