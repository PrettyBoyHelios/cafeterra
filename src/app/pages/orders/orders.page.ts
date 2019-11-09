import { Component, OnInit } from '@angular/core';
import {Order} from '../../models/order';
import {Product} from '../../models/product/product';
import {OrderService} from '../../services/order/order.service';
import {ModalController} from '@ionic/angular';
import {OrderDetailPage} from '../order-detail/order-detail.page';
import {UserInfoService} from '../../services/user-info.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  private orders: Order[] = [];
  private userUid: string;
  constructor(
      private orderService: OrderService,
      public modalController: ModalController,
      private userInfoService: UserInfoService,
  ) {
  }


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
      this.userUid = res.uid;
    });
  }

  async showOrderDetails(o: Order) {
    const modal = await this.modalController.create({
      component: OrderDetailPage,
      componentProps: {
        order: o,
        details: true,
      }
    });
    return await modal.present();
  }

}
