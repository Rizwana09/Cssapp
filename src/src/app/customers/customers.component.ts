import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditCustomersComponent } from './add-edit-Customers/add-edit-customers.component';


export interface Customers {
  name: string;
  position: number;
  email: string;
  mobile: number;
  location: string;
}

const ELEMENT_DATA: Customers[] = [
  { position: 1, name: 'Alexandria', email: 'xandria@gmail.com$', mobile: 9382839812, location: 'LA' },
  { position: 2, name: 'Glenn Marshall', email: 'glenn@gmail.com', mobile: 9234847238, location: 'Texas' },
  { position: 3, name: 'Rick Fredrick', email: 'ric@gmail.com', mobile: 9823465378, location: 'SC' },
  { position: 4, name: 'Ross Geller', email: 'ross@hotmail.com', mobile: 9815236757, location: 'Seattle' },
  { position: 5, name: 'Sam Gabriel', email: 'sam@yahoo.com', mobile: 988776554, location: 'Chicago' },
  { position: 6, name: 'Rachel Green', email: 'rach@hotmail.com', mobile: 8829563478, location: 'Omaha' },
  { position: 7, name: 'Chandler Bing', email: 'bing@hotmail.com', mobile: 7799564320, location: 'NYC' },
  { position: 8, name: 'Monica Geller', email: 'monica@hotmail.com', mobile: 6023045688, location: 'Florida' },
  { position: 9, name: 'Pheobe Buffay', email: 'pheobe@hotamail.com', mobile: 9988776655, location: 'Vegas' },
  { position: 10, name: 'Joey Tribbiani', email: 'joey@hotmail.com', mobile: 9885646780, location: 'NY' },
];

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  tableObject = {
    title: 'List of Customers',
    displayedColumns: ['position', 'name', 'email', 'mobile', 'location', 'action'],
    tableData: ELEMENT_DATA,
    pageInfo: {
      pageSize: 20,
      pageIndex: 0,
      totalCount: 0
    },
    primaryKey: 'name'
  };

  addOrEditRow: any;

  ngAfterViewInit() { }

  constructor(public dialog: MatDialog) { }


  /** Open Products dialog */
  openDialog(isCustomer: boolean, customerDetails?: any): void {
    const dialogRef = this.dialog.open(AddEditCustomersComponent, {
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
