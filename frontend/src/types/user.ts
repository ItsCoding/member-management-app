export type User = {
  id: string,
  firstname: string,
  lastname: string
  birthdate?: Date,
  address?: string
  email?: string,
  phone?: string,
  webaccess: boolean,
}