import type { Form, FormKey } from '@/types'
import { reactive } from 'vue'

type StoreMethods = {
  resetForm(): void
  updateForm(key: FormKey, value: string): void
}

type StoreParams = {
  form: Form
}

type Store = StoreMethods & StoreParams

export const store = reactive<Store>({
  form: {
    category: '',
    contact: '',
    description: '',
    email: '',
    phone: '',
    priority: '',
    sector: '',
    subject: '',
    tipology: ''
  },
  resetForm() {
    Object.keys(this.form).forEach((key) => this.updateForm(key as FormKey, ''))
  },
  updateForm(key: FormKey, value: string) {
    this.form[key] = value
  }
})
