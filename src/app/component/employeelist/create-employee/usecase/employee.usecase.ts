import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeRepository } from '../repositories/employee.repository'; 
import { EmployeeListResponse } from '../../model/employee.model';

@Injectable({ providedIn: 'root' })
export class EmployeeUseCase {
  private repo = inject(EmployeeRepository);

  getEmployeeList(): Observable<EmployeeListResponse> {
    return this.repo.getEmployeeList();
  }
}