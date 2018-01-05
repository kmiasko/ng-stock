import * as _ from 'lodash';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss']
})
export class PagerComponent implements OnInit {
  @Input() itemsLength: number;
  @Input() pageNumber: number;
  @Input() pageSize: number;
  @Output() onPageChange = new EventEmitter<number>();

  constructor() { }

  ngOnInit() { }

  next() {
    if (this.pageNumber >= this.itemsLength - 1) {
      return false;
    }
    return this.onPageChange.emit(this.pageNumber + 1);
  }

  prev() {
    if (this.pageNumber > 0) {
      this.onPageChange.emit(this.pageNumber - 1);
    }
  }

  switchPage(number) {
    if (number === this.pageNumber || number < 0 || number >= this.itemsLength) {
      return false;
    }

    return this.onPageChange.emit(number);
  }

  range(num) {
    return _.range(num);
  }
}
