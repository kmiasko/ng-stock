import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { PagerComponent } from './pager/pager.component';

@NgModule({
  imports: [
    CommonModule,
    InfiniteScrollModule,
  ],
  declarations: [ PagerComponent ],
  exports: [
    CommonModule,
    InfiniteScrollModule,
    PagerComponent,
  ]
})
export class SharedModule { }
