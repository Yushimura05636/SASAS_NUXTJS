import { Personality } from "./Personality";

export class Library {
  private _description?: string;
  private _id?: number;
  private _oldText?: string;
  private _modelType?: string | undefined;
  private _collectorId?: number | undefined;
  private _collectorName?: string | undefined;

  public get collectorName(): string | undefined {
        return this._collectorName;
    }
    public set collectorName(value: string | undefined) {
        this._collectorName = value;
    }
  public get collectorId(): number | undefined {
      return this._collectorId;
  }
  public set collectorId(value: number | undefined) {
      this._collectorId = value;
  }

    public get modelType(): string | undefined {
        return this._modelType;
    }
    public set modelType(value: string | undefined) {
        this._modelType = value;
    }

  set oldText(value: string | undefined) {
    this._oldText = value;
  }

  // Getter and Setter for personality_id (optional)
  get oldText(): string | undefined {
    return this._oldText;
  }

  set description(value: string | undefined) {
    this._description = value;
  }

  // Getter and Setter for personality_id (optional)
  get description(): string | undefined {
    return this._description;
  }

  set id(value: number | undefined) {
    this._id = value;
  }

  // Getter and Setter for personality_id (optional)
  get id(): number | undefined {
    return this._id;
  }
}

// CustomersService instance for the Customers model
export const libraryService = new Library();
