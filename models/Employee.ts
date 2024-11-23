import { Personality } from "./Personality";

export class Employee extends Personality {
  private _sss_no!: number;
  private _phic_no!: number;
  private _tin_no!: number;
  private _date_hired?: Date;
  private _date_resigned?: Date;
  private _personality_id!: number;

  // Getter and Setter for sss_no
  get sss_no(): number {
    return this._sss_no;
  }

  set sss_no(value: number) {
    this._sss_no = value;
  }

  // Getter and Setter for phic_no
  get phic_no(): number {
    return this._phic_no;
  }

  set phic_no(value: number) {
    this._phic_no = value;
  }

  // Getter and Setter for tin_no
  get tin_no(): number {
    return this._tin_no;
  }

  set tin_no(value: number) {
    this._tin_no = value;
  }

  // Getter and Setter for date_hired (optional)
  get date_hired(): Date | undefined {
    return this._date_hired;
  }

  set date_hired(value: Date | undefined) {
    this._date_hired = value;
  }

  // Getter and Setter for date_resigned (optional)
  get date_resigned(): Date | undefined {
    return this._date_resigned;
  }

  set date_resigned(value: Date | undefined) {
    this._date_resigned = value;
  }

  // Getter and Setter for personality_id
  get personality_id(): number {
    return this._personality_id;
  }

  set personality_id(value: number) {
    this._personality_id = value;
  }
}

// EmployeesService instance for the Employees model
export const EmployeesService = new Employee();