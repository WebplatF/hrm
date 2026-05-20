import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Employee {
  sno: number;
  name: string;
  role: string;
  email: string;
  dateOfJoin: string;
  isActive: boolean;
  avatarColor: string;
  avatarTextColor: string;
}

@Component({
  selector: '[app-list]',
  imports: [CommonModule],
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class List {
  @Input() employees: Employee[] = [
    {
      sno: 1,
      name: 'Johnathan Doe',
      role: 'Senior UI Designer',
      email: 'john.doe@company.com',
      dateOfJoin: '12 Jan 2023',
      isActive: true,
      avatarColor: '#5b36ea',
      avatarTextColor: '#e8e0fd',
    },
    {
      sno: 2,
      name: 'Sarah Smith',
      role: 'Project Lead',
      email: 'sarah.s@company.com',
      dateOfJoin: '24 Feb 2023',
      isActive: true,
      avatarColor: '#5b36ea',
      avatarTextColor: '#e8e0fd',
    },
    {
      sno: 3,
      name: 'Mark Jenkins',
      role: 'Full Stack Developer',
      email: 'mark.j@company.com',
      dateOfJoin: '15 Mar 2023',
      isActive: false,
      avatarColor: '#5b36ea',
      avatarTextColor: '#e8e0fd',
    },
    {
      sno: 4,
      name: 'Anita Lee',
      role: 'HR Coordinator',
      email: 'anita.l@company.com',
      dateOfJoin: '02 Apr 2023',
      isActive: true,
      avatarColor: '#5b36ea',
      avatarTextColor: '#e8e0fd',
    },
  ];

  getInitials(name: string): string {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .substring(0, 1)
      .toUpperCase();
  }

  formatSno(sno: number): string {
    return sno.toString().padStart(2, '0');
  }

  onEdit(employee: Employee): void {
    console.log('Edit employee:', employee);
  }

  onToggleStatus(employee: Employee): void {
    employee.isActive = !employee.isActive;
  }
}