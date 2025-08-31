import type { ReportBody } from '@requests/interfaces/IReports'
import { Requester } from '@requests/Requester'

export class ReportsRequests extends Requester {
  public async GetCustomerReports(customer_id: number): Promise<ReportBody[]> {
    this.checkDefinedUrl()
    const response = await fetch(`${this.HandyUrl}/customer/reports/${customer_id}`, {
      method: 'GET',
    })
    return await response.json()
  }

  public async GetWorkerReports(worker_id: number): Promise<ReportBody[]> {
    this.checkDefinedUrl()
    const response = await fetch(`${this.HandyUrl}/worker/reports/${worker_id}`, {
      method: 'GET',
    })
    return await response.json()
  }

  public async ReportCustomer(report: ReportBody): Promise<ReportBody> {
    this.checkDefinedUrl()
    const response = await fetch(`${this.HandyUrl}/customer/report`, {
      method: 'POST',
      body: JSON.stringify(report),
    })
    return await response.json()
  }

  public async ReportWorker(report: ReportBody): Promise<ReportBody> {
    this.checkDefinedUrl()
    const response = await fetch(`${this.HandyUrl}/worker/report`, {
      method: 'POST',
      body: JSON.stringify(report),
    })
    return await response.json()
  }

  public async UpdateWorkerReport(report: ReportBody): Promise<void> {
    this.checkDefinedUrl()
    await fetch(`${this.HandyUrl}/worker/report/${report.id}`, {
      method: 'PUT',
      body: JSON.stringify(report),
    })
  }

  public async UpdateCustomerReport(report: ReportBody): Promise<void> {
    this.checkDefinedUrl()
    await fetch(`${this.HandyUrl}/customer/report/${report.id}`, {
      method: 'PUT',
      body: JSON.stringify(report),
    })
  }

  public async DeleteWorkerReport(report: ReportBody): Promise<void> {
    this.checkDefinedUrl()
    await fetch(`${this.HandyUrl}/worker/report/${report.id}`, {
      method: 'DELETE',
      body: JSON.stringify(report),
    })
  }

  public async DeleteCustomerReport(report: ReportBody): Promise<void> {
    this.checkDefinedUrl()
    await fetch(`${this.HandyUrl}/customer/report/${report.id}`, {
      method: 'DELETE',
      body: JSON.stringify(report),
    })
  }
}
