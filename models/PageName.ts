export class PageName {
    private _pageName!: '';

    public get pageName(): string {
        return this._pageName;
    }
    public set pageName(value: any) {
        this._pageName = value;
    }

}


export const PageNameService = new PageName();
