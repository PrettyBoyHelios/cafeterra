import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FoodPage } from './food.page';
import {FoodItemComponent} from '../../components/food-item/food-item.component';
import {CreateProductPage} from '../create-product/create-product.page';

const routes: Routes = [
  {
    path: '',
    component: FoodPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FoodPage, FoodItemComponent, CreateProductPage],
  entryComponents: [CreateProductPage],
})
export class FoodPageModule {}
