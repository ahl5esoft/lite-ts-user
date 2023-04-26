import { UserValue } from './value';

export interface IUserService {
    readonly entry: Promise<UserValue>;
    getModule<TModule, TTable>(opt: new () => TTable): TModule;
}