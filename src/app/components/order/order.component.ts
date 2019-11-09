import {Component, Input, OnInit} from '@angular/core';
import {Order} from '../../models/order';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  private showClient: boolean;
  @Input() order: Order;
  @Input() details: boolean;
  private qrData: string;
  constructor() {
    this.details = false;
    this.qrData = 'www.google.com';
  }

  ngOnInit() {
    this.showClient = true;
    if (localStorage.getItem('showClient') === 'false') {
      this.showClient = false;
    }
  }

}

