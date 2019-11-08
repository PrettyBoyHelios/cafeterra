import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OrdersPage } from './orders.page';
import {OrderComponent} from '../../components/order/order.component';
import {OrderDetailPage} from '../order-detail/order-detail.page';
import {NgxQRCodeModule} from 'ngx-qrcode2';

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
        NgxQRCodeModule
    ],
  declarations: [OrdersPage, OrderComponent, OrderDetailPage],
  entryComponents: [OrderDetailPage]
})
export class OrdersPageModule {}
