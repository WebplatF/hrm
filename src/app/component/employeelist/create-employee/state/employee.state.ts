import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Employee } from '../../model/employee.model';
import { EmployeeUseCase } from '../usecase/employee.usecase';

@Injectable({ providedIn: 'root' })
export class EmployeeState {
  private useCase = inject(EmployeeUseCase);

  private loadingS$ = new BehaviorSubject<boolean>(false);
  private errorS$   = new BehaviorSubject<string | null>(null);
  private listS$    = new BehaviorSubject<Employee[]>([]);

  loading$ = this.loadingS$.asObservable();
  error$   = this.errorS$.asObservable();
  list$    = this.listS$.asObservable();

  loadEmployees(): void {
    this.loadingS$.next(true);
    this.errorS$.next(null);

    this.useCase.getEmployeeList().subscribe({
      next: (res) => {
        this.loadingS$.next(false);
        if (res.status === 200) {
          this.listS$.next(res.data);
        } else {
          this.errorS$.next(res.message || 'Failed to load.');
        }
      },
      error: (err) => {
        this.loadingS$.next(false);
        this.errorS$.next(
          err?.error?.message || 'Something went wrong.'
        );
      }
    });
  }
}