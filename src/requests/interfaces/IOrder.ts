export interface IOrder {
  id?: number;
  id_product_service: number;
  customer_id: number;
  requesterd_at: string;
  deployed_at?: string | null;
  schedule_to?: string | null;
  description: string;
  id_worker_addr?: number | null;
  id_customer_add?: number | null;
  online: boolean;
  qtd: number;
  qtd_at_time: number;
  total: number;
  rating?: number;
  feedback?: string;
  updated_at: string;
  cart_id?: string;
}

export interface IOrderRequest extends IOrder {
  cartID?: string;
}
