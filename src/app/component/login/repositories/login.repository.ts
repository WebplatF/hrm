import { Observable } from 'rxjs';
import { LoginRequest, LoginResponse, LoginResult, UserDetails } from '../model/login.model';
import { inject, Injectable } from '@angular/core';
import { HttpEngine } from '../../../../service/engine/httpengine';



export abstract class LoginRepository {
 

  // abstract login(data:LoginRequest):Observable<LoginResponse>;
}