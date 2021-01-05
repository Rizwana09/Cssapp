import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { tap, map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  public options;

  public addOrUpdateData = { type: '', row: null };

  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
  ) {
    this.options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  }

  // get API requests
  public apiGetRequest(url: any, obj?: any): Observable<any> {
    return this.http.get(url, { headers: this.options, observe: 'response', params: obj })
      .pipe((tap<any>(res => {
        return res.body;
      })),
        catchError(this.handleError('apiGetRequest')));
  }

  // Post API request
  public apiPostRequest(url: any, obj?: any): Observable<any> {
    this.spinner.show();
    return this.http.post(url, obj, { headers: this.options, observe: 'response' })
      .pipe((tap<any>(res => {
        return res.body;
      })),
        catchError(this.handleError('apiPostRequest')));
  }


  // Update API request
  public apiUpdateRequest(url: any, obj?: any): Observable<any> {
    this.spinner.show();
    return this.http.put(url, obj, { headers: this.options, observe: 'response' })
      .pipe((tap<any>(res => {
        return res;
      })),
        catchError(this.handleError('apiPostRequest')));
  }


  // Delete API request
  public apiDeleteRequest(url: any): Observable<any> {
    this.spinner.show();
    return this.http.delete(url, { headers: this.options, observe: 'response' })
      .pipe((tap<any>(res => {
        return res;
      })),
        catchError(this.handleError('apiPostRequest')));
  }


  // API error handling
  private handleError(operation: string) {
    return (err: HttpErrorResponse) => {
      const errMsg = `error in ${operation}()  status: ${err.status}, ${err.statusText || ''}, ${err} `;
      if (err instanceof HttpErrorResponse) {
        console.error(`${err.statusText}`)
      }
      // tslint:disable-next-line: deprecation
      return of(err);
    };
  }



}
