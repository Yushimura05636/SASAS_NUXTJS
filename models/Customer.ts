import { Personality } from "./Personality";

export class Customers extends Personality {
  private _group_id!: number;
  private _passbook_no!: number;
  private _loan_count!: number;
  private _enable_mortuary!: number;
  private _mortuary_coverage_start?: Date;
  private _mortuary_coverage_end?: Date;
  private _personality_id?: number;

  // Getter and Setter for group_id
  get group_id(): number {
    return this._group_id;
  }

  set group_id(value: number) {
    this._group_id = value;
  }

  // Getter and Setter for passbook_no
  get passbook_no(): number {
    return this._passbook_no;
  }

  set passbook_no(value: number) {
    this._passbook_no = value;
  }

  // Getter and Setter for loan_count
  get loan_count(): number {
    return this._loan_count;
  }

  set loan_count(value: number) {
    this._loan_count = value;
  }

  // Getter and Setter for enable_mortuary
  get enable_mortuary(): number {
    return this._enable_mortuary;
  }

  set enable_mortuary(value: number) {
    this._enable_mortuary = value;
  }

  // Getter and Setter for mortuary_coverage_start (optional)
  get mortuary_coverage_start(): Date | undefined {
    return this._mortuary_coverage_start;
  }

  set mortuary_coverage_start(value: Date | undefined) {
    this._mortuary_coverage_start = value;
  }

  // Getter and Setter for mortuary_coverage_end (optional)
  get mortuary_coverage_end(): Date | undefined {
    return this._mortuary_coverage_end;
  }

  set mortuary_coverage_end(value: Date | undefined) {
    this._mortuary_coverage_end = value;
  }

  // Getter and Setter for personality_id (optional)
  get personality_id(): number | undefined {
    return this._personality_id;
  }

  set personality_id(value: number | undefined) {
    this._personality_id = value;
  }
}

// CustomersService instance for the Customers model
export const CustomersService = new Customers();
