import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { NoLoginGuard } from '../../guards/nologin.guard'

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'food',
        loadChildren: '../food/food.module#FoodPageModule',
        canActivate: [NoLoginGuard]
      },
      {
        path: 'orders',
        loadChildren: '../orders/orders.module#OrdersPageModule'
      },
      {
        path: 'profile',
        loadChildren: '../profile/profile.module#ProfilePageModule'
      },
      {
        path: 'register',
        loadChildren: '../register/register.module#RegisterPageModule'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/profile'
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
