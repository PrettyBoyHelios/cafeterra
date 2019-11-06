import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../services/product.service';
import {Order} from '../../models/order';
import {Product} from '../../models/product/product';
import {Router, Routes} from '@angular/router';
import {TabsPage} from '../tabs/tabs.page';

@Component({
  selector: 'app-food',
  templateUrl: './food.page.html',
  styleUrls: ['./food.page.scss'],
})
export class FoodPage implements OnInit {
  private products: Product[];
  constructor(private prodService: ProductService, private router: Router) {}

  ngOnInit() {
    this.prodService.getProducts().subscribe( res => {
      this.products = res;
    });
  }

  async goToShoppingCart() {
    await this.router.navigate(['shopping-cart']);
  }
}
