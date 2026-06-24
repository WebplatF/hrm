import { Injectable } from '@angular/core';
import { LoginService } from '../services/login.service';
import { LoginRequest, LoginResponse } from '../model/login.model';
import { Observable } from 'rxjs';
 
@Injectable({ providedIn: 'root' })
export class LoginUseCase {
  constructor(private service: LoginService) {}
 
  execute(data: LoginRequest): Observable<LoginResponse> {
    return this.service.login(data);
  }
}