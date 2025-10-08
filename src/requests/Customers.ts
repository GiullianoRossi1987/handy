import type { UpdateUserRequest, CustomerWorkerResponse } from '@requests/interfaces/IUsers';
import { Requester } from '@requests/Requester';

export class CustomerRequests extends Requester {
  public async GetByUUID(uuid: string): Promise<CustomerWorkerResponse | null> {
    this.checkDefinedUrl();
    const response = await fetch(`${this.HandyUrl}/customer/${uuid}`, {
      method: 'GET',
    });
    if (response.status === 404) {
      return null;
    }
    return await response.json();
  }

  public async AddCustomer(
    user_id: number,
    payload: UpdateUserRequest,
  ): Promise<CustomerWorkerResponse> {
    this.checkDefinedUrl();
    const response = await fetch(`${this.HandyUrl}/customer/add/${user_id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
    return await response.json();
  }

  public async UpdateCustomer(uuid: string, payload: UpdateUserRequest): Promise<void> {
    this.checkDefinedUrl();
    await fetch(`${this.HandyUrl}/customer/update/${uuid}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
  }

  public async DeleteCustomer(uuid: string): Promise<void> {
    this.checkDefinedUrl();
    await fetch(`${this.HandyUrl}/customer/delete/${uuid}`, { method: 'DELETE' });
  }
}
