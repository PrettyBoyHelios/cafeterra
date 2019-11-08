import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../services/product.service';
import {Product} from '../../models/product/product';
import {Router} from '@angular/router';
import {ShoppingCartService} from '../../services/shopping-cart/shopping-cart.service';


@Component({
  selector: 'app-food',
  templateUrl: './food.page.html',
  styleUrls: ['./food.page.scss'],
})
export class FoodPage implements OnInit {
  private products: Product[];
  private resultProducts: Product[];
  private searchTerm: string;
  private isSearching = false;
  constructor(
      private prodService: ProductService,
      private shopService: ShoppingCartService,
      private router: Router,
  ) {}

  ngOnInit() {
    this.prodService.getProducts().subscribe( res => {
      this.products = res;
    });
  }

  async addProductToShoppingCart(item: Product) {
    await this.shopService.addProduct(item);
    this.searchTerm = '';
  }

  public onSearchTerm() {
    console.log('searching for ', this.searchTerm);
    if ( this.searchTerm === '') {
      this.isSearching = false;
      return;
    }
    this.isSearching = true;
    this.resultProducts = this.products.filter( item => item.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }
}
