import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Employee } from '../../model/employee.model';

@Injectable({ providedIn: 'root' })
export class EmployeeState {
  loading$ = new BehaviorSubject<boolean>(false);
  error$   = new BehaviorSubject<string | null>(null);
  list$    = new BehaviorSubject<Employee[]>([]);
}