export class UserValue {
    public static ctor = 'UserValue';

    public head: { [no: number]: number };
    public headFrame: { [no: number]: number };
    public value: { [valueType: number]: number };
}