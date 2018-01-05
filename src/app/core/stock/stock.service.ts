import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { switchMap, retry, map } from 'rxjs/operators';

@Injectable()
export class StockService {
  apiUrl = 'http://coincap.io/front';
  lastUpdate$ = new EventEmitter();

  constructor(private http: HttpClient) { }

  getStockData(interval): Observable<any> {
    return TimerObservable.create(0, interval)
      .pipe(
        switchMap(num =>
          this.http.get(this.apiUrl)
            .pipe(
              map(input => {
                this.lastUpdate$.emit((new Date()).toISOString());
                return input;
              }),
              retry(3)
            ))
      );
  }
}
