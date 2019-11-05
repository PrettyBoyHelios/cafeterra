import { Component, OnInit } from '@angular/core';
import {Order} from '../../models/order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  orders: Order[];
  constructor() {
    this.orders = [
      {
        store: {
          storeName: 'Banquetes Mary',
        },
        totalAmount: 84.50,
        items: [
          {
            productId: 'suabdaisdsaasfas',
            productName: 'Coca-Cola Light',
            quantity: 1,
            price: 12.50,
          },
        ]
      }
    ];
  }


  ngOnInit() {
  }

}
