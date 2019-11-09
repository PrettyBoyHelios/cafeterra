import { Injectable } from '@angular/core';
import {OrderItem} from '../../models/order-item';
import {Product} from '../../models/product/product';
import {Store} from '../../models/store';
import {ToastController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  public orderBuilder: OrderItem[] = [];
  public store: Store;
  public totalAmount = 0.0;
  public totalProducts = 0;
  constructor(private toastController: ToastController) {
  }

  public getCartProducts() {
    return this.orderBuilder;
  }

  public async addProduct(item: Product) {
    let productIsAlready = false;
    let isFirstProduct = false;

    if (this.orderBuilder.length === 0) {
      isFirstProduct = true;
    }

    if (isFirstProduct) {
      this.store = item.store;
      this.addedProductToast(item.name);
    } else {
      if (item.store.storeId !== this.store.storeId) {
        console.log('item is not from the same store, not adding');
        await this.presentInfoToast('¡Oops! No puedes hacer una orden de para varios establecimientos. Elimina o ' +
            'finaliza tu orden anterior para añadirlo.');
        return;
      }
    }

    for (const orderItem of this.orderBuilder) {
      if (orderItem.product.id === item.id) {
        productIsAlready = true;
        orderItem.quantity++;
        this.addedProductToast(item.name);
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
        }
      }
    }
    for (const removeId of idToRemove) {
      this.removeItemFromOrder(removeId);
    }
    this.updateTotal();
  }

  public getStore() {
    return this.store;
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
  async presentInfoToast(msg: string) {
    const toast = await this.toastController.create({
      header: msg,
      message: '',
      position: 'top',
      duration: 2000,
      buttons: [
        {
          text: 'Cerrar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await toast.present();
  }

  async addedProductToast(prodName: string) {
    const toast = await this.toastController.create({
      header: '¡Añadiste ' + prodName + ' a tu pedido!',
      message: '',
      position: 'top',
      duration: 1000,
      buttons: [
        {
          side: 'start',
          icon: 'pizza',
          text: '',
          handler: () => {
            console.log('Favorite clicked');
          }
        }, {
          text: 'Cerrar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await toast.present();
  }
}


