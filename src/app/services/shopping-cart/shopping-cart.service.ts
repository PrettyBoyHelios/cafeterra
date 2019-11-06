import { Injectable } from '@angular/core';
import {OrderItem} from '../../models/order-item';
import {Product} from '../../models/product/product';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  public orderBuilder: OrderItem[] = [];
  constructor() {
  }

  public getCartProducts() {
    return this.orderBuilder;
  }

  public addProduct(item: Product) {
    let productIsAlready = false;

    for (const orderItem of this.orderBuilder) {
      if (orderItem.product.id === item.id) {
        productIsAlready = true;
        orderItem.quantity++;
      }
    }
    if (!productIsAlready) {
      const order: OrderItem = {
        product: item,
        quantity: 1
      };
      this.orderBuilder.push(order);
    }
    console.log(this.orderBuilder);
  }

  public cancelWholeOrder() {
    this.orderBuilder = [];
  }

  public removeItemFromOrder() {
    this.orderBuilder = [];
  }
}


