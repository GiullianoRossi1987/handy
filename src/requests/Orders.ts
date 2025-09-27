import { Requester } from '@requests/Requester';
import type { IOrder, IOrderRequest } from '@requests/interfaces/IOrder';

export class OrdersRequester extends Requester {
  public cart: IOrder[] = [];
  private cartUUID: string | null = null;

  constructor(cart?: IOrder[]) {
    super();
    this.cart = cart ?? [];
  }

  public static orderToRequests(order: IOrder): IOrderRequest {
    return { ...order, cartID: order.cart_id };
  }

  public cartToRequests(): IOrderRequest[] {
    return this.cart.map(OrdersRequester.orderToRequests);
  }

  public async GetOrderById(order_id: number): Promise<IOrder> {
    const order = await (
      await fetch(`${this.HandyUrl}/order/${order_id}`, { method: 'GET' })
    ).json();
    return order;
  }

  public async GetOrdersFromCart(cart: string): Promise<IOrder[]> {
    const order = await (
      await fetch(`${this.HandyUrl}/orders/cart/${cart}`, { method: 'GET' })
    ).json();
    return order;
  }

  public async PlaceOrder(order: IOrder): Promise<void> {
    this.cart.push(order);
    const orderRequest = OrdersRequester.orderToRequests(order);
    const response = await fetch(`${this.HandyUrl}/order/`, {
      method: 'POST',
      body: JSON.stringify(orderRequest),
    });
    const orderResponse: IOrder = await response.json();
    if (!orderResponse.cart_id) {
      throw Error('Expected to receive the orders cart UUID');
    }
    this.cartUUID = orderResponse.cart_id;
  }

  public async SyncCart(): Promise<void> {
    if (!this.cartUUID) {
      return;
    }
    const response = await fetch(`${this.HandyUrl}/orders/cart/${this.cartUUID}`, {
      method: 'GET',
    });
    const orders: IOrder[] = await response.json();
    this.cart = orders;
  }

  public async RemoveOrder(order: IOrder): Promise<void> {
    if (!(this.cartUUID || order.id)) {
      return; // the cart must have been created, and must have at least one order
    }
    await fetch(`${this.HandyUrl}/order/${order.id}`, { method: 'DELETE' });
    this.cart = this.cart.filter((o: IOrder) => o.id !== order.id);
  }

  public async UpdateOrder(order: IOrder): Promise<void> {
    if (!(this.cartUUID || order.id)) {
      return; // the cart must have been created, and must have at least one order
    }
    await fetch(`${this.HandyUrl}/order/${order.id}`, {
      method: 'PUT',
      body: JSON.stringify(OrdersRequester.orderToRequests(order)),
    });
    this.cart = this.cart.map((o: IOrder) => (o.id === order.id ? { ...order } : o));
  }
}
