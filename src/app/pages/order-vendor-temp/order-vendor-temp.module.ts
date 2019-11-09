import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OrderVendorTempPage } from './order-vendor-temp.page';
import {VendorOrderComponent} from '../../components/vendor-order/vendor-order.component';

const routes: Routes = [
  {
    path: '',
    component: OrderVendorTempPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: []
})
export class OrderVendorTempPageModule {}
