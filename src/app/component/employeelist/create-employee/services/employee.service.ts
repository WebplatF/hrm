import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpEngine } from '../../../../../service/engine/httpengine';
import { EmployeeListResponse } from '../../model/employee.model';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private http = inject(HttpEngine); 

  getEmployeeList(): Observable<EmployeeListResponse> {
    return this.http.get<EmployeeListResponse>('/employee', true);
  }
}