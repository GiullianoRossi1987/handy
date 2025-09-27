import { Requester } from './Requester';
import type { ProductService } from './interfaces/IProductsServices';

export class ProductServiceRequester extends Requester {
  private ProductService: ProductService | null = null;

  constructor(product_service?: ProductService) {
    super();
    if (product_service) {
      this.ProductService = product_service;
    }
  }

  public async GetByWorkerId(workerId: number): Promise<ProductService[]> {
    return await (
      await fetch(`${this.HandyUrl}/worker/catalog/${workerId}`, { method: 'GET' })
    ).json();
  }

  public async GetProdSerById(id: number): Promise<ProductService> {
    return await (await fetch(`${this.HandyUrl}/product-service/${id}`, { method: 'GET' })).json();
  }

  public async AddProductService(): Promise<void> {
    if (!this.ProductService) {
      return;
    }
    await fetch(`${this.HandyUrl}/product-service/`, {
      method: 'POST',
      body: JSON.stringify(this.ProductService),
    });
  }

  public async UpdateProductService(): Promise<void> {
    if (!this.ProductService) {
      return;
    }
    await fetch(`${this.HandyUrl}/product-service/${this.ProductService.id}`, {
      method: 'PUT',
      body: JSON.stringify(this.ProductService),
    });
  }

  public async DeleteProductService(id?: number): Promise<void> {
    const usingId = this.ProductService?.id ?? id;
    if (!usingId) {
      return;
    }
    await fetch(`${this.HandyUrl}/product-service/${usingId}`, { method: 'DELETE' });
  }
}
