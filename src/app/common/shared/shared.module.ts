import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngTableComponent } from './ang-table/ang-table.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AngTableComponent],
  imports: [
    CommonModule,
    MaterialModule, FormsModule, ReactiveFormsModule
  ],
  exports: [
    AngTableComponent,
  ],
})
export class SharedModuleModule {
  static forRoot(): ModuleWithProviders<SharedModuleModule> {
    return {
      ngModule: SharedModuleModule
    };
  }
}