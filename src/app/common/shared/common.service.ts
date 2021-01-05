import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  filterValue = '';
  pageIndex = 0;

  constructor() { }
}
