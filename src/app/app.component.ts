import { Component, OnInit } from '@angular/core';
import { Column, COLUMN_TYPE } from '@app/shared/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  columns: Column[];
  ngOnInit() {
    this.columns = [
      new Column('Nazwa', 'long', COLUMN_TYPE.Text),
      new Column('Symbol', 'short', COLUMN_TYPE.Text),
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
  }
}
