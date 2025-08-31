import type { Phone } from '@requests/interfaces/ISatellites'
import { Requester } from '@requests/Requester'

export interface PhoneBody {
  worker?: number
  customer?: number
  number: string
  area_code: string
  active: boolean
}

export class PhoneRequests extends Requester {
  public static PhoneToBody(phone: Phone): PhoneBody {
    return {
      worker: phone.workerId,
      customer: phone.customerId,
      number: phone.number,
      area_code: phone.area_code,
      active: phone.active,
    }
  }

  public async AddPhone(phone: Phone): Promise<number> {
    const response = await fetch(`${this.HandyUrl}/phone/`, {
      method: 'POST',
      body: JSON.stringify(PhoneRequests.PhoneToBody(phone)),
    })
    return (await response.json()).Id
  }

  public async UpdatePhone(phone: Phone): Promise<void> {
    await fetch(`${this.HandyUrl}/phone/update/${phone.id}`, {
      method: 'PUT',
      body: JSON.stringify(PhoneRequests.PhoneToBody(phone)),
    })
  }

  public async DeletePhone(phone_id: number): Promise<void> {
    await fetch(`${this.HandyUrl}/phone/update/${phone_id}`, {
      method: 'DELETE',
    })
  }
}
