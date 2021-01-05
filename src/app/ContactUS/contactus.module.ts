import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { ContactUsComponent } from './contactus.component';
import { ContactUsRoutingModule } from './contactus-routing.module';


@NgModule({
    declarations: [ContactUsComponent],
  imports: [
    CommonModule,
    ContactUsRoutingModule,
    MaterialModule,
    ],
  exports: []
})
export class ContactUsModule { }
