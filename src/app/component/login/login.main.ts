import { Component, inject, OnInit } from '@angular/core';
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
    { provide: LoginRepository, useClass: LoginRepositoryImpl },
  ],
})
export class LoginMain implements OnInit {
  private state   = inject(LoginState);
  private usecase = inject(LoginUseCase);
  private route   = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private fb      = inject(FormBuilder);
  private storage = inject(StorageEngine);

  loginform!: FormGroup;
  submitted    = false;
  showPassword = false;
  accessType: AccessType = 'admin';

  loading$ = this.state.loading$;
  error$   = this.state.error$;

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.accessType = params['tag'] || 'admin';
    });

    this.loginform = this.fb.group({
      email:    ['', [Validators.required, emailOrPhoneValidator]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.state.isLoggedIn$.subscribe((loggedIn) => {
      if (loggedIn) this.route.navigate(['/main/dashboard']);
    });
  }

  get f() { return this.loginform.controls; }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.loginform.invalid) return;

    this.state.loading$.next(true);
    this.state.error$.next(null);

    this.usecase.login({
      email:       this.loginform.value.email,
      password:    this.loginform.value.password,
      access_type: this.accessType,
    }).subscribe({
      next: (res) => {
        if (res.status === 200) {
          //  console.log('Access token:', res.data.access_token);   
          //  console.log('Refresh token:', res.data.refresh_token); 
          this.storage.setAccessToken(res.data.access_token);
          this.storage.setRefreshToken(res.data.refresh_token);
          this.state.isLoggedIn$.next(true);
        } else {
          this.state.error$.next(res.message);
        }
        this.state.loading$.next(false);
      },
      error: (err) => {
        const msg = err?.error?.message || 'User Email or Password Invalid';
        this.state.error$.next(msg);
        this.state.loading$.next(false);
      }
    });
  }
}