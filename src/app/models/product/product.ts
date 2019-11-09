import {Store} from '../store';

export interface Product {
    id?: string;
    name?: string;
    available?: boolean;
    description?: string;
    image?: string;
    price?: number;
    rating?: number;
    store?: Store;
    timesBought?: number;
    storeName?: string;
}

export interface Special {
    id?: string;
    productId?: string;
}
