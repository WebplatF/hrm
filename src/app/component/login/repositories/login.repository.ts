import { Observable } from 'rxjs';
import { LoginRequest, LoginResponse } from '../model/login.model';

export abstract class LoginRepository {
  abstract login(data: LoginRequest): Observable<LoginResponse>;
}
