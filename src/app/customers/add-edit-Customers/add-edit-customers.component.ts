import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomersService } from '../customers.service';

/**
 * @title Dialog Overview
 */
@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit-customers.component.html',
  styleUrls: ['./add-edit-customers.component.css']
})


export class AddEditCustomersComponent implements OnInit {

  customerModel: FormGroup;
  routeType: any;

  constructor(
    private readonly formBuilder: FormBuilder,
    private route: Router,
    private router: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private customersService: CustomersService
  ) {
    router.params.subscribe(params => {
      this.routeType = params;
      if (params.id === 'edit') {
        this.getCustomers(params.value);
      }
    })
  }


  ngOnInit() {
    this.customerModel = this.formBuilder.group({
      id: [null],
      userId: [null, Validators.required],
      title: [null, Validators.required],
      body: [null, Validators.required],
    });

  }

  getCustomers(val) {
    this.spinner.show();
    const url = `https://jsonplaceholder.typicode.com/posts?id=${val}`;
    this.customersService.apiGetRequest(url)
      .subscribe((res) => {
        this.customerModel.setValue(res.body[0]);
        this.spinner.hide();
      });
  }

  save() {
    if (this.customerModel.invalid) {
      return;
    }
    if (this.routeType.id === 'add') {
      this.customersService.addOrUpdateData = { type: 'add', row: this.customerModel.value };
      this.addCustomers()
    } else {
      this.customersService.addOrUpdateData = { type: 'edit', row: this.customerModel.value };
      this.updateCustomers();
    }
  }

  addCustomers() {
    this.spinner.show();
    const url = 'https://jsonplaceholder.typicode.com/posts';
    this.customersService.apiPostRequest(url, JSON.stringify(this.customerModel.value))
      .subscribe((res) => {
        this.spinner.hide();
        this.route.navigate(['customers']);
      });
  }

  updateCustomers() {
    this.spinner.show();
    const url = `https://jsonplaceholder.typicode.com/posts/${this.routeType.value}`;
    this.customersService.apiUpdateRequest(url)
      .subscribe((res) => {
        this.spinner.hide();
        this.route.navigate(['customers']);
      });
  }

  cancel(): void {
    this.route.navigate(['customers']);
  }

}