import { Requester } from '@requests/Requester';
import type { UserResponse } from '@/requests/interfaces/IUsers';

export class UserMocker extends Requester {
  public async MockCustomer(worker: boolean): Promise<UserResponse> {
    const mock = {
      login: 'mocked',
      password: 'mogged',
      as: worker,
    };
    const response = await fetch(`${this.HandyUrl}/user/add`, {
      method: 'POST',
      body: JSON.stringify(mock),
    });
    return await response.json();
  }
}
