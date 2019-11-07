import {Product} from './product/product';

export interface OrderItem {
    product: Product;
    quantity: number;
}

export interface OrderItemI {
    productId: string;
    quantity: number;
}
