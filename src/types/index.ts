export type Form = {
  category: string
  contact: string
  description: string
  email: string
  phone: string
  priority: string
  sector: string
  sparta: string
  subject: string
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

type Option = {
  id: number
  value: string
  sectorId?: string
}

type Options = Option[]
