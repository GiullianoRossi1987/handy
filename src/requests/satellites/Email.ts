import type { Email } from '@requests/interfaces/ISatellites';
import { Requester } from '@requests/Requester';

export interface EmailBody {
  worker?: number;
  customer?: number;
  email: string;
  active: boolean;
}

export class EmailsRequests extends Requester {
  public emailBody: EmailBody | null = null;
  public email: Email | null = null;

  constructor(email: Email) {
    super();
    this.emailBody = {
      email: email.email,
      worker: email.workerId,
      customer: email.customerId,
      active: email.active,
    };
    this.email = email;
  }

  public async AddEmail(): Promise<number> {
    this.checkDefinedUrl();
    const response = await fetch(`${this.HandyUrl}/emails`, {
      method: 'POST',
      body: JSON.stringify(this.emailBody),
    });
    return (await response.json()).Id;
  }

  public async UpdateEmail(): Promise<void> {
    this.checkDefinedUrl();
    await fetch(`${this.HandyUrl}/emails/${this.email?.id}`, {
      method: 'PUT',
      body: JSON.stringify(this.emailBody),
    });
  }

  public async DeleteEmail(): Promise<void> {
    this.checkDefinedUrl();
    await fetch(`${this.HandyUrl}/emails/${this.email?.id}`, { method: 'DELETE' });
  }
}
