import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Tablebody, TableColumn } from "../tablebody/tablebody";
import { Router } from '@angular/router';

@Component({
  selector: 'app-daily-attendance',
  imports: [CommonModule, FormsModule, Tablebody],
  templateUrl: './daily-attendance.html',
  styleUrls: ['./daily-attendance.scss'],
})
export class DailyAttendance {
  private router = inject(Router);
  title = input<string>('Daily Attendance');
  subtitle = input<string>('Manage and monitor employee Attendance Details');
  showBtn = input<boolean>(true);
  columns: TableColumn[] = [
    { key: 'name', label: 'NAME', type: 'avatar' },
    { key: 'check_in', label: 'Check In', type: 'text' },
    { key: 'check_out', label: 'Check Out', type: 'text' },
    { key: 'working_hours', label: 'Working Hours', type: 'text' },
    { key: 'status', label: 'Status', type: 'status-action' },
    
  ];

  Employee = [
    {
      sno: 1,
      name: 'Johnathan Doe',
      check_in: '10:00 AM',
      check_out: '3:00 PM',
      working_hours: '5h 0m',
      status: "Present",
    },
      {
      sno: 2,
      name: 'Sarah Smith',
      check_in: '10:30 AM',
      check_out: '6:00 PM',
      working_hours: '7h 30m',
      status: "Early Logout",
    },
      {
      sno: 3,
      name: 'Mark Jenkins',
      check_in: '11:00 AM',
      check_out: '5:10 PM',
      working_hours: '6h 10m',
      status: "Half Day",
    },
      {
      sno: 4,
      name: 'Anita Lee',
      check_in: '10:10 AM',
      check_out: '7:00 PM',
      working_hours: '8h 50m',
      status: "Present",
    },
  ];
  // createEmployee() {
  //   this.router.navigateByUrl('main/employee/create');
  // }

  attendanceCards = [
  {
    title: 'Total Present',
    count: 500,
    icon: 'bi bi-people-fill',
    class: 'present'
  },
  {
    title: 'Total Absent',
    count: 10000,
    icon: 'bi bi-x-circle-fill',
    class: 'absent'
  },
  {
    title: 'Permission',
    count: 12000,
    icon: 'bi bi-clock-fill',
    class: 'permission'
  },
  {
    title: 'On Leave',
    count: 3000,
    icon: 'bi bi-calendar-event-fill',
    class: 'leave'
  }
];
}
