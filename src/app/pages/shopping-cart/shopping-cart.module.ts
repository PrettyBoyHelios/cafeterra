import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ShoppingCartPage } from './shopping-cart.page';
import {OrderComponent} from '../../components/order/order.component';
import {VendorOrderComponent} from '../../components/vendor-order/vendor-order.component';
import {OrderVendorPage} from '../order-vendor/order-vendor.page';

const routes: Routes = [
  {
    path: '',
    component: ShoppingCartPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ShoppingCartPage, VendorOrderComponent, OrderVendorPage],
  entryComponents: [OrderVendorPage],
})
export class ShoppingCartPageModule {}
