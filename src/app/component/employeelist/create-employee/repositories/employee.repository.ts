import { Observable } from 'rxjs';
import { CreateEmployeeRequest, CreateEmployeeResponse, EmployeeListResponse ,ToggleEmployeeRequest,ToggleEmployeeResponse} from '../../model/employee.model';

export abstract class EmployeeRepository {
  abstract getEmployeeList(): Observable<EmployeeListResponse>;
  abstract createEmployee(data: CreateEmployeeRequest): Observable<CreateEmployeeResponse>;
  abstract toggleEmployee(id: number, data: ToggleEmployeeRequest): Observable<ToggleEmployeeResponse>;
}