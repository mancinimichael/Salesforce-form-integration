export type Auth = {
  bearer: string
  user: User
}

type User = {
  contact: string
  email: string
  id: string
  phone: string
  site: string
  team: string
}
