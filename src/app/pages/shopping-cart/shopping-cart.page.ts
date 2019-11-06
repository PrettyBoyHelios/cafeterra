import { Component, OnInit } from '@angular/core';
import {ShoppingCartService} from '../../services/shopping-cart/shopping-cart.service';
import {OrderItem} from '../../models/order-item';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.page.html',
  styleUrls: ['./shopping-cart.page.scss'],
})
export class ShoppingCartPage implements OnInit {
  private store: string;
  constructor(private shopService: ShoppingCartService) { }

  ngOnInit() {
    this.store = this.shopService.getStore();
  }

  public deleteItem(id: string) {
    this.shopService.removeItemFromOrder(id);
  }
}
