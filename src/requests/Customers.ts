import type { WorkerResponseBody } from '@requests/interfaces/IWorkers'
import type { UpdateUserRequest } from './interfaces/IUsers'
import { Requester } from './Requester'

export class WorkerRequests extends Requester {
  public async GetByUUID(uuid: string): Promise<WorkerResponseBody | null> {
    this.checkDefinedUrl()
    const response = await fetch(`${this.HandyUrl}/worker/${uuid}`, {
      method: 'GET',
    })
    if (response.status === 404) {
      return null
    }
    return await response.json()
  }

  public async AddWorker(user_id: number, payload: UpdateUserRequest): Promise<WorkerResponseBody> {
    this.checkDefinedUrl()
    const response = await fetch(`${this.HandyUrl}/worker/add/${user_id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    })
    return await response.json()
  }

  public async UpdateWorker(uuid: string, payload: UpdateUserRequest): Promise<void> {
    this.checkDefinedUrl()
    await fetch(`${this.HandyUrl}/worker/update/${uuid}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    })
  }

  public async DeleteWorker(uuid: string): Promise<void> {
    this.checkDefinedUrl()
    await fetch(`${this.HandyUrl}/worker/delete/${uuid}`, { method: 'DELETE' })
  }
}
