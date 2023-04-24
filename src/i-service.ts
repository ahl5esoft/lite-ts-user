export interface IUserService {
    getModule<TModule, TTable>(opt: new () => TTable): TModule;
}