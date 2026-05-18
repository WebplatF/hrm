import { inject, Injectable } from "@angular/core";
import { LoginRepository } from "./login.repository";

import { LoginRequest, LoginResponse, LoginResult } from "../model/login.model";
import { Observable } from "rxjs";
import { HttpEngine } from "../../../../service/engine/httpengine";

@Injectable({ providedIn: 'root' })
export class LoginRepositoryImpl implements LoginRepository {

  http = inject(HttpEngine);

  //  login(data: LoginRequest): Observable<LoginResponse> {
  //     console.log('API HIT 🚀', data);
  //   return this.http.post<LoginResponse>('auth/login',data)
  // }

}