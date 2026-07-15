import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LoginState } from './state/login.state';
import { LoginUseCase } from './usecase/login.usecase';
import { LoginService } from './services/login.service';
import { LoginRepository } from './repositories/login.repository';
import { LoginRepositoryImpl } from './repositories/login.repository.impl';
import { StorageEngine } from '../../../service/interceptor/storage';
import { AccessType } from './model/login.model';
import { ToastService } from '../../../service/toast/toast.service';
import { LoginRequest } from './model/login.model';

export function emailOrPhoneValidator(control: AbstractControl) {
  const value = control.value?.trim();
  if (!value) return null;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value) ? null : { invalidEmail: true };
}

@Component({
  selector: 'app-login-main',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: '../login/view/login.html',
  styleUrl: '../login/view/login.scss',
  providers: [
    LoginUseCase,
    LoginService,
    LoginState,
    { provide: LoginRepository, useClass: LoginRepositoryImpl },
  ],
})
export class LoginMain implements OnInit {
  public state   = inject(LoginState);
  private usecase = inject(LoginUseCase);
  
  private activatedRoute = inject(ActivatedRoute);
  private fb      = inject(FormBuilder);
  private storage = inject(StorageEngine);
  private toast = inject(ToastService)
  private cd = inject(ChangeDetectorRef);

  loginform!: FormGroup;
  submitted    = false;
  loading = false;
  showPassword = false;
  accessType: AccessType = 'admin';


  ngOnInit(): void {
     this.activatedRoute.queryParams.subscribe((params) => {
      this.accessType = params['tag'] || 'admin';
    });

    this.loginform = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() { return this.loginform.controls; }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  constructor(private router: Router) {}

  onSubmit(): void {
    this.submitted = true;
    this.state.setLoading(true);

     if (this.loginform.invalid) {
       this.loginform.markAllAsTouched();
       this.state.setLoading(false);
      return;
    }

    this.state.setLoading(true);
    const payload: LoginRequest = {
  email: this.f['email'].value,
  password: this.f['password'].value,
  access_type: this.accessType as 'admin' | 'user',
};

    this.usecase.execute(payload).subscribe({
      next:(res)=>{
        if(res.status){
          const {access_token,refresh_token}=res.data;
          this.storage.setAccessToken(access_token);
          this.storage.setRefreshToken(refresh_token);
          this.toast.success(res.message || 'login successful');
          
          setTimeout(() => {
  this.router.navigateByUrl('main/dashboard');
}, 1000);
        } else {
          console.log('STATUS FALSE');
          this.toast.error(res.message || 'Login failed');
        }
       this.state.setLoading(false);
      },
    error: (err) => {
  const msg = err?.error?.message || 'Something went wrong';
  this.toast.error(msg);

  this.state.setLoading(false);;
}

    });
  }
}