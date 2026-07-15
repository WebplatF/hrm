import { Component, inject, input, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Tablebody, TableColumn } from '../tablebody/tablebody';
import { EmployeeState } from './create-employee/state/employee.state';
import { EmployeeUseCase } from './create-employee/usecase/employee.usecase';
import { EmployeeRepository } from './create-employee/repositories/employee.repository';
import { EmployeeRepositoryImpl } from './create-employee/repositories/employee.repository.impl';
import { EmployeeService } from './create-employee/services/employee.service';
import { ToastService } from '../../../service/toast/toast.service';
import { Employee } from './model/employee.model';

@Component({
  selector: 'app-employeelist',
  standalone: true,
  imports: [CommonModule, Tablebody],
  templateUrl: './view/employeelist.html',
  styleUrl: './view/employeelist.scss',
  providers: [
    EmployeeUseCase,
    EmployeeService,
    { provide: EmployeeRepository, useClass: EmployeeRepositoryImpl },
  ],
})
export class Employeelist implements OnInit {
  private router  = inject(Router);
  public  state   = inject(EmployeeState);
  private usecase = inject(EmployeeUseCase);
  private cd      = inject(ChangeDetectorRef);
  private toast   = inject(ToastService);

  title    = input<string>('Employee Management');
  subtitle = input<string>('Manage and monitor employee status and corporate records.');
  showBtn  = input<boolean>(true);

  columns: TableColumn[] = [
    { key: 'name',         label: 'NAME',          type: 'avatar' },
    { key: 'emp_code',     label: 'EMPLOYEE CODE',  type: 'text'   },
    { key: 'date_of_join', label: 'DATE OF JOIN',   type: 'date'   },
    { key: 'is_delete',    label: 'STATUS',          type: 'toggle' },
  ];

  Employee: any[] = [];

  ngOnInit(): void {
    this.loadEmployees(); 
  }

  loadEmployees(): void {
    this.state.setLoading(true); 
    this.usecase.getEmployeeList().subscribe({
      next: (res) => {
        if (res.status === 200) {
          this.Employee = [...res.data];
          this.cd.detectChanges();
        }
        this.state.setLoading(false);
      },
      error: (err) => {
        this.toast.error(err?.error?.message || 'Something went wrong');
        this.state.setLoading(false); 
      }
    });
  }

  createEmployee(): void {
    this.router.navigateByUrl('main/employee/create');
  }

  editEmployee(employee: any): void {
    this.router.navigate(['main/employee/create'], {
      state: { employeeData: employee, isEdit: true }
    });
  }

  onToggle(emp: Employee): void {
    const payload = { is_delete: emp.is_delete === 0 };
    this.state.setLoading(true);
    this.usecase.toggleEmployee(emp.id, payload).subscribe({
      next: (res) => {
        if (res.status === 200) {
          this.toast.success(res.message);
          this.loadEmployees(); 
        }
        this.state.setLoading(false); 
      },
      error: (err) => {
        this.toast.error(err?.error?.message || 'Something went wrong');
        this.state.setLoading(false);
      }
    });
  }
}