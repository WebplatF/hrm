import { Component, inject, input, OnInit,ChangeDetectorRef  } from '@angular/core';
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
  private state   = inject(EmployeeState);
  private usecase = inject(EmployeeUseCase);
  private cd      = inject(ChangeDetectorRef);
  private toast   = inject(ToastService);

  title    = input<string>('Employee Management');
  subtitle = input<string>('Manage and monitor employee status and corporate records.');
  showBtn  = input<boolean>(true);

  loading$ = this.state.loading$;
  error$   = this.state.error$;
  list$    = this.state.list$;

  columns: TableColumn[] = [
    { key: 'name',      label: 'NAME',          type: 'avatar' },
    { key: 'emp_code',  label: 'EMPLOYEE CODE',  type: 'text'  },
    { key: 'date_of_join', label: 'DATE OF JOIN', type: 'date' },
    { key: 'is_delete', label: 'STATUS',         type: 'toggle'},
  ];

  Employee: any[] = [];

  ngOnInit(): void {

    this.state.loading$.next(true);
    this.state.error$.next(null);

    this.usecase.getEmployeeList().subscribe({
      next: (res) => {
        if (res.status === 200) {
          this.Employee = [...res.data];
          this.state.list$.next(res.data);    
          // this.Employee = res.data;
          this.cd.detectChanges(); 
          console.log( res.data);
        } else {
          this.state.error$.next(res.message);
        }
        this.state.loading$.next(false);
      },
      error: (err) => {
        const msg = err?.error?.message || 'Something went wrong';
        this.state.error$.next(msg);
        this.state.loading$.next(false);
      }
    });
  }

  createEmployee(): void {
    this.router.navigateByUrl('main/employee/create');
  }

  editEmployee(employee: any) {
  this.router.navigate(['main/employee/create'], {
    state: { employeeData: employee, isEdit: true }
  });
}

onToggle(emp: Employee): void {
  const payload = { is_delete: emp.is_delete === 0 }; 

  this.usecase.toggleEmployee(emp.id, payload).subscribe({
    next: (res) => {
      if (res.status === 200) {
        this.toast.success(res.message);

        this.loadEmployees();
      } else {
        this.state.error$.next(res.message);
        this.toast.error(res.message);
      }
    },
    error: (err) => {
      const msg = err?.error?.message || 'Something went wrong';
      this.state.error$.next(msg);
      this.toast.error(msg);
    }
  });
}

loadEmployees(): void {
  this.state.loading$.next(true);
  this.usecase.getEmployeeList().subscribe({
    next: (res) => {
      if (res.status === 200) {
        this.Employee = [...res.data];
        this.state.list$.next(res.data);
      }
      this.state.loading$.next(false);
    },
    error: (err) => {
      this.state.loading$.next(false);
    }
  });
}
}
