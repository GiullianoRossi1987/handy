import type { Email } from '@requests/interfaces/ISatellites'
import { Requester } from '@requests/Requester'

export interface EmailBody {
  worker?: number
  customer?: number
  email: string
  active: boolean
}

export class EmailsRequests extends Requester {
  public static EmailToBody(email: Email): EmailBody {
    return {
      email: email.email,
      worker: email.workerId,
      customer: email.customerId,
      active: email.active,
    }
  }

  public async AddEmail(email: Email): Promise<number> {
    this.checkDefinedUrl()
    const response = await fetch(`${this.HandyUrl}/emails`, {
      method: 'POST',
      body: JSON.stringify(EmailsRequests.EmailToBody(email)),
    })
    return (await response.json()).Id
  }

  public async UpdateEmail(email: Email): Promise<void> {
    this.checkDefinedUrl()
    await fetch(`${this.HandyUrl}/emails/${email.id}`, {
      method: 'PUT',
      body: JSON.stringify(EmailsRequests.EmailToBody(email)),
    })
  }

  public async DeleteEmail(email_id: number): Promise<void> {
    this.checkDefinedUrl()
    await fetch(`${this.HandyUrl}/emails/${email_id}`, { method: 'DELETE' })
  }
}
