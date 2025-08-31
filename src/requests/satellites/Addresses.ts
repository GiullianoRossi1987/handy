import type { Address } from '@requests/interfaces/ISatellites'
import { Requester } from '@requests/Requester'

export interface AddrBody {
  worker?: number
  customer?: number
  address: string
  number: string
  city: string
  uf: string
  country: string
  main: boolean
  active: boolean
}

export class AddressRequests extends Requester {
  public static AddrToBody(addr: Address): AddrBody {
    return {
      worker: addr.workerId,
      customer: addr.customerId,
      ...addr,
    }
  }

  public async AddAddr(addr: Address): Promise<number> {
    const response = await fetch(`${this.HandyUrl}/address/`, {
      method: 'POST',
      body: JSON.stringify(AddressRequests.AddrToBody(addr)),
    })
    return (await response.json()).Id
  }

  public async UpdateAddr(addr: Address): Promise<void> {
    await fetch(`${this.HandyUrl}/address/${addr.id}`, {
      method: 'PUT',
      body: JSON.stringify(AddressRequests.AddrToBody(addr)),
    })
  }

  public async DeleteAddr(addr_id: number): Promise<void> {
    await fetch(`${this.HandyUrl}/address/${addr_id}`, {
      method: 'DELETE',
    })
  }
}
