
export class PaymentSchedules {
    private __id!: number;
    private _customer_id!: number;
    private _balance!: number;

    public get balance(): number {
        return this._balance;
    }
    public set balance(value: number) {
        this._balance = value;
    }

    public get customer_id(): number {
        return this._customer_id;
    }
    public set customer_id(value: number) {
        this._customer_id = value;
    }
    public get _id(): number {
        return this.__id;
    }
    public set _id(value: number) {
        this.__id = value;
    }
  }
  export const paymentScheduleService = new PaymentSchedules();
