import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from "../../services/auth.service";
import {ProductService} from '../../services/product.service';
import {Product} from '../../models/product/product';
import {Store} from '../../models/store';
import {Router} from '@angular/router';
import {ShoppingCartService} from '../../services/shopping-cart/shopping-cart.service';
import {storage} from 'firebase';
import {UserInfoService} from '../../services/user-info.service';


@Component({
  selector: 'app-food',
  templateUrl: './food.page.html',
  styleUrls: ['./food.page.scss'],
})

export class FoodPage implements OnInit {
  private products: Product[];
  private resultProducts: Product[];

  private showClient: boolean;
  private searchTerm: string;
  private isSearching = false;

  private name: string;
  private price: number;
  private amount: number;
  private description: string;
  private store: Store = {
    storeName: undefined,
    storeId: undefined
  };
  private newProduct: Product = {
    name: undefined,
    available: undefined,
    description: undefined,
    image: undefined,
    price: undefined,
    rating: undefined,
    timesBought: undefined,
    store: this.store
  };
  constructor(
      private authService: AuthService,
      private aufAuth: AngularFireAuth,
      private prodService: ProductService,
      private shopService: ShoppingCartService,
      private router: Router,
      private userInfoService: UserInfoService,
  ) {}

  ngOnInit() {
    this.prodService.getProducts().subscribe( res => {
      this.products = res;
    });
    this.userInfoService.getUserType().subscribe( res => {
      this.showClient = res.isClient;
    });
  }

  async addProductToShoppingCart(item: Product) {
    await this.shopService.addProduct(item);
    this.searchTerm = '';
  }

  async addProductToDB() {
    this.newProduct.name = this.name;
    this.newProduct.description = this.description;
    this.newProduct.price = this.price;
    this.newProduct.available = true;
    this.newProduct.timesBought = 0;
    this.newProduct.rating = 0;
    this.newProduct.image = '';
    this.newProduct.store.storeName = '';
    this.newProduct.store.storeId = '1';
    console.log(this.newProduct);
    await this.prodService.addProduct(this.newProduct);
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
