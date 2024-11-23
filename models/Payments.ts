
export class Payments {
    private __id!: number;
    private _customer_id!: number;
    private _prepared_at!: Date;
    private _document_status_code!: string;
    private _prepared_by_id!: number;
    private _amount_paid!: number;
    private _notes!: string;

    public get id(): number {
        return this.__id;
    }
    public set id(value: number) {
        this.__id = value;
    }

    public get customer_id(): number {
        return this._customer_id;
    }
    public set customer_id(value: number) {
        this._customer_id = value;
    }
    
    get prepared_at(): Date {
        return this._prepared_at;
    }

    set prepared_at(value: Date) {
        this._prepared_at = value;
    }

    
    get document_status_code(): string {
        return this._document_status_code;
    }

    set document_status_code(value: string) {
        this._document_status_code = value;
    }

    public get prepared_by_id(): number {
        return this._prepared_by_id;
    }
    public set prepared_by_id(value: number) {
        this._prepared_by_id = value;
    }

    public get amount_paid(): number {
        return this._amount_paid;
    }
    public set amount_paid(value: number) {
        this._amount_paid = value;
    }
    
    get notes(): string {
        return this._notes;
    }

    set notes(value: string) {
        this._notes = value;
    }


}
export const paymentServices = new Payments();