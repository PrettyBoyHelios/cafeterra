export interface Product {
    id?: string;
    name: string;
    available: boolean;
    description: string;
    image: string;
    price: number;
    rating: number;
    storeId: string;
    timesBought: number;
}