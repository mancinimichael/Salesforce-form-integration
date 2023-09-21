import type { Form, FormKey } from '@/types'
import { reactive } from 'vue'

type StoreMethods = {
  resetForm(): void
  updateForm(key: FormKey, value: string): void
}

type StoreParams = {
  form: Form
  bearer?: string
}

type Store = StoreMethods & StoreParams

export const store = reactive<Store>({
  form: {
    category: '',
    contact: 'Michael Mancini',
    contactId: '',
    description: '',
    email: 'michael.mancini@covisian.com',
    phone: '+39 345 7781791',
    priority: '',
    sector: '',
    subject: '',
    tipology: ''
  },
  resetForm() {
    Object.keys(this.form).forEach((key) => this.updateForm(key as FormKey, ''))
  },
  updateForm(key: FormKey, value: string) {
    if (key === 'sector') {
      this.form.category = ''
      this.form.priority = ''
      this.form.tipology = ''
    }

    this.form[key] = value
  }
})
