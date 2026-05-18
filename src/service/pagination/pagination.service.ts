import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  private pageSubject = new BehaviorSubject<number>(1);
  page$ = this.pageSubject.asObservable();

  private pageSizeSubject = new BehaviorSubject<number>(15);
  pageSize$ = this.pageSizeSubject.asObservable();

  setPage(page: number) {
    this.pageSubject.next(page);
  }

  setPageSize(size: number) {
    this.pageSizeSubject.next(size);
  }

  get currentPage() {
    return this.pageSubject.value;
  }

  get currentPageSize() {
    return this.pageSizeSubject.value;
  }
}