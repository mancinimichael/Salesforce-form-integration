const SALESFORCE_ENDPOINT = import.meta.env.VITE_SALESFORCE_ENDPOINT

export const SALESFORCE_CLIENT_ID = import.meta.env.VITE_SALESFORCE_CLIENT_ID

export const SALESFORCE_CLIENT_SECRET = import.meta.env.VITE_SALESFORCE_CLIENT_SECRET

export const SALESFORCE_GRANT_TYPE = import.meta.env.VITE_SALESFORCE_GRANT_TYPE

export const SALESFORCE_USERNAME = import.meta.env.VITE_SALESFORCE_USERNAME

export const SALESFORCE_PASSWORD = import.meta.env.VITE_SALESFORCE_PASSWORD

export const SALESFORCE_OAUTH_ENDPOINT = `${SALESFORCE_ENDPOINT}/oauth2/token`

const SALESFORCE_API_ENDPOINT = `${SALESFORCE_ENDPOINT}/data/v58.0/ui-api/object-info/Case/picklist-values/012000000000000AAA`

export const QUERY_ENDPOINT = `${SALESFORCE_ENDPOINT}/data/v58.0/query/`

export const APPLICATION_ENDPOINT = `${SALESFORCE_API_ENDPOINT}/Application__c`

export const CASE_ENDPOINT = `${SALESFORCE_ENDPOINT}/data/v58.0/sobjects/Case`

export const CASE_INTERNAL_ENDPOINT = `${SALESFORCE_ENDPOINT}/data/v58.0/sobjects/CaseInternal__c`

export const CATEGORY_ENDPOINT = `${SALESFORCE_API_ENDPOINT}/Category__c`

export const SECTOR_ENDPOINT = `${SALESFORCE_API_ENDPOINT}/Sector__c`

export const TIPOLOGY_ENDPOINT = `${SALESFORCE_API_ENDPOINT}/Tipology__c`

export const SPARTA_ENDPOINT = import.meta.env.VITE_SPARTA_ENDPOINT
