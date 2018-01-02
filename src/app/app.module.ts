import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CoreModule } from '@app/core/core.module';
import { SharedModule } from '@app/shared/shared.module';

import { AppComponent } from './app.component';
import { StockTableComponent } from './stock-table/stock-table.component';

@NgModule({
  declarations: [
    AppComponent,
    StockTableComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
