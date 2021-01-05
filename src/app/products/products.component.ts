import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditProductsComponent } from './add-edit-products/add-edit-products.component';

export interface Products {
  name: string;
  price: string;
  productId: string;
  quantity: number;
}

const ELEMENT_DATA: Products[] = [
  {
    name: 'Samsung_Refrigrator',
    price: '120$',
    productId: 'H76394',
    quantity: 23,
  },
  {
    name: 'LG_WashingMachine',
    price: '100$',
    productId: 'He37823',
    quantity: 45,
  },
  { name: 'HP_Laptop', price: '150$', productId: 'Li23847', quantity: 37 },
  {
    name: 'Sony_Television',
    price: '90$',
    productId: 'Be077234',
    quantity: 78,
  },
  {
    name: 'Vaccum_Cleaner',
    price: '110$',
    productId: 'B0192364',
    quantity: 12,
  },
  {
    name: 'Godrej_DishWasher',
    price: '180$',
    productId: 'C984634',
    quantity: 98,
  },
  {
    name: 'Prestige_Mixer',
    price: '80$',
    productId: 'Nw287366',
    quantity: 100,
  },
  {
    name: 'Preeti_HandBlender',
    price: '20$',
    productId: 'Or23455',
    quantity: 0,
  },
  { name: 'Havells_Geaser', price: '90$', productId: 'F32123', quantity: 1 },
  { name: 'IFB_Chimney', price: '200$', productId: 'Ne098312', quantity: 5 },
];

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {

  tableObject = {
    title: 'List of Products',
    displayedColumns: [
      'name',
      'price',
      'productId',
      'quantity',
      'action',
    ],
    tableData: ELEMENT_DATA,
    pageInfo: {
      pageSize: 20,
      pageIndex: 0,
      totalCount: 0
    },
    primaryKey: 'name'
  };

  addOrEditRow: any;

  constructor(public dialog: MatDialog) { }

  /** Open Products dialog */
  openDialog(isCustomer: boolean, customerDetails?: any): void {
    const dialogRef = this.dialog.open(AddEditProductsComponent, {
      disableClose: true,
      panelClass: ['dialogMainContainer', 'authorize-dialog-container'],
      data: { isCustomer: isCustomer, customerDetails: customerDetails }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== null && result !== undefined) {
        if (isCustomer) {
          this.addOrEditRow = {
            type: 'add',
            row: result
          };
        } else {
          this.addOrEditRow = {
            type: 'edit',
            row: result
          };
        }
      }
    });
  }

  ngOnInit(): void {
  }
}
