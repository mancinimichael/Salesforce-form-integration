export type ElementEmits = {
  (event: 'change', value: string): void
}

export type ElementProps = { element: FormElement; model: string; sector: string }

export type FormElement = {
  id: string
  label: string
  selector: 'input' | 'select' | 'textarea'
  data?: Array<FormElementData>
  type?: 'email' | 'text'
}

type FormElementData = {
  index: number
  value: string
  sector?: string
}

export type FormElements = Array<FormElement>

export type Form = {
  contact: string
  email: string
  phone: string
  subject: string
  description: string
  sector: string
  category: string
  priority: string
}

export type FormKey = keyof Form
