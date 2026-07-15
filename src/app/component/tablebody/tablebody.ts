import { Component, EventEmitter, Input,OnChanges,Output, SimpleChange } from '@angular/core';
import { CommonModule } from '@angular/common';
import { List } from '../list/list';
import { Pagination } from '../../../service/pagination/pagination';


export interface TableColumn {
  key: string;
  label: string;
  type: 'avatar' | 'text' | 'date' | 'toggle' | 'status-action' | 'action';
}

@Component({
  selector: 'app-tablebody',
  imports: [CommonModule, List,Pagination],
  templateUrl: './tablebody.html',
  styleUrls: ['./tablebody.scss'],
})
export class Tablebody {
  @Input() tableTitle: string = 'Employee Directory';
  @Input() columns: TableColumn[] = [];
  @Input() data: any[] = [];
  @Input() mode: 'employee' | 'leave'|'attendance' | 'permission'= 'employee';
  @Input() showActionLabel: boolean = false;
  @Input() showActions: boolean = false
  @Output() pageChange = new EventEmitter<number>();

  @Input() limit: number = 15;
  @Output() toggleStatus = new EventEmitter<any>();
  @Output() editClick = new EventEmitter<any>();

  currentPage: number = 1;
  /** Slice of `data` for the current page */
  pagedData: any[] = [];

  // ngOnChanges(changes: SimpleChange): void {
  //   // Reset to page 1 when data or limit changes
  //   if (changes['data'] || changes['limit']) {
  //     this.currentPage = 1;
  //   }
  //   this.updatePage();
  // }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.pageChange.emit(page);
    this.updatePage();
  }

  private updatePage(): void {
    const start = (this.currentPage - 1) * this.limit;
    this.pagedData = this.data.slice(start, start + this.limit);
  }
  

 onEdit(row: any) {
  this.editClick.emit(row);
}

  onToggle(emp: any): void {
    this.toggleStatus.emit(emp); 
  }

}

