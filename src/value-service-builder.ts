import { RpcBase } from 'lite-ts-rpc';
import { NowTimeBase } from 'lite-ts-time';
import { UpdateCountValueHandler, ValueHandlerBase, ValueService } from 'lite-ts-value';

import { IUserService } from './i-service';
import { UserValue } from './value';

export const userGetValueEntryRoute = '/prop/get-entry';

export function userValueServiceBuilder(nowTime: NowTimeBase, rpc: RpcBase, areaNo: number, ...valueHandlers: ValueHandlerBase[]) {
    return (_: IUserService) => {
        const updateHandler = new UpdateCountValueHandler();
        valueHandlers.reduce((memo, r) => {
            return memo.setNext(r);
        }, updateHandler);
        return new ValueService(
            new Promise<{ [valueType: number]: number }>(async (s, f) => {
                try {
                    const resp = await rpc.call<UserValue>({
                        route: userGetValueEntryRoute
                    });
                    s(resp.err ? {} : resp.data.value);
                } catch (ex) {
                    f(ex);
                }
            }),
            null,
            updateHandler,
            async () => {
                return nowTime.unix();
            },
            areaNo
        );
    };
}