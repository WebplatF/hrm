import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest, LoginResponse } from '../model/login.model';
import { HttpEngine } from '../../../../service/engine/httpengine';

@Injectable({ providedIn: 'root' })
export class LoginService {
  private http = inject(HttpEngine);

  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('/login', data, false);
  }
}
