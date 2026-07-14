import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpEngine } from '../../../../../service/engine/httpengine';
import { CreateEmployeeRequest, CreateEmployeeResponse,EmployeeListResponse ,ToggleEmployeeRequest,ToggleEmployeeResponse} from '../../model/employee.model';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private http = inject(HttpEngine); 

  getEmployeeList(): Observable<EmployeeListResponse> {
    return this.http.get<EmployeeListResponse>('/employee', true);
  }

    createEmployee(data: CreateEmployeeRequest): Observable<CreateEmployeeResponse> { 
    return this.http.post<CreateEmployeeResponse>('/employee/create', data, true);
  }

  toggleEmployee(id: number, data: ToggleEmployeeRequest): Observable<ToggleEmployeeResponse> {
  return this.http.patch<ToggleEmployeeResponse>(`/employee/toggle/${id}`, data, true); 
}
}