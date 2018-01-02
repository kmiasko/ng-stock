import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class StockService {
  apiUrl = 'http://coincap.io/front';

  constructor(private http: HttpClient) { }

  getStockData(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
