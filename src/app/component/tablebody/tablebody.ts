import { Component, EventEmitter, Input,Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { List } from '../list/list';

export interface TableColumn {
  key: string;
  label: string;
  type: 'avatar' | 'text' | 'date' | 'toggle' | 'status-action' | 'action';
}

@Component({
  selector: 'app-tablebody',
  imports: [CommonModule, List],
  templateUrl: './tablebody.html',
  styleUrls: ['./tablebody.scss'],
})
export class Tablebody {
  @Input() tableTitle: string = 'Employee Directory';
  @Input() columns: TableColumn[] = [];
  @Input() data: any[] = [];
  @Input() mode: 'employee' | 'leave'|'attendance' | 'permission'= 'employee';
  @Input() showActions: boolean = true;
  @Output() onEdit = new EventEmitter<any>();
  @Output() toggleStatus = new EventEmitter<any>();

  @Input() showActionLabel:boolean=false;

    handleEdit(row: any) { 
    this.onEdit.emit(row);
  }

  onToggle(emp: any): void {
    this.toggleStatus.emit(emp); 
  }

}

