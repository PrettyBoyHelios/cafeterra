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

}
