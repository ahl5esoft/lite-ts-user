import { strictEqual } from 'assert';

import { UserFactory as Self } from './factory';

describe('src/factory.ts', () => {
    describe('.build(userID?: string)', () => {
        it('ok', () => {
            const self = new Self(null, null, 0, {});
            const res = self.build();
            const cache = Reflect.get(self, 'm_UserService');
            strictEqual(res, cache['']);
        });

        it('uid', () => {
            const self = new Self(null, null, 0, {});
            const res = self.build('uid');
            const cache = Reflect.get(self, 'm_UserService');
            strictEqual(res, cache['uid']);
        });
    });
});