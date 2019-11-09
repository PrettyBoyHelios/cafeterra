import { Component, OnInit } from '@angular/core';
import {Order} from '../../models/order';
import {Product} from '../../models/product/product';
import {OrderService} from '../../services/order/order.service';
import {ModalController} from '@ionic/angular';
import {OrderDetailPage} from '../order-detail/order-detail.page';
import { AuthService } from '../../services/auth.service'
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  private isClient : boolean;
  private orders: Order[] = [];
  private options: BarcodeScannerOptions;
  
  constructor(
      private orderService: OrderService,
      public modalController: ModalController,
      private authservice: AuthService,
      private barcodeScanner: BarcodeScanner
  ) {
    this.isClient = authservice.clientType;
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
