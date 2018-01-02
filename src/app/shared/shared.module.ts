import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockTableCellDirective } from './stock-table-cell/stock-table-cell.directive';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    StockTableCellDirective,
  ],
  exports: [
    CommonModule,
    StockTableCellDirective,
  ],
})
export class SharedModule { }
