import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OrdersPage } from './orders.page';
import {OrderComponent} from '../../components/order/order.component';
import {OrderDetailPage} from '../order-detail/order-detail.page';
import {NgxQRCodeModule} from 'ngx-qrcode2';

import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { OrderVendorPage } from '../order-vendor/order-vendor.page';
import {OrderVendorTempPage} from '../order-vendor-temp/order-vendor-temp.page';
import {ShoppingCartPageModule} from '../shopping-cart/shopping-cart.module';

const routes: Routes = [
  {
    path: '',
    component: OrdersPage
  }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        NgxQRCodeModule,
        ZXingScannerModule,
        ShoppingCartPageModule,
    ],
  declarations: [OrdersPage, OrderComponent, OrderDetailPage, OrderVendorTempPage],
  entryComponents: [OrderDetailPage, OrderVendorTempPage]
})
export class OrdersPageModule {}
