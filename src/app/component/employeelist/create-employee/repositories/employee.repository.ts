import { Observable } from "rxjs";
import { EmployeeListResponse } from "../../model/employee.model";

export abstract class EmployeeRepository{
    abstract getEmployeeList():Observable<EmployeeListResponse>;
}