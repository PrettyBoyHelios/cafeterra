import {Component, Input, OnInit} from '@angular/core';
import {Order} from '../../models/order';
import {ModalController} from '@ionic/angular';
import {OrderService} from '../../services/order/order.service';

@Component({
  selector: 'app-order-vendor',
  templateUrl: './order-vendor.page.html',
  styleUrls: ['./order-vendor.page.scss'],
})
export class OrderVendorPage implements OnInit {
  @Input() order: Order;
  constructor(
      private modalController: ModalController,
      private orderService: OrderService,
  ) { }

  ngOnInit() {
  }

  public async updateStatus(order: Order, status: string) {
    this.orderService.updateOrderStatus(order, status);
    await this.dismiss();
  }

  async dismiss() {
    await this.modalController.dismiss();
  }
}
