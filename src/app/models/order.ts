import {OrderItemI} from './order-item';

export interface Order {
    id?: string;
    totalAmount: number;
    products: OrderItemI[];
    storeId: string;
    userId: string;
    status: string;
}
