
export class Fee {
  private __id!: number;
  private _description!: string;
  private _amount!: number;
  private _isActive!: number;
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

  get amount(): number {
    return this._amount;
  }

  set amount(value: number) {
    this._amount = value;
  }

  
  get isActive(): number {
    return this._isActive;
  }

  set isActive(value: number) {
    this._isActive = value;
  }

  get notes(): string {
    return this._notes;
  }

  set notes(value: string) {
    this._notes = value;
  }

}
export const feeService = new Fee();