import { Injectable } from '@angular/core';
import { HttpEngine } from '../../../../../service/engine/httpengine';
import { EmployeeListResponse } from '../../model/employee.model';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  constructor(private http: HttpEngine) {}

  getEmployeeList() {
    return this.http.get<EmployeeListResponse>('/employee', true);
  }
}