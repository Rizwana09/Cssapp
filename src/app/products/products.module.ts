import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { ProductsRoutingModule } from './products-routing.module';
import { MaterialModule } from '../material.module';
import { AddEditProductsComponent } from './add-edit-products/add-edit-products.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModuleModule } from '../common/shared/shared.module';



@NgModule({
  declarations: [ProductsComponent,AddEditProductsComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModuleModule
    ],
  exports: [],
  entryComponents: [AddEditProductsComponent,ProductsComponent],
  bootstrap:[ProductsComponent]
})
export class ProductsModule { }
