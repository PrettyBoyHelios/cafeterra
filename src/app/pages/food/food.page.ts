import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../services/product.service';
import {Order} from '../../models/order';
import {Product} from '../../models/product/product';
import {Router, Routes} from '@angular/router';
import {TabsPage} from '../tabs/tabs.page';
import {ShoppingCartService} from '../../services/shopping-cart/shopping-cart.service';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-food',
  templateUrl: './food.page.html',
  styleUrls: ['./food.page.scss'],
})
export class FoodPage implements OnInit {
  private products: Product[];
  constructor(
      private prodService: ProductService,
      private shopService: ShoppingCartService,
      private router: Router,
      private toastController: ToastController,
  ) {}

  ngOnInit() {
    this.prodService.getProducts().subscribe( res => {
      this.products = res;
    });
  }

  async goToShoppingCart() {
    await this.router.navigate(['shopping-cart']);
  }

  async addProductToShoppingCart(item: Product) {
    await this.shopService.addProduct(item);
  }
}
