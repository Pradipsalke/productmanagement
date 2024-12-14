import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'addproduct',
    loadChildren: () => import('./add-product/add-product.module').then( m => m.AddProductPageModule)
  },
  {
  path: 'addproduct/:id',
    loadChildren: () => import('./add-product/add-product.module').then( m => m.AddProductPageModule)
  },
  // {
  //   path: 'products',
  //   loadChildren: () => import('./products/products.module').then( m => m.ProductsModule)
  // },
  { path:  '', redirectTo: 'home',pathMatch: 'full'}
  // {
  //   path: 'add-product',
  //   loadChildren: () => import('./add-product/add-product.module').then( m => m.AddProductPageModule)
  // },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
