import { Component, inject, input } from '@angular/core';
import { Tablebody, TableColumn } from '../tablebody/tablebody';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employeelist',
  imports: [Tablebody],
  templateUrl: './employeelist.html',
  styleUrl: './employeelist.scss',
})
export class Employeelist {
  private router = inject(Router);
  title = input<string>('Employee Management');
  subtitle = input<string>('Manage and monitor employee status and corporate records.');
  showBtn = input<boolean>(true);
  columns: TableColumn[] = [
    { key: 'name', label: 'NAME', type: 'avatar' },
    { key: 'email', label: 'EMPLOYEE CODE', type: 'text' },
    { key: 'dateOfJoin', label: 'DATE OF JOIN', type: 'date' },
    { key: 'isActive', label: 'STATUS', type: 'toggle' },
  ];

  Employee = [
    {
      sno: 1,
      name: 'Johnathan Doe',
      role: 'Senior UI Designer',
      employeeCode: 'Designer_01',
      email: 'johnathan@company.com',
      dateOfJoin: '12 Jan 2023',
      isActive: true,
    },
    {
      sno: 2,
      name: 'Sarah Smith',
      role: 'Project Lead',
      employeeCode: 'Lead_01',
      dateOfJoin: '24 Feb 2023',
      email: 'johnathan@company.com',
      isActive: true,
    },
    {
      sno: 3,
      name: 'Mark Jenkins',
      role: 'Full Stack Developer',
       employeeCode: 'Developer_01',
       email: 'johnathan@company.com',
      dateOfJoin: '15 Mar 2023',
      isActive: false,
    },
    {
      sno: 4,
      name: 'Anita Lee',
      role: 'HR Coordinator',
      employeeCode: 'HR_01',
      dateOfJoin: '02 Apr 2023',
      email: 'johnathan@company.com',
      isActive: true,
    },
  ];
  createEmployee() {
    this.router.navigateByUrl('main/employee/create');
  }

  editEmployee(employee: any) {
  this.router.navigate(['main/employee/create'], {
    state: { employeeData: employee, isEdit: true }
  });
}
}
