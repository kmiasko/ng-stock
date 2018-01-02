import { Directive, OnInit, Input, ViewChild, ElementRef, Renderer2, OnChanges, SimpleChanges } from '@angular/core';
import { Item, Column, COLUMN_TYPE } from '@app/shared/models';
import { HostBinding } from '@angular/core';
import {
  DecimalPipe,
  PercentPipe,
  CurrencyPipe,
} from '@angular/common';

@Directive({
  selector: '[appStockTableCell]',
})
export class StockTableCellDirective implements OnInit, OnChanges {
  @Input() cellItem: any;
  @Input() cellColumn: Column;
  value: any;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private decimalPipe: DecimalPipe,
    private currencyPipe: CurrencyPipe,
    private percentPipe: PercentPipe
  ) { }

  ngOnInit() {
    this.renderer.setProperty(this.el.nativeElement, 'innerHTML', this.format(this.cellItem));
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.cellItem) {
      this.renderer.removeClass(this.el.nativeElement, 'app-stock-table__cell-percent-up');
      this.renderer.removeClass(this.el.nativeElement, 'app-stock-table__cell-percent-down');
      this.cellItem = changes.cellItem.currentValue;
      if (this.cellColumn.type === COLUMN_TYPE.Percent
        && this.cellColumn.columnParams.percentColors) {
        if (parseInt(this.cellItem, 10) > 0) {
          this.renderer.addClass(this.el.nativeElement, 'app-stock-table__cell-percent-up');
        } else if (parseInt(this.cellItem, 10) < 0) {
          this.renderer.addClass(this.el.nativeElement, 'app-stock-table__cell-percent-down');
        }
      }
      this.renderer.setProperty(this.el.nativeElement, 'innerHTML', this.format(this.cellItem));
    }
  }

  format(value) {
    switch (this.cellColumn.type) {
      case COLUMN_TYPE.Currency: {
        return this.currencyPipe.transform(
          value,
          this.cellColumn.columnParams.currency,
          this.cellColumn.columnParams.showCurrencyMark,
          this.cellColumn.columnParams.format,
        );
      }
      case COLUMN_TYPE.Number: {
        return this.decimalPipe.transform(
          value,
          this.cellColumn.columnParams.format,
        );
      }
      case COLUMN_TYPE.Percent: {
        return this.percentPipe.transform(
          value / 100,
          this.cellColumn.columnParams.format,
        );
      }
      default:
        return value;
    }
  }
}
