interface Satellite {
  id: number
  workerId?: number
  customerId?: number
  created_at: string
  updated_at: string
  active: boolean
}

export interface Phone extends Satellite {
  number: string
  area_code: string
}

export interface Email extends Satellite {
  email: string
}

export interface Address extends Satellite {
  address: string
  number: string
  city: string
  uf: string
  country: string
  main: boolean
}
