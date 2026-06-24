import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeRepository } from '../repositories/employee.repository';
import { EmployeeListResponse } from '../../model/employee.model';
import { EmployeeRepositoryImpl } from '../repositories/employee.repository.impl';

@Injectable({ providedIn: 'root' })
export class EmployeeUseCase {
  constructor(private repository: EmployeeRepositoryImpl) {}

  getEmployeeList(): Observable<EmployeeListResponse> {
    return this.repository.getEmployeeList();
  }
}