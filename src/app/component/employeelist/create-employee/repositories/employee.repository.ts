import { Observable } from 'rxjs';
import { CreateEmployeeRequest, CreateEmployeeResponse, EmployeeListResponse } from '../../model/employee.model';

export abstract class EmployeeRepository {
  abstract getEmployeeList(): Observable<EmployeeListResponse>;
  abstract createEmployee(data: CreateEmployeeRequest): Observable<CreateEmployeeResponse>;
}