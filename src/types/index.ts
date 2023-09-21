//#region API

export type ApiResponse = { values: Values }

export type OauthApiResponse = {
  access_token: string
  id_token?: string
  token_type: string
}

type Value = {
  label: string
  validFor: number[]
  value: string
}

export type Values = Value[]

//#endregion

//#region FORM

export type Form = {
  application: string
  category: string
  contact: string
  contactId: string
  description: string
  email: string
  phone: string
  priority: string
  sector: string
  site: string
  subject: string
  team: string
  tipology: string
}

export type FormItem = {
  id: FormKey
  label: string
  selector: 'input' | 'textarea' | 'option'
  options?: Options
  type?: 'email' | 'text'
  value?: string
}

export type FormItems = FormItem[]

export type FormKey = keyof Form

export type Option = {
  id: number
  value: string
  sectorId?: string
}

type Options = Option[]

//#endregion

//#region PROPS

export type FormItemProps = {
  item: FormItem
}

export type TheFormProps = { form: Form }

//#endregion

//#region STORE

type StoreMethods = {
  resetForm(): void
  updateForm(key: FormKey, value: string): void
}

type StoreParams = {
  form: Form
  bearer?: string
}

export type Store = StoreMethods & StoreParams

//#endregion
