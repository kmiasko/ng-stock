import * as _ from 'lodash';
import { Component, OnInit, Input, ChangeDetectionStrategy, OnDestroy, SimpleChanges, OnChanges } from '@angular/core';
import { Column, Item, COLUMN_TYPE } from '@app/shared/models';
import {
  DecimalPipe,
  PercentPipe,
  CurrencyPipe,
} from '@angular/common';
import { SortService, SORTING_ORDER } from '@app/core/sort/sort.service';

@Component({
  selector: 'app-stock-table',
  templateUrl: './stock-table.component.html',
  styleUrls: ['./stock-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StockTableComponent implements OnInit, OnDestroy, OnChanges {
  @Input() columns: Column[];
  @Input() items: Item[];
  @Input() pageSize = 25;
  @Input() lastUpdate: string;
  @Input() defaultSortBy: string;
  COLUMN_TYPE = COLUMN_TYPE;
  pagedItems: Item[][];
  _items: Item[];
  pageNumber = 0;
  sortColumn: Column;
  sortOrder: SORTING_ORDER;
  fieldColumnMap: Map<string, Column>;

  constructor(
    private decimalPipe: DecimalPipe,
    private currencyPipe: CurrencyPipe,
    private percentPipe: PercentPipe,
    private sortService: SortService,
  ) { }

  ngOnInit() {
  }

  ngOnDestroy() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.columns && changes.columns.firstChange) {
      this.sortColumn = changes
        .columns.currentValue.find(c => c.fieldName === this.defaultSortBy);
      this.sortOrder = this.sortColumn.columnParams.defaultSortOrder
        || SORTING_ORDER.DESCENDING;
    }

    if (changes.items) {
      this.setSortedItems(changes.items.currentValue);
    }
  }

  sortChange(column) {
    if (!column.columnParams.sortable) {
      return false;
    }

    if (this.sortColumn.fieldName === column.fieldName) {
      this.sortOrder = (this.sortOrder === SORTING_ORDER.ASCENDING)
        ? SORTING_ORDER.DESCENDING
        : SORTING_ORDER.ASCENDING;
      this.setSortedItems(this.items, true);
      return true;
    }

    this.sortColumn = column;
    this.sortOrder = _.isNil(column.columnParams.defaultSortOrder)
      ? SORTING_ORDER.DESCENDING
      : column.columnParams.defaultSortOrder;
    this.setSortedItems(this.items, true);
    return true;
  }

  trackFn(item) {
    return item.short;
  }

  getPercentClass(value) {
    if (value === 0) {
      return '';
    }

    return (value > 0)
      ? 'app-stock-table__cell-percent-up'
      : 'app-stock-table__cell-percent-down';
  }

  format(value, column) {
    switch (column.type) {
      case COLUMN_TYPE.Currency: {
        return this.currencyPipe.transform(
          value,
          column.columnParams.currency,
          column.columnParams.showCurrencyMark,
          column.columnParams.format,
        );
      }
      case COLUMN_TYPE.Number: {
        return this.decimalPipe.transform(
          value,
          column.columnParams.format,
        );
      }
      case COLUMN_TYPE.Percent: {
        return this.percentPipe.transform(
          value / 100,
          column.columnParams.format,
        );
      }
      default:
        return value;
    }
  }

  switchPage(number) {
    this.pageNumber = number;
    this._items = this.pagedItems[this.pageNumber];
  }

  setSortedItems(items, changePage?: boolean) {
    if (!items) {
      return [];
    }

    const sorted = this.sortService.sort(
      items,
      this.sortColumn.fieldName,
      this.sortOrder
    );

    this.pagedItems = _.chunk(
      sorted,
      this.pageSize);

    if (changePage) {
      return this.switchPage(0);
    }

    this._items = this.pagedItems[this.pageNumber];
    return true;
  }
}
