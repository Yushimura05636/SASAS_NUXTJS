
export class LoanApplication {
private __id!: number;
private __customer_id!: number;
private __group_id!: number;
private _datetime_prepared!: Date;
private _document_status!: number;
private _loan_application_no!: string;
private _amount_loan!: number;
private _factor_rate!: number;
private _amount_interest!: number;
private _amount_paid!: number;
private _datetime_target_release!: Date;
private _datetime_fully_paid!: Date;
private _datetime_approved!: Date;
private _payment_frequency_id!: number;
private _payment_duration_id!: number;
private _approved_by_id!: number;
private _prepared_by_id!: number;
private _released_by_id!: number;
private _last_modified_by_id!: number;
private _selectedFees!: any[];
private _coMaker!: any;
private _notes!: string;

public get coMaker(): any {
    return this._coMaker;
}
public set coMaker(value: any) {
    this._coMaker = value;
}

public get selectedFees(): any[] {
    return this._selectedFees;
}
public set selectedFees(value: any[]) {
    this._selectedFees = value;
}

get id(): number {
    return this.__id;
}

set id(value: number) {
    this.__id = value;
}

get customer_id(): number {
    return this.__customer_id;
}

set customer_id(value: number) {
    this.__customer_id = value;
}

get group_id(): number {
    return this.__group_id;
}

set group_id(value: number) {
    this.__group_id = value;
}


get datetime_prepared(): Date {
    return this._datetime_prepared;
}

set datetime_prepared(value: Date) {
    this._datetime_prepared = value;
}


get document_status(): number {
    return this._document_status;
}

set document_status(value: number) {
    this._document_status = value;
}

get loan_application_no(): string {
    return this._loan_application_no;
}

set loan_application_no(value: string) {
    this._loan_application_no = value;
}


get amount_loan(): number {
    return this._amount_loan;
}

set amount_loan(value: number) {
    this._amount_loan = value;
}

get factor_rate(): number {
    return this._factor_rate;
}

set factor_rate(value: number) {
    this._factor_rate = value;
}

get amount_interest(): number {
    return this._amount_interest;
}

set amount_interest(value: number) {
    this._amount_interest = value;
}

get amount_paid(): number {
    return this._amount_paid;
}

set amount_paid(value: number) {
    this._amount_paid = value;
}

get datetime_target_release(): Date {
    return this._datetime_target_release;
}

set datetime_target_release(value: Date) {
    this._datetime_target_release = value;
}

get datetime_fully_paid(): Date {
    return this._datetime_fully_paid;
}

set datetime_fully_paid(value: Date) {
    this._datetime_fully_paid = value;
}

get datetime_approved(): Date {
    return this._datetime_approved;
}

set datetime_approved(value: Date) {
    this._datetime_approved = value;
}

get payment_frequency_id(): number {
    return this._payment_frequency_id;
}

set payment_frequency_id(value: number) {
    this._payment_frequency_id = value;
}



get payment_duration_id(): number {
    return this._payment_duration_id;
}

set payment_duration_id(value: number) {
    this._payment_duration_id = value;
}

get approved_by_id(): number {
    return this._approved_by_id;
}

set approved_by_id(value: number) {
    this._approved_by_id = value;
}


get prepared_by_id(): number {
    return this._prepared_by_id;
}

set prepared_by_id(value: number) {
    this._prepared_by_id = value;
}

get released_by_id(): number {
    return this._released_by_id;
}

set released_by_id(value: number) {
    this._released_by_id = value;
}


get last_modified_by_id(): number {
    return this._last_modified_by_id;
}

set last_modified_by_id(value: number) {
    this._last_modified_by_id = value;
}

get notes(): string {
    return this._notes;
}

set notes(value: string) {
    this._notes = value;
}


}
export const loanApplicationService = new LoanApplication();