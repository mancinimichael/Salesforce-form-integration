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
