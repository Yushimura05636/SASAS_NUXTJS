export class LoanRelease {
    private __id!: number;
    private __datetime_prepared!: Date;
    private __passbook_number!: number;
    private __prepared_by!: number;
    private __datetime_firstdue!: Date;
    private _notes!: string;

get id(): number {
    return this.__id;
}

set id(value: number) {
    this.__id = value;
}


get datetime_prepared(): Date {
    return this.__datetime_prepared;
}

set datetime_prepared(value: Date) {
    this.__datetime_prepared = value;
}

get passbook_number(): number {
    return this.__passbook_number;
}

set passbook_number(value: number) {
    this.__passbook_number = value;
}


get prepared_by(): number {
    return this.__prepared_by;
}

set prepared_by(value: number) {
    this.__prepared_by = value;
}

get datetime_firstdue(): Date {
    return this.__datetime_firstdue;
}

set datetime_firstdue(value: Date) {
    this.__datetime_firstdue = value;
}

get notes(): string {
    return this._notes;
}

set notes(value: string) {
    this._notes = value;
}

}
export const loanReleaseService = new LoanRelease();
