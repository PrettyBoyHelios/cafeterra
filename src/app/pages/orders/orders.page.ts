import { Component, OnInit } from '@angular/core';
import {Order} from '../../models/order';
import {Product} from '../../models/product/product';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  orders: Product[];
  constructor() {
    // this.orders =
  }


  ngOnInit() {
  }

}
