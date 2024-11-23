export class Users {
  private _usr_id!: number;
  private static _lgUsr_id?: number;
  private _usbl_id?: number | undefined;
  private _edit_usr_id!: number;
  private _status_id!: number;
  private _last_name!: string;
  private _first_name!: string;
  private _middle_name!: string;
  private _password!: string;
  private _email!: string;
  private _employee_id!: number;
  
  public get edit_usr_id(): number {
    return this._edit_usr_id;
  }
  public set edit_usr_id(value: number) {
    this._edit_usr_id = value;
  }
  public get usbl_id(): number | undefined {
    return this._usbl_id;
  }
  public set usbl_id(value: number | undefined) {
    this._usbl_id = value;
  }

  // Getter and Setter for sss_no
  get usr_id(): number {
    return this._usr_id;
  }

  set usr_id(value: number) {
    this._usr_id = value;
  }

  get lgUsr_id(): number {
    return Users._lgUsr_id;
  }

  set lgUsr_id(value: number) {
    Users._lgUsr_id = value;
  }
  
  get status_id(): number {
    return this._status_id;
  }

  set status_id(value: number) {
    this._status_id = value;
  }

  get last_name(): string {
    return this._last_name;
  }

  set last_name(value: string) {
    this._last_name = value;
  }

  get first_name(): string {
    return this._first_name;
  }

  set first_name(value: string) {
    this._first_name = value;
  }

  get middle_name(): string {
    return this._middle_name;
  }

  set middle_name(value: string) {
    this._middle_name = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }


  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

    
  get employee_id(): number {
    return this._employee_id;
  }

  set employee_id(value: number) {
    this._employee_id = value;
  }
}

export const UserService = new Users();