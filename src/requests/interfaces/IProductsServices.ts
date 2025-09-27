export interface ProductService {
  id: number;
  worker_id?: number;
  worker?: number;
  name: string;
  description: string;
  available: boolean;
  quantity: number | null;
  service: boolean;
  created_at?: string;
  updated_at?: string;
}
