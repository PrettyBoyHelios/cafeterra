import { Component, OnInit } from '@angular/core';
import {ShoppingCartService} from '../../services/shopping-cart/shopping-cart.service';
import {OrderItem} from '../../models/order-item';
import {OrderService} from '../../services/order/order.service';
import {ToastController} from '@ionic/angular';
import {Store} from '../../models/store';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.page.html',
  styleUrls: ['./shopping-cart.page.scss'],
})
export class ShoppingCartPage implements OnInit {
  private store: string;
  constructor(
      private shopService: ShoppingCartService,
      private orderService: OrderService,
      private toastController: ToastController,
  ) { }

  ngOnInit() {
  }

  public deleteItem(id: string) {
    this.shopService.removeItemFromOrder(id);
  }

  public async createOrder(items: OrderItem[], store: Store) {
    this.orderService.addOrder(items, store);
    this.shopService.cancelWholeOrder();
    await this.presentToastWithOptions();
  }
  async presentToastWithOptions() {
    const toast = await this.toastController.create({
      header: '¡Tu orden ha sido enviada!',
      message: '',
      position: 'top',
      duration: 1000,
      buttons: [
        {
          side: 'start',
          icon: 'done-all',
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
