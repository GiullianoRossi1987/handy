import type { Email, Phone, Address } from '@requests/interfaces/ISatellites'

export interface LoginRequestBody {
  login: string
  password: string
}

export interface LoginResponse {
  login: string
  success: boolean
  id: number
  attempted_at: string
}

export interface CreateUserRequest extends LoginRequestBody {
  as: boolean
}

export interface LoginDataResponse {
  login: string
  id: number
  created_at: string
  updated_at: string
}

export interface CreateUserRequest extends LoginRequestBody {
  as: boolean
}

export interface UpdateUserRequest {
  name: string
  active: boolean
  phones: Phone[]
  emails: Email[]
  addresses: Address[]
}
