import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder,FormGroup,FormsModule,ReactiveFormsModule,Validators,} from '@angular/forms';
import { LoginState } from './state/login.state';
import { LoginRepository } from './repositories/login.repository';
import { LoginRepositoryImpl } from './repositories/login.repository.impl';
import { LoginUseCase } from './usecase/login.usecase';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LoginService } from './services/login.service';
import { AbstractControl } from '@angular/forms';
import { AccessType } from './model/login.model';

export function emailOrPhoneValidator(control: AbstractControl) {
  const value = control.value?.trim();
  if (!value) return null;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(value) ? null : { invalidEmail: true };
}

@Component({
  selector: 'app-login-Main',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: '../login/view/login.html',
  styleUrl: '../login/view/login.scss',
  providers: [
    LoginUseCase,
    LoginService,
    LoginState,
    {
      provide: LoginRepository,
      useClass: LoginRepositoryImpl,
    },
  ],
})
export class LoginMain implements OnInit {
  private state          = inject(LoginState);
  private route          = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private fb             = inject(FormBuilder);
  private cd             = inject(ChangeDetectorRef);

  constructor(private router: Router) {}

  loginform!: FormGroup;
  submitted    = false;
  showPassword = false;
  accessType :AccessType  = 'admin';

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

    this.loginform.get('email')?.valueChanges.subscribe((value) => {
      if (!value) return;
      if (/^\d/.test(value)) {
        let digits = value.replace(/\D/g, '').substring(0, 10);
        this.loginform.get('email')?.setValue(digits, { emitEvent: false });
      }
    });
    
    this.state.user$.subscribe((user: any) => {
      console.log('user$ triggered:', user);
      if (user) this.route.navigate(['/main/dashboard']);
    });
  }

  get f() {
    return this.loginform.controls;
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.loginform.invalid) {
      return;
    }

    this.state.login({
      email:       this.loginform.value.email,
      password:    this.loginform.value.password,
      access_type: this.accessType,
    });
  }
}