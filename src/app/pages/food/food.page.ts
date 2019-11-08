import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from "../../services/auth.service";
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
      private authService:AuthService,
      private aufAuth : AngularFireAuth,
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
    this.shopService.addProduct(item);
    await this.presentToastWithOptions(item.name);
  }

  async presentToastWithOptions(prodName: string) {
    const toast = await this.toastController.create({
      header: '¡Añadiste ' + prodName + ' a tu pedido!',
      message: '',
      position: 'top',
      duration: 1000,
      buttons: [
        {
          side: 'start',
          icon: 'pizza',
          text: '',
          handler: () => {
            console.log('Favorite clicked');
          }
        }, {
          text: 'Cerrar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await toast.present();
  }
}
