import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Product } from 'src/app/models/product.model';

/**
 * @title Dialog Overview
 */
@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit-products.component.html',
  styleUrls: ['./add-edit-products.component.css'],
})
export class AddEditProductsComponent implements OnInit {
  editProduct: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddEditProductsComponent>,
    private readonly formBuilder: FormBuilder,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.editProduct = this.formBuilder.group({
      productname: [
        this.data.customerDetails ? this.data.customerDetails.name : '',
        Validators.required,
      ],
      price: [
        this.data.customerDetails ? this.data.customerDetails.price : '',
        Validators.required,
      ],
      productid: [
        this.data.customerDetails ? this.data.customerDetails.productId : '',
        Validators.required,
      ],
      quantity: [
        this.data.customerDetails ? this.data.customerDetails.quantity : '',
        Validators.required,
      ],
    });
  }

  save() {
    if (this.editProduct.invalid) {
      return;
    }
    const product = {
      name: this.editProduct.get('productname').value
        ? this.editProduct.get('productname').value
        : '',
      price: this.editProduct.get('price').value
        ? this.editProduct.get('price').value
        : '',
      productId: this.editProduct.get('productid').value
        ? this.editProduct.get('productid').value
        : '',
      quantity: this.editProduct.get('quantity').value
        ? this.editProduct.get('quantity').value
        : '',
    };
    this.dialogRef.close(product);
  }

  close(): void {
    this.dialogRef.close(true);
  }
}
