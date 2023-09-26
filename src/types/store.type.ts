import type { Form, FormKey } from '@/types/form.type'
import type { Auth } from '@/types/auth.type'

type StoreMethods = {
  resetForm(): void
  updateForm(key: FormKey, value: string): void
}

type StoreParams = {
  auth: Auth
  form: Form
}

export type Store = StoreMethods & StoreParams
