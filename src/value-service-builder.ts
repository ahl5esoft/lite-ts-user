import { NowTimeBase } from 'lite-ts-time';
import { UpdateCountValueHandler, ValueHandlerBase, ValueService } from 'lite-ts-value';

import { IUserService } from './i-service';

export function userValueServiceBuilder(nowTime: NowTimeBase, areaNo: number, ...valueHandlers: ValueHandlerBase[]) {
    return (userService: IUserService) => {
        const updateHandler = new UpdateCountValueHandler();
        valueHandlers.reduce((memo, r) => {
            return memo.setNext(r);
        }, updateHandler);
        return new ValueService(
            new Promise<{ [valueType: number]: number }>(async (s, f) => {
                try {
                    const entry = await userService.entry;
                    s(entry.value);
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