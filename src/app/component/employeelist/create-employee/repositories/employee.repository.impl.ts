import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeRepository } from './employee.repository';
import {CreateEmployeeRequest, CreateEmployeeResponse, EmployeeListResponse } from '../../model/employee.model';
import { EmployeeService } from '../services/employee.service';

@Injectable({ providedIn: 'root' })
export class EmployeeRepositoryImpl implements EmployeeRepository {
  private service = inject(EmployeeService);

  getEmployeeList(): Observable<EmployeeListResponse> {
    return this.service.getEmployeeList();
  }

   createEmployee(data: CreateEmployeeRequest): Observable<CreateEmployeeResponse> { // ✅ add
    return this.service.createEmployee(data);
  }
}