import { NgModule, Optional, SkipSelf, } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StockService } from './stock/stock.service';
import { SortService } from './sort/sort.service';
import {
  DecimalPipe,
  PercentPipe,
  CurrencyPipe,
} from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    StockService,
    SortService,
    DecimalPipe,
    PercentPipe,
    CurrencyPipe,
  ],
  declarations: []
})
export class CoreModule {
  constructor (
    @Optional() @SkipSelf() parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}
