import type {
  LoginRequestBody,
  LoginResponse,
  LoginDataResponse,
  UpdateUserRequest,
  CreateUserRequest,
} from '@requests/interfaces/IUsers'
import { Requester } from '@requests/Requester'

export class UsersRequests extends Requester {
  public async Login(username: string, password: string): Promise<LoginResponse> {
    this.checkDefinedUrl()
    const payload: LoginRequestBody = {
      login: username,
      password,
    }
    const response = await fetch(this.HandyUrl, {
      method: 'POST',
      body: JSON.stringify(payload),
    })
    return await response.json()
  }

  public async GetUserDataByLogin(login: string): Promise<LoginDataResponse> {
    this.checkDefinedUrl()
    const response = await fetch(`${this.HandyUrl}/get-login/${login}`, {
      method: 'GET',
    })
    return await response.json()
  }

  public async UpdateUser(id: number, payload: UpdateUserRequest): Promise<void> {
    this.checkDefinedUrl()
    const response = await fetch(`${this.HandyUrl}/user/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    })
    if (response.status !== 200) {
      throw new Error(`User update error: ${response.statusText}`)
    }
  }

  public async AddUser(login: string, password: string, is_proprietary: boolean): Promise<number> {
    const payload: CreateUserRequest = {
      login,
      password,
      as: is_proprietary,
    }
    const response = await fetch(this.HandyUrl, { method: 'POST', body: JSON.stringify(payload) })
    const jsonResponse = await response.json()
    return Number(jsonResponse.Id)
  }

  public async DeleteUser(id: number): Promise<void> {
    this.checkDefinedUrl()
    await fetch(`${this.HandyUrl}/user/${id}`, {
      method: 'DELETE',
    })
  }
}
