export * from '@/types/api.type'
export * from '@/types/auth.type'
export * from '@/types/form.type'
export * from '@/types/store.type'

export type ApiResponse = { values: Values }

type Value = {
  label: string
  validFor: number[]
  value: string
}

export type Values = Value[]

export type QueryResponse = {
  totalSize: number
  done: boolean
  records: Tickets
}

export type Ticket = {
  Id: string
  Name: string
  Subject__c: string
  Date_Time_Opened__c: string
  Status__c: string
  Sector__c: string
  attributes?: {
    type: string
    url: string
  }
}

export type Tickets = Ticket[]