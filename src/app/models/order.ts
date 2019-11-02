import {OrderItem} from './order-item';
import {Store} from './store';

export interface Order {
    totalAmount?: number;
    items?: OrderItem[];
    store?: Store;
}
