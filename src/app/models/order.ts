import {OrderItem} from './order-item';
import {Store} from './store';

export class Order {
    id: string;
    totalAmount: number;
    items: OrderItem[];
    store: Store;
}
