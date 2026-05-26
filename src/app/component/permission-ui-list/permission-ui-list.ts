import { Component } from '@angular/core';
import { Tablebody, TableColumn } from '../tablebody/tablebody';

@Component({
  selector: 'app-permission-ui-list',
  imports: [Tablebody],
  templateUrl: './permission-ui-list.html',
  styleUrl: './permission-ui-list.scss',
})
export class PermissionUiList {
  columns: TableColumn[] = [
    { key: 'name',   label: 'EMPLOYEE NAME',   type: 'avatar'        },
    { key: 'date',   label: 'PERMISSION DATE', type: 'date'          },
    { key: 'time',   label: 'PERMISSION TIME', type: 'text'          },
    { key: 'status', label: 'STATUS',          type: 'status-action' },
  ];

  permissions = [
    { name: 'Johnathan Doe', employeeId: 'EMP001', date: '12 Jan 2024', time: '09:00 AM - 11:00 PM', status: 'Rejected' },
    { name: 'Sarah Smith',   employeeId: 'EMP002', date: '24 Feb 2024', time: '02:00 PM - 02:30 PM', status: 'Accepted' },
    { name: 'Mark Jenkins',  employeeId: 'EMP003', date: '15 Mar 2024', time: '10:30 AM - 12:00 PM', status: 'Pending'  },
    { name: 'Anita Lee',     employeeId: 'EMP004', date: '02 Apr 2024', time: '01:00 PM - 01:30 PM', status: 'Accepted' },
  ];
}