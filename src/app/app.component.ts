import { Component, OnInit, NgZone } from '@angular/core';
import { Column, COLUMN_TYPE, Item } from '@app/shared/models';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { StockService } from './core/stock/stock.service';
import { SORTING_ORDER } from './core/sort/sort.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  columns: Column[];
  items$: Observable<Item[]>;
  lastUpdate: string;
  interval = 15000;
  defaultSortBy = 'mktcap';

  constructor(
    private stockService: StockService,
  ) {
  }

  ngOnInit() {
    this.columns = [
      new Column('Nazwa', 'long', COLUMN_TYPE.Text, {
        defaultSortOrder: SORTING_ORDER.ASCENDING,
      }),
      new Column('Symbol', 'short', COLUMN_TYPE.Text, {
        defaultSortOrder: SORTING_ORDER.ASCENDING,
      }),
      new Column('Cena', 'price', COLUMN_TYPE.Currency, {
        format: '.3',
        cssClass: 'app-stock-table__cell-currency',
      }),
      new Column('Kapitalizacja', 'mktcap', COLUMN_TYPE.Number, {
        format: '.2',
        cssClass: 'app-stock-table__cell-number',
      }),
      new Column('Wolumen (24h)', 'usdVolume', COLUMN_TYPE.Currency, {
        format: '.3',
        cssClass: 'app-stock-table__cell-currency',
      }),
      new Column('Zmiana (24h)', 'cap24hrChange', COLUMN_TYPE.Percent, {
        format: '.2',
        cssClass: 'app-stock-table__cell-percent',
      }),
    ];

    this.items$ = this.stockService.getStockData(this.interval);
    this.stockService.lastUpdate$.subscribe(newDate => this.lastUpdate = newDate);
  }
}
