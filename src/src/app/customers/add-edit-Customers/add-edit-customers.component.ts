import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Customer } from '../../models/customer.model';
/**
 * @title Dialog Overview
 */
@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit-customers.component.html',
  styleUrls: ['./add-edit-customers.component.css']
})


export class AddEditCustomersComponent implements OnInit {

  editCustomer: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddEditCustomersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly formBuilder: FormBuilder
  ) { }


  ngOnInit() {
    this.editCustomer = this.formBuilder.group({
      position: [this.data.customerDetails ? this.data.customerDetails.position : ''],
      customername: [this.data.customerDetails ? this.data.customerDetails.name : '', Validators.required],
      email: [this.data.customerDetails ? this.data.customerDetails.email : '', [Validators.required, Validators.email]],
      phonenumber: [this.data.customerDetails ? this.data.customerDetails.mobile : null, Validators.required],
      location: [this.data.customerDetails ? this.data.customerDetails.location : null, Validators.required]
    });
  }

  save() {
    if (this.editCustomer.invalid) {
      return;
    }
    const customers: Customer = {
      'position': this.editCustomer.get('position').value ? this.editCustomer.get('position').value : '',
      'name': this.editCustomer.get('customername').value ? this.editCustomer.get('customername').value : '',
      'email': this.editCustomer.get('email').value ? this.editCustomer.get('email').value : '',
      'mobile': this.editCustomer.get('phonenumber').value ? this.editCustomer.get('phonenumber').value : '',
      'location': this.editCustomer.get('location').value ? this.editCustomer.get('location').value : '',
    }
    this.dialogRef.close(customers);
  }

  close(): void {
    this.dialogRef.close(true);
  }

}