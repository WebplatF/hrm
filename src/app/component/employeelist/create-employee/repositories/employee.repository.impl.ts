import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeRepository } from './employee.repository';
import {CreateEmployeeRequest, CreateEmployeeResponse, EmployeeListResponse ,ToggleEmployeeRequest,ToggleEmployeeResponse} from '../../model/employee.model';
import { EmployeeService } from '../services/employee.service';

@Injectable({ providedIn: 'root' })
export class EmployeeRepositoryImpl implements EmployeeRepository {
  private service = inject(EmployeeService);

  getEmployeeList(page:number): Observable<EmployeeListResponse> {
    return this.service.getEmployeeList(page);
  }

   createEmployee(data: CreateEmployeeRequest): Observable<CreateEmployeeResponse> { 
    return this.service.createEmployee(data);
  }

  toggleEmployee(id: number, data: ToggleEmployeeRequest): Observable<ToggleEmployeeResponse> {
  return this.service.toggleEmployee(id, data);
}
}