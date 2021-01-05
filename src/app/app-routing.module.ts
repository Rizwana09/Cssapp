import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'products',
    loadChildren: () => import('./Products/products.module').then(m => m.ProductsModule)
  },
  {
    path: 'customers',
    loadChildren: () => import('./Customers/customers.module').then(m => m.CustomersModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./Home/home-routing.module').then(m => m.HomeRoutingModule)
  },
  {
    path: 'contactus',
    loadChildren: () => import('./ContactUS/contactus-routing.module').then(m => m.ContactUsRoutingModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
