import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    loadChildren: './pages/tabs/tabs.module#TabsPageModule'
  },
  { path: 'create-product', loadChildren: './pages/create-product/create-product.module#CreateProductPageModule' },
  { path: 'order-vendor', loadChildren: './pages/order-vendor/order-vendor.module#OrderVendorPageModule' },

];
@NgModule({
  imports: [
    ReactiveFormsModule,
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
