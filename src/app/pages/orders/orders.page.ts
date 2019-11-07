import { Component, OnInit } from '@angular/core';
import {Order} from '../../models/order';
import {Product} from '../../models/product/product';
import {OrderService} from '../../services/order/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  private orders: Order[] = [];
  constructor(private orderService: OrderService) {
    // this.orders =
  }


  ngOnInit() {
    this.orderService.getOrders().subscribe( res => {
      this.orders = res;
    });
  }

}
