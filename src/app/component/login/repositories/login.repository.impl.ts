import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRepository } from './login.repository';
import { LoginRequest, LoginResponse } from '../model/login.model';
import { LoginService } from '../services/login.service';

@Injectable({ providedIn: 'root' })
export class LoginRepositoryImpl implements LoginRepository {
  private service = inject(LoginService);

  login(data: LoginRequest): Observable<LoginResponse> {
    return this.service.login(data);
  }
}