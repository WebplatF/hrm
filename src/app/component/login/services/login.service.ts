import { inject, Injectable } from "@angular/core";
import { LoginRepository } from "../repositories/login.repository";
import { LoginRequest, LoginResponse } from "../model/login.model";
import { Observable } from "rxjs";



@Injectable({ providedIn: 'root' })
export class LoginService {

  repo = inject(LoginRepository);

  // login(data:LoginRequest):Observable<LoginResponse>{
  // return this.repo.login(data);
  // }

  
}