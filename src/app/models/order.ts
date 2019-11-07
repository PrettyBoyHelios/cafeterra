import {OrderItem} from './order-item';

export interface Order {
    id?: string;
    totalAmount: number;
    products: OrderItem[];
    storeId: string;
    userId: string;
    status: string;
    timeCreated: number;
}
