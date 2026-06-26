import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpEngine } from '../../../../../service/engine/httpengine';
import { CreateEmployeeRequest, CreateEmployeeResponse,EmployeeListResponse } from '../../model/employee.model';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private http = inject(HttpEngine); 

  

  getEmployeeList(): Observable<EmployeeListResponse> {
    return this.http.get<EmployeeListResponse>('/employee', true);
  }

    createEmployee(data: CreateEmployeeRequest): Observable<CreateEmployeeResponse> { 

      console.log('Calling URL: /employee/create');
  console.log('Payload:', data);

    return this.http.post<CreateEmployeeResponse>('/employee/create', data, true);
  }
}