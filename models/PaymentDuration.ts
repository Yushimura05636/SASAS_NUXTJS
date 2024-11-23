
export class PaymentDuration {
  private __id!: number;
  private _description!: string;
  private _number_of_payments!: number;
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

  get number_of_payments(): number {
    return this._number_of_payments;
  }

  set number_of_payments(value: number) {
    this._number_of_payments = value;
  }

  get notes(): string {
    return this._notes;
  }

  set notes(value: string) {
    this._notes = value;
  }

}
export const paymentDurationService = new PaymentDuration();