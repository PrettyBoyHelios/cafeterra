import {OrderItem} from './order-item';
import {Store} from './store';

export interface Order {
    id?: string;
    totalAmount: number;
    products: OrderItem[];
    store: Store;
    userId: string;
    status: string;
    timeCreated: number;
    nameClient: string;
}
