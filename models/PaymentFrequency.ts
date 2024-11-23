export class PaymentFrequency {
  private __id!: number;
  private _description!: string;
  private _days_interval!: number;
  private _notes!: string;

  get id(): number {
    return this.__id;
  }

  set id(value: number) {
    this.__id = value;
  }
  
  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get days_interval(): number {
    return this._days_interval;
  }

  set days_interval(value: number) {
    this._days_interval = value;
  }

  get notes(): string {
    return this._notes;
  }

  set notes(value: string) {
    this._notes = value;
  }

}
export const paymentFrequencyService = new PaymentFrequency();