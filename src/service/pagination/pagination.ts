import { Component, Input, OnChanges } from '@angular/core';
import { PaginationService } from './pagination.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: '../pagination/pagination.html',
  styleUrl: '../pagination/pagination.scss',
})
export class Pagination implements OnChanges {

  @Input() totalItems: number = 0;

  totalPages: number = 0;
  pages: number[] = [];

  constructor(public paginationService: PaginationService) {}

  ngOnChanges() {
    this.totalPages = Math.ceil(
      this.totalItems / this.paginationService.currentPageSize
    );

    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;

    this.paginationService.setPage(page); // 🔥 global update
  }

  next() {
    this.changePage(this.paginationService.currentPage + 1);
  }

  prev() {
    this.changePage(this.paginationService.currentPage - 1);
  }
}