import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeRepository } from './employee.repository';
import { EmployeeListResponse } from '../../model/employee.model';
import { EmployeeService } from '../services/employee.service';

@Injectable({ providedIn: 'root' })
export class EmployeeRepositoryImpl implements EmployeeRepository {
  private service = inject(EmployeeService);

  getEmployeeList(): Observable<EmployeeListResponse> {
    return this.service.getEmployeeList();
  }
}