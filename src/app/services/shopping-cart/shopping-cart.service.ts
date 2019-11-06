import { Injectable } from '@angular/core';
import {OrderItem} from '../../models/order-item';
import {Product} from '../../models/product/product';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  public orderBuilder: OrderItem[] = [];
  public storeId: string;
  public totalAmount = 0.0;
  public totalProducts = 0;
  constructor() {
  }

  public getCartProducts() {
    return this.orderBuilder;
  }

  public addProduct(item: Product) {
    let productIsAlready = false;
    let isFirstProduct = false;

    if (this.orderBuilder.length === 0) {
      isFirstProduct = true;
    }

    if (isFirstProduct) {
      this.storeId = item.storeId;
    } else {
      if (item.storeId !== this.storeId) {
        console.log('item is not from the same store, not adding');
        return;
      }
    }

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
    this.updateTotal();
  }

  public cancelWholeOrder() {
    this.orderBuilder = [];
    this.updateTotal();
  }

  public removeItemFromOrder(id: string) {
    console.log('Before deletion: ', this.orderBuilder);
    console.log('deleting', id);
    const auxOrder: OrderItem[] = [];
    for (const orderItem of this.orderBuilder) {
      console.log('id', orderItem.product.id);
      if (orderItem.product.id !== id) {
        console.log('pushing', orderItem.product.name);
        auxOrder.push(orderItem);
      }
    }
    this.orderBuilder = auxOrder;
    console.log('New Array', this.orderBuilder);
    this.updateTotal();
  }

  public addOneItem(id: string) {
    for (const orderItem of this.orderBuilder) {
      if (orderItem.product.id === id && orderItem.quantity <= 9) {
        orderItem.quantity++;
      }
    }
    this.updateTotal();
  }

  public removeOneItem(id: string) {
    const idToRemove: string[] = [];
    for (const orderItem of this.orderBuilder) {
      if (orderItem.product.id === id && orderItem.quantity >= 1) {
        orderItem.quantity--;
        if (orderItem.quantity === 0.0 ) {
          console.log('deleting from list...');
          idToRemove.push(orderItem.product.id);
          // TODO Create function to delete several ids using a set

        }
      }
    }
    for (const removeId of idToRemove) {
      this.removeItemFromOrder(removeId);
    }
    this.updateTotal();
  }

  public getStore() {
    return this.storeId;
  }

  private updateTotal() {
    let sum = 0.0;
    let prods = 0;
    for (const orderItem of this.orderBuilder) {
      sum += orderItem.quantity * orderItem.product.price;
      prods += orderItem.quantity;
    }
    this.totalAmount = sum * 1.05;
    this.totalProducts = prods;
  }
}


