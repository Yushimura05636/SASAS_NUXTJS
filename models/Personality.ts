export class Personality {
    private _id? : number;
    private _first_name!: string;
    private _family_name!: string;
    private _datetime_registered!: Date;
    private _name_type_code!: number;
    private _middle_name!: string;
    private _birthday!: Date;
    private _civil_status!: number;
    private _gender_code!: number;
    private _house_street!: string;
    private _purok_zone!: string;
    private _postal_code!: string;
    private _telephone_no!: string;
    private _email_address!: string;
    private _cellphone_no!: string;
    private _personality_status_code!: number;
    private _barangay_id!: number;
    private _city_id!: number;
    private _country_id!: number;
    private _province_id!: number;
    private _credit_status_id!: number;
    private _notes?: string; // Optional
    
    // Getter and Setter for first_name
    get first_name(): string {
      return this._first_name;
    }
  
    set first_name(value: string) {
      this._first_name = value;
    }
  
    // Getter and Setter for family_name
    get family_name(): string {
      return this._family_name;
    }
  
    set family_name(value: string) {
      this._family_name = value;
    }
  
    // Getter and Setter for datetime_registered
    get datetime_registered(): Date {
      return this._datetime_registered;
    }
  
    set datetime_registered(value: Date) {
      this._datetime_registered = value;
    }
  
    // Getter and Setter for name_type_code
    get name_type_code(): number {
      return this._name_type_code;
    }
  
    set name_type_code(value: number) {
      this._name_type_code = value;
    }
  
    // Getter and Setter for middle_name
    get middle_name(): string {
      return this._middle_name;
    }
  
    set middle_name(value: string) {
      this._middle_name = value;
    }
  
    // Getter and Setter for birthday
    get birthday(): Date {
      return this._birthday;
    }
  
    set birthday(value: Date) {
      this._birthday = value;
    }
  
    // Getter and Setter for civil_status
    get civil_status(): number {
      return this._civil_status;
    }
  
    set civil_status(value: number) {
      this._civil_status = value;
    }
  
    // Getter and Setter for gender_code
    get gender_code(): number {
      return this._gender_code;
    }
  
    set gender_code(value: number) {
      this._gender_code = value;
    }
  
    // Getter and Setter for house_street
    get house_street(): string {
      return this._house_street;
    }
  
    set house_street(value: string) {
      this._house_street = value;
    }
  
    // Getter and Setter for purok_zone
    get purok_zone(): string {
      return this._purok_zone;
    }
  
    set purok_zone(value: string) {
      this._purok_zone = value;
    }
  
    // Getter and Setter for postal_code
    get postal_code(): string {
      return this._postal_code;
    }
  
    set postal_code(value: string) {
      this._postal_code = value;
    }
  
    // Getter and Setter for telephone_no
    get telephone_no(): string {
      return this._telephone_no;
    }
  
    set telephone_no(value: string) {
      this._telephone_no = value;
    }
  
    // Getter and Setter for email_address
    get email_address(): string {
      return this._email_address;
    }
  
    set email_address(value: string) {
      this._email_address = value;
    }
  
    // Getter and Setter for cellphone_no
    get cellphone_no(): string {
      return this._cellphone_no;
    }
  
    set cellphone_no(value: string) {
      this._cellphone_no = value;
    }
  
    // Getter and Setter for personality_status_code
    get personality_status_code(): number {
      return this._personality_status_code;
    }
  
    set personality_status_code(value: number) {
      this._personality_status_code = value;
    }
  
    // Getter and Setter for barangay_id
    get barangay_id(): number {
      return this._barangay_id;
    }
  
    set barangay_id(value: number) {
      this._barangay_id = value;
    }
  
    // Getter and Setter for city_id
    get city_id(): number {
      return this._city_id;
    }
  
    set city_id(value: number) {
      this._city_id = value;
    }
  
    // Getter and Setter for country_id
    get country_id(): number {
      return this._country_id;
    }
  
    set country_id(value: number) {
      this._country_id = value;
    }
  
    // Getter and Setter for province_id
    get province_id(): number {
      return this._province_id;
    }
  
    set province_id(value: number) {
      this._province_id = value;
    }
  
    // Getter and Setter for credit_status_id
    get credit_status_id(): number {
      return this._credit_status_id;
    }
  
    set credit_status_id(value: number) {
      this._credit_status_id = value;
    }
  
    // Getter and Setter for notes (optional)
    get notes(): string | undefined {
      return this._notes;
    }
  
    set notes(value: string | undefined) {
      this._notes = value;
    }

    get id(): number | undefined{
        return this._id;
    }
    
    set id(value: number) {
        this._id = value;
    }
  }
  
  // PersonalityService instance for the Personality model
  export const PersonalityService = new Personality();
  