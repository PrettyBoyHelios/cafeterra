import {Component, Input, OnInit} from '@angular/core';
import {Order} from '../../models/order';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.page.html',
  styleUrls: ['./order-detail.page.scss'],
})
export class OrderDetailPage implements OnInit {
  @Input() order: Order;
  @Input() details: boolean;
  constructor(
      private modalController: ModalController
  ) { }

  ngOnInit() {
    console.log(this.order);
  }

  public async dismiss() {
    await this.modalController.dismiss();
  }

}
