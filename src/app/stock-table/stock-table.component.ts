import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Column, Item, COLUMN_TYPE } from '@app/shared/models';
import { StockService } from '../core/stock/stock.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-stock-table',
  templateUrl: './stock-table.component.html',
  styleUrls: ['./stock-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StockTableComponent implements OnInit {
  @Input() columns: Column[];
  @Input() interval = 15000;
  @Input() retryCount = 3;
  items$: Observable<Item[]>;
  columnTypes = COLUMN_TYPE;

  constructor(
    private stockService: StockService
  ) { }

  ngOnInit() {
    this.items$ = this.stockService.getStockData();
  }

  sortChange(column) {
    if (!column.sortable) {
      return false;
    }
    console.log(column);
  }

}
