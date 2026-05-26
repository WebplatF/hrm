import { Component,ViewEncapsulation } from '@angular/core';
import { Employeelist } from '../employeelist/employeelist';
import { Tablebody, TableColumn } from '../tablebody/tablebody';

@Component({
  selector: 'app-leave-list',
  imports: [Employeelist, Tablebody],
  templateUrl: './leavelist.html',
   styleUrls: [
    './leavelist.scss',
    '../employeelist/employeelist.scss',
    '../tablebody/tablebody.scss',
    '../list/list.scss'
  ],
   encapsulation: ViewEncapsulation.None
})
export class LeaveList {
 columns: TableColumn[] = [
  { key: 'name',       label: 'EMPLOYEE NAME', type: 'avatar'        },
  { key: 'leaveType',  label: 'LEAVE TYPE',    type: 'text'          },
  { key: 'date',       label: 'LEAVE DATE',    type: 'date'          },
  { key: 'status',     label: 'STATUS',        type: 'status-action' },
];

leaves = [
  { name: 'Johnathan Doe', employeeId: 'EMP001', leaveType: 'Sick Leave',      date: '12 Jan 2024 - 15 Jan 2024', status: 'Rejected' },
  { name: 'Sarah Smith',   employeeId: 'EMP002', leaveType: 'Casual Leave',    date: '24 Feb 2024', status: 'Accepted' },
  { name: 'Mark Jenkins',  employeeId: 'EMP003', leaveType: 'Earned Leave',    date: '15 Mar 2024 - 28 Mar 2025', status: 'Pending'  },
  { name: 'Anita Lee',     employeeId: 'EMP004', leaveType: 'Sick Leave', date: '02 Apr 2024', status: 'Accepted' },
];
}