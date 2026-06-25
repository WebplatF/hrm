import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRepository } from '../repositories/login.repository';
import { LoginRequest, LoginResponse } from '../model/login.model';

@Injectable({ providedIn: 'root' })
export class LoginUseCase {
  private repo = inject(LoginRepository);

  login(data: LoginRequest): Observable<LoginResponse> {
    return this.repo.login(data);
  }
}