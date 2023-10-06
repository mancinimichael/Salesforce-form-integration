export type Form = {
  application: string
  category: string
  categoryDescription: string
  description: string
  priority: string
  sector: string
  subject: string
  tipology: string
}

export type FormItem = {
  id: FormKey
  label: string
  selector: 'input' | 'textarea' | 'option'
  order: number
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
