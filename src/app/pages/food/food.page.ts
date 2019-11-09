import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../../services/auth.service';
import {ProductService} from '../../services/product.service';
import {Product} from '../../models/product/product';
import {Store} from '../../models/store';
import {Router} from '@angular/router';
import {ShoppingCartService} from '../../services/shopping-cart/shopping-cart.service';
import {UserInfoService} from '../../services/user-info.service';
import {ModalController} from '@ionic/angular';
import {CreateProductPage} from '../create-product/create-product.page';


@Component({
  selector: 'app-food',
  templateUrl: './food.page.html',
  styleUrls: ['./food.page.scss'],
})

export class FoodPage implements OnInit {
  private products: Product[];
  private resultProducts: Product[];

  // Behaviour Vars
  private showClient: boolean;

  // Search vars
  private searchTerm: string;
  private isSearching = false;
  private store: Store;
  constructor(
      private authService: AuthService,
      private aufAuth: AngularFireAuth,
      private prodService: ProductService,
      private shopService: ShoppingCartService,
      private router: Router,
      private userInfoService: UserInfoService,
      private modalController: ModalController,
  ) {}

  ngOnInit() {
    this.prodService.getProducts().subscribe( res => {
      this.products = res;
    });
    this.userInfoService.getUserType().subscribe( res => {
      this.showClient = res.isClient;
      if (this.showClient) {
        localStorage.setItem('showClient', 'true');
      }
      if (!this.showClient) {
        localStorage.setItem('showClient', 'false');
      }
      this.store = res.store;
      console.log(localStorage);
      console.log('oBTAINED STORE: ', this.store);
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

  public async openNewProductModal() {
    const modal = await this.modalController.create({
      component: CreateProductPage,
      componentProps: {
        store: this.store,
      }
    });
    return await modal.present();
  }

  public delete(id: string) {
    this.prodService.removeProduct(id);
  }
}
