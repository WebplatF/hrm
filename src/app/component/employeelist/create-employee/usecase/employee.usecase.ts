import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeRepository } from '../repositories/employee.repository'; 
import {CreateEmployeeRequest, CreateEmployeeResponse, EmployeeListResponse ,ToggleEmployeeRequest,ToggleEmployeeResponse} from '../../model/employee.model';

@Injectable({ providedIn: 'root' })
export class EmployeeUseCase {
  private repo = inject(EmployeeRepository);

  getEmployeeList(): Observable<EmployeeListResponse> {
    return this.repo.getEmployeeList();
  }

  createEmployee(data: CreateEmployeeRequest): Observable<CreateEmployeeResponse> { 
    return this.repo.createEmployee(data);
  }

  toggleEmployee(id: number, data: ToggleEmployeeRequest): Observable<ToggleEmployeeResponse> {
  return this.repo.toggleEmployee(id, data);
}
}