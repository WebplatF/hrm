import { Component, Input,Output,EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableColumn } from '../tablebody/tablebody';

export interface Employee {
  sno: number;
  name: string;
  role: string;
  email: string;
  dateOfJoin: string;
  isActive: boolean;
}

@Component({
  selector: '[app-list]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class List {
  @Input() columns: TableColumn[] = [];
  @Input() data: any[] = [];
  @Output() onEdit = new EventEmitter<any>(); 
  @Input() mode: 'employee' | 'leave' | 'attendance' |'permission' = 'employee';
  @Input() showActions: boolean = false;


  getInitials(name: string): string {
    return name ?.split(' ').map((n: string) => n[0]).join('').substring(0, 1).toUpperCase();
  }

  onToggleStatus(employee: Employee): void {
    employee.isActive = !employee.isActive;
  }
}