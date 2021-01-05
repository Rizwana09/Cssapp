import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersComponent } from './customers.component';
import { CustomersRoutingModule } from './customers-routing.module';
import { MaterialModule } from '../material.module';
import { AddEditCustomersComponent } from './add-edit-Customers/add-edit-customers.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModuleModule } from '../common/shared/shared.module';

@NgModule({
  declarations: [CustomersComponent,AddEditCustomersComponent],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModuleModule
    ],
  exports: [],
  entryComponents: [AddEditCustomersComponent,AddEditCustomersComponent],
  bootstrap: [CustomersComponent]
})
export class CustomersModule { }
