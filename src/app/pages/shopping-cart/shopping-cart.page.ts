import { Component, OnInit } from '@angular/core';
import {ShoppingCartService} from '../../services/shopping-cart/shopping-cart.service';
import {OrderItem} from '../../models/order-item';
import {OrderService} from '../../services/order/order.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.page.html',
  styleUrls: ['./shopping-cart.page.scss'],
})
export class ShoppingCartPage implements OnInit {
  private store: string;
  constructor(
      private shopService: ShoppingCartService,
      private orderService: OrderService,
  ) { }

  ngOnInit() {
  }

  public deleteItem(id: string) {
    this.shopService.removeItemFromOrder(id);
  }

  public createOrder(items: OrderItem[], storeId: string) {
    this.orderService.addOrder(items, storeId);
    this.shopService.cancelWholeOrder();
  }
}
