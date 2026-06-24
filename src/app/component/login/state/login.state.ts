import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoginUseCase } from '../usecase/login.usecase';
import { StorageEngine } from '../../../../service/interceptor/storage';
import { ToastService } from '../../../../service/toast/toast.service';
import { LoginRequest } from '../model/login.model';
import { UserDetails } from '../model/login.model';
 
@Injectable({ providedIn: 'root' })
export class LoginState {
  loading$ = new BehaviorSubject<boolean>(false);
  error$ = new BehaviorSubject<string | null>(null);
  user$ = new BehaviorSubject<UserDetails | null>(null);
 
  constructor(
    private loginUseCase: LoginUseCase,
    private storage: StorageEngine,
    private toast: ToastService
  ) { }
 
  login(data: LoginRequest) {
    this.loading$.next(true);
    this.error$.next(null);
 
    this.loginUseCase.execute(data).subscribe({
      next: (res) => {
        if (res.status) {
          const { accessToken, refreshToken, userDetails } = res.data;

  console.log('Full res:', res);       
  console.log('res.data:', res.data);  
  console.log('userDetails:', userDetails); 
 
          this.storage.setAccessToken(accessToken);
          this.storage.setRefreshToken(refreshToken);
          this.user$.next({ loggedIn: true } as any);
          this.user$.next(userDetails);
          this.toast.success(res.message || 'login successful');
        } else {
          this.error$.next(res.message);
          this.toast.error(res.message || 'Login failed');
        }
        this.loading$.next(false);
      },
      error: (err) => {
        const msg = err?.error?.message || 'Something went wrong';
        this.error$.next(msg);
        this.toast.error(msg);
        this.loading$.next(false);
      }
    });
  }

  
}