import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { List } from '../list/list';

export interface TableColumn {
  key: string;
  label: string;
  type: 'avatar' | 'text' | 'date' | 'toggle' | 'status-action';
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
  @Input() showActionLabel:boolean=false;

}
