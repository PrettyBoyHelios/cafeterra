import { Component, OnInit } from '@angular/core';
import {ShoppingCartService} from '../../services/shopping-cart/shopping-cart.service';
import {OrderItem} from '../../models/order-item';
import {OrderService} from '../../services/order/order.service';
import {ModalController, ToastController} from '@ionic/angular';
import {Store} from '../../models/store';
import {UserInfoService} from '../../services/user-info.service';
import {Order} from '../../models/order';
import {OrderDetailPage} from '../order-detail/order-detail.page';
import {OrderVendorPage} from '../order-vendor/order-vendor.page';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.page.html',
  styleUrls: ['./shopping-cart.page.scss'],
})
export class ShoppingCartPage implements OnInit {
  private userId = '';
  private showClient: boolean;
  private orders: Order[] = [];
  constructor(
      private shopService: ShoppingCartService,
      private orderService: OrderService,
      private toastController: ToastController,
      private userInfoService: UserInfoService,
      private modalController: ModalController,
  ) { }

  ngOnInit() {
    this.orderService.getOrders().subscribe( res => {
      res.sort((a, b) => {
        if (a.timeCreated > b.timeCreated) {
          return -1;
        }
        if (b.timeCreated > a.timeCreated) {
          return 1;
        }
        return 0;
      });
      this.orders = res;
    });
    this.userInfoService.getUserType().subscribe( res => {
      this.userId = res.uid;
    });
    this.showClient = (localStorage.getItem('showClient') === 'true');
  }

  public deleteItem(id: string) {
    this.shopService.removeItemFromOrder(id);
  }

  public async createOrder(items: OrderItem[], store: Store) {
    this.orderService.addOrder(items, store, this.userId);
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

  async showOrderDetailsVendor(o: Order) {
    const modal = await this.modalController.create({
      component: OrderVendorPage,
      componentProps: {
        order: o,
        details: true,
      }
    });
    return await modal.present();
  }
}
