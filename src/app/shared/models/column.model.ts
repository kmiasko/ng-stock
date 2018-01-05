import { SORTING_ORDER } from '@app/core/sort/sort.service';

export enum COLUMN_TYPE {
  Text,
  Number,
  Currency,
  Percent,
}

export interface ColumnParams {
  currency?: string;
  showCurrencyMark?: boolean;
  sortable?: boolean;
  format?: string;
  percentColors?: boolean;
  cssClass?: string;
  defaultSortOrder?: SORTING_ORDER;
}

export class Column {
  name: string;
  fieldName: string;
  type: COLUMN_TYPE;
  columnParams?: ColumnParams;

  constructor(
    name: string,
    fieldName: string,
    type: COLUMN_TYPE,
    columnParams?: ColumnParams) {
    this.name = name;
    this.fieldName = fieldName;
    this.type = type;
    this.columnParams = Object.assign(
      {},
      { sortable: true },
      { currency: 'USD' },
      { showCurrencyMark: true },
      { format: '' },
      { percentColors: true },
      { cssClass: 'app-stock-table__cell-text' },
      columnParams,
    );
  }
}
