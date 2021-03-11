export interface MeI {
  createdAt: string
  email: string
  firstName: string
  id: number
  lastName: string
  password: string | number | null
  username: string
}

export type OmitPasswordMe = Omit<MeI, "password">