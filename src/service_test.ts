import { deepStrictEqual, strictEqual } from 'assert';
import { Mock } from 'lite-ts-mock';
import { RpcBase } from 'lite-ts-rpc';
import { NowTimeBase } from 'lite-ts-time';

import { userGetEntryRoute, UserService as Self, UserService } from './service';

describe('src/service.ts', () => {
    describe('.entry', () => {
        it('ok', async () => {
            const mockRpc = new Mock<RpcBase>();
            const self = new Self(null, mockRpc.actual, null, null);

            mockRpc.expectReturn(
                r => r.call({
                    isThrow: true,
                    route: userGetEntryRoute,
                }),
                {
                    err: 0,
                    data: {}
                }
            );

            const res = await self.entry;
            deepStrictEqual(res, {});
        });
    });

    describe('.getModule<TModule, TTable>(ctor: new () => TTable)', () => {
        it('ok', () => {
            let self: UserService;
            self = new Self(null, null, 0, {
                'test': arg => {
                    strictEqual(arg, self);
                    return {};
                }
            });

            const res = self.getModule('test' as any);
            deepStrictEqual(res, {});

            const module = Reflect.get(self, 'm_Module');
            deepStrictEqual(module, {
                test: {}
            });
        });

        it('err', () => {
            let self: UserService;
            self = new Self(null, null, 0, {});

            let err: Error;
            try {
                self.getModule('test' as any);
            } catch (ex) {
                err = ex;
            }
            strictEqual(err.message, `UserService.getModule: test缺少创建函数`);
        });
    });

    describe('.getNow()', () => {
        it('nowValueType', async () => {
            const self = new Self(null, null, 1, null);

            Reflect.set(self, 'm_Entry', {
                value: {
                    1: 11
                }
            });

            const res = await self.getNow();
            strictEqual(res, 11);
        });

        it('nowTime', async () => {
            const mockNowTime = new Mock<NowTimeBase>();
            const self = new Self(mockNowTime.actual, null, 1, null);

            Reflect.set(self, 'm_Entry', {
                value: {}
            });

            mockNowTime.expectReturn(
                r => r.unix(),
                11
            );

            const res = await self.getNow();
            strictEqual(res, 11);
        });
    });
});