import * as _ from 'lodash';
import { Injectable } from '@angular/core';

export enum SORTING_ORDER {
  ASCENDING,
  DESCENDING,
}

@Injectable()
export class SortService {

  constructor() { }

  sort(items, sortField, order) {
    return _.orderBy(items, sortField, order === SORTING_ORDER.ASCENDING ? 'asc' : 'desc');
  }
}


