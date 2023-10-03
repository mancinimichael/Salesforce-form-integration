export type Auth = {
  headers: DefaultHeaders
  user: User
}

type DefaultHeaders = {
  Authorization: string
}

type User = {
  contact: string
  email: string
  id: string
  phone: string
  site: string
  team: string
}
