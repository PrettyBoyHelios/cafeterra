import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'food',
        loadChildren: '../food/food.module#FoodPageModule'
      },
      {
        path: 'orders',
        loadChildren: '../orders/orders.module#OrdersPageModule'
      },
      {
        path: 'profile',
        loadChildren: '../profile/profile.module#ProfilePageModule'
      },
      { path: 'shopping-cart',
        loadChildren: '../shopping-cart/shopping-cart.module#ShoppingCartPageModule'
      },
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/food'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
