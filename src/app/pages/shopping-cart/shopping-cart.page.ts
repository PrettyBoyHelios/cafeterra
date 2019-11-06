import { Component, OnInit } from '@angular/core';
import {ShoppingCartService} from '../../services/shopping-cart/shopping-cart.service';
import {OrderItem} from '../../models/order-item';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.page.html',
  styleUrls: ['./shopping-cart.page.scss'],
})
export class ShoppingCartPage implements OnInit {
  private productsInCart: OrderItem[];
  constructor(private shopService: ShoppingCartService) { }

  ngOnInit() {
    this.productsInCart = this.shopService.getCartProducts();
  }

}
