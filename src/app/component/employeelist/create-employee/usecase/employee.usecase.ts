import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeRepository } from '../repositories/employee.repository'; 
import {CreateEmployeeRequest, CreateEmployeeResponse, EmployeeListResponse ,ToggleEmployeeRequest,ToggleEmployeeResponse} from '../../model/employee.model';

@Injectable({ providedIn: 'root' })
export class EmployeeUseCase {
  private repo = inject(EmployeeRepository);

  getEmployeeList(page:number): Observable<EmployeeListResponse> {
    return this.repo.getEmployeeList(page);
  }

  createEmployee(data: CreateEmployeeRequest): Observable<CreateEmployeeResponse> { 
    return this.repo.createEmployee(data);
  }

  toggleEmployee(id: number, data: ToggleEmployeeRequest): Observable<ToggleEmployeeResponse> {
  return this.repo.toggleEmployee(id, data);
}
}