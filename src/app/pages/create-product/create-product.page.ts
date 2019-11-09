import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../models/product/product';
import {ModalController, ToastController} from '@ionic/angular';
import {Store} from '../../models/store';
import {ProductService} from '../../services/product.service';
import {UserInfoService} from '../../services/user-info.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.page.html',
  styleUrls: ['./create-product.page.scss'],
})
export class CreateProductPage implements OnInit {
  private store: Store;
  private newProduct: Product = {};
  constructor(
      private modalController: ModalController,
      private productService: ProductService,
      private userInfoService: UserInfoService,
      private toastController: ToastController,
  ) { }

  ngOnInit() {
    this.newProduct.store = {};
    this.userInfoService.getUserType().subscribe( res => {
      this.store.storeId = res.store.storeId;
      this.store.storeName = res.store.storeName;
      console.log('OnInitStore: ', this.store, typeof this.store);
    });
  }

  async addProductToDB() {
    if (this.newProduct.name !== '' && this.newProduct.image !== '' &&
        this.newProduct.description !== '' && this.newProduct.price !== undefined) {
      this.newProduct.store.storeName = localStorage.getItem('data');
      this.newProduct.storeName = localStorage.getItem('data');
      this.newProduct.store.storeId = this.store.storeId;
      this.newProduct.available = true;
      this.newProduct.rating = 5.0;
      this.newProduct.timesBought = 0;
      console.log(this.newProduct);
      await this.productService.addProduct(this.newProduct);
      await this.dismiss();
      await this.presentInfoToast('Tu producto fue creado!');
    } else {
      console.log('missing data');
      await this.presentInfoToast('Llena todos los campos para continuar');
    }

  }

  public async dismiss() {
    console.log(this.newProduct);
    await this.modalController.dismiss();
  }

  async presentInfoToast(msg: string) {
    const toast = await this.toastController.create({
      header: msg,
      message: '',
      position: 'top',
      duration: 2000,
      buttons: [
        {
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
