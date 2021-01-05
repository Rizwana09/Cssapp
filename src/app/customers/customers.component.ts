import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CustomersService } from './customers.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  tableObject: any;

  addOrEditRow: any;
  tableData = [];
  ngAfterViewInit() { }

  constructor(public dialog: MatDialog,
    private customersService: CustomersService,
    private spinner: NgxSpinnerService,
    private route: Router
  ) { }


  ngOnInit(): void {
    this.getCustomers();
  }


  addEditRowData(event) {
    this.customersService.addOrUpdateData = { type: '', row: null };
    if (event.type === 'add') {
      this.route.navigate(['customers', 'add']);
    } else {
      this.route.navigate(['customers', 'edit', { value: event.row.id }]);
    }
  }


  deleteCustomers(obj) {
    this.tableData = this.tableData.filter(res => (res.id !== obj.id));
    this.tableObject = this.tableIntitalObj();
    this.spinner.show();
    const url = `https://jsonplaceholder.typicode.com/posts?id=${obj.id}`;
    this.customersService.apiDeleteRequest(url)
      .subscribe((res) => {
        this.getCustomers();
        this.spinner.hide();
      });
  }

  getCustomers() {
    this.spinner.show();
    const url = 'https://jsonplaceholder.typicode.com/posts';
    this.customersService.apiGetRequest(url)
      .subscribe((res) => {
        this.tableData = res.body;
        if (this.customersService.addOrUpdateData.type === 'add') {
          this.customersService.addOrUpdateData.row.id = this.tableData.length + 1;
          this.tableData.unshift(this.customersService.addOrUpdateData.row);
        } else if (this.customersService.addOrUpdateData.type === 'edit') {
          this.tableData = this.tableData.map(res => (res.id === this.customersService.addOrUpdateData.row.id) ? this.customersService.addOrUpdateData.row : res);
        }
          this.tableObject = this.tableIntitalObj();
        this.spinner.hide();
      });
  }

  tableIntitalObj() {
    return {
      title: 'List of Customers',
      displayedColumns: ['userId', 'id', 'title', 'body', 'action'],
      tableData: this.tableData,
      pageInfo: {
        pageSize: 5,
        pageIndex: 0,
        totalCount: 0
      },
      primaryKey: 'id'
    }
  }

}
