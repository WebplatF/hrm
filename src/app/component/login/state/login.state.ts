import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { LoginRequest, UserDetails } from "../model/login.model";
import { LoginUseCase } from "../usecase/login.usecase";
import { inject } from "@angular/core/testing";
import { StorageEngine } from "../../../../service/interceptor/storage";
import { ToastService } from "../../../../service/toast/toast.service";

@Injectable({ providedIn: 'root' })
export class LoginState {

login(arg0: { email: any; password: any; access_type: string; }) {
    throw new Error('Method not implemented.');
  }
  loading$: any;
  error$: any;
  user$: any;
}