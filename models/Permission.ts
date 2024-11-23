import { apiService } from "~/routes/api/API";

class Permission {
    // Document map permissions (Button authorizations)

    // Action permissions
    private _CREATE = "CREATE";
    private _UPDATE = "UPDATE";
    private _DELETE = "DELETE";
    private _VIEW = "VIEW";

    // Routes for different entities (Numeric values from database)
    private _USER_ACCOUNTS = "USER_ACCOUNTS";
    private _BUTTON_AUTHORIZATIONS = "BUTTON_AUTHORIZATIONS";
    private _LIBRARIES = "LIBRARIES";
    private _CUSTOMERS = "CUSTOMERS";
    private _CUSTOMER_GROUPS = "CUSTOMER_GROUPS";
    private _EMPLOYEES = "EMPLOYEES";
    private _FACTOR_RATES = "FACTOR_RATES";
    private _PAYMENT_DURATIONS = "PAYMENT_DURATIONS";
    private _PAYMENT_FREQUENCIES = "PAYMENT_FREQUENCIES";
    private _PERSONALITIES = "PERSONALITIES";
    private _DOCUMENT_MAPS = "DOCUMENT_MAPS";
    private _DOCUMENT_MAP_PERMISSIONS = "DOCUMENT_MAP_PERMISSIONS";
    private _DOCUMENT_PERMISSIONS = "DOCUMENT_PERMISSIONS";
    private _LOAN_COUNTS = "LOAN_COUNTS";
    private _FEES = "FEES";

    // Getters for action permissions
    get CREATE() {
        return this._CREATE;
    }

    get UPDATE() {
        return this._UPDATE;
    }

    get DELETE() {
        return this._DELETE;
    }

    get VIEW() {
        return this._VIEW;
    }

    // Getters for entity routes
    get USER_ACCOUNTS() {
        return this._USER_ACCOUNTS;
    }

    get BUTTON_AUTHORIZATIONS() {
        return this._BUTTON_AUTHORIZATIONS;
    }

    get LIBRARIES() {
        return this._LIBRARIES;
    }

    get CUSTOMERS() {
        return this._CUSTOMERS;
    }

    get CUSTOMER_GROUPS() {
        return this._CUSTOMER_GROUPS;
    }

    get EMPLOYEES() {
        return this._EMPLOYEES;
    }

    get FACTOR_RATES() {
        return this._FACTOR_RATES;
    }

    get PAYMENT_DURATIONS() {
        return this._PAYMENT_DURATIONS;
    }

    get PAYMENT_FREQUENCIES() {
        return this._PAYMENT_FREQUENCIES;
    }

    get PERSONALITIES() {
        return this._PERSONALITIES;
    }

    get DOCUMENT_MAPS() {
        return this._DOCUMENT_MAPS;
    }

    get DOCUMENT_MAP_PERMISSIONS() {
        return this._DOCUMENT_MAP_PERMISSIONS;
    }

    get DOCUMENT_PERMISSIONS() {
        return this._DOCUMENT_PERMISSIONS;
    }

    get LOAN_COUNTS() {
        return this._LOAN_COUNTS;
    }

    get FEES() {
        return this._FEES;
    }
}

export const PermissionService = new Permission();
