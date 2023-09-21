//#region TOKEN

export const CLIENT_ID = import.meta.env.VITE_CLIENT_ID

export const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET

export const GRANT_TYPE = import.meta.env.VITE_GRANT_TYPE

export const USERNAME = import.meta.env.VITE_USERNAME

export const PASSWORD = import.meta.env.VITE_PASSWORD

//#endregion

//#region ENDPOINT

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT

export const CASE_ENDPOINT = `${API_ENDPOINT}/data/v58.0/sobjects/Case`

export const CATEGORY_ENDPOINT = `${API_ENDPOINT}/data/v58.0/ui-api/object-info/Case/picklist-values/012000000000000AAA/Category__c`

export const OAUTH_ENDPOINT = `${API_ENDPOINT}/oauth2/token`

export const SECTOR_ENDPOINT = `${API_ENDPOINT}/data/v58.0/ui-api/object-info/Case/picklist-values/012000000000000AAA/Sector__c`

export const TIPOLOGY_ENDPOINT = `${API_ENDPOINT}/data/v58.0/ui-api/object-info/Case/picklist-values/012000000000000AAA/Tipology__c`

//#endregion
