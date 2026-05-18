import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginState } from './state/login.state';
import { LoginRepository } from './repositories/login.repository';
import { LoginRepositoryImpl } from './repositories/login.repository.impl';
import { LoginUseCase } from './usecase/login.usecase';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LoginService } from './services/login.service';
import { ToastComponent } from '../../../service/toast/toast';

@Component({
  selector: 'app-login-Main',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink, RouterLinkActive, ToastComponent,],
  templateUrl: '../login/view/login.html',
  styleUrl: '../login/view/login.scss',
  providers: [
    LoginUseCase,
    LoginService,
    LoginState,
    {
      provide: LoginRepository,
      useClass: LoginRepositoryImpl
    }
  ]
})
export class LoginMain {
private state          = inject(LoginState);
  private route          = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private fb             = inject(FormBuilder);
  private cd             = inject(ChangeDetectorRef);

  loginform!: FormGroup;
  submitted    = false;
  loading      = false;
  showPassword = false;
  accessType   = 'admin';

  loading$ = this.state.loading$;
  error$   = this.state.error$;

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.accessType = params['tag'] || 'admin';
    });

    this.loginform = this.fb.group({
      email:    ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    // this.state.user$.subscribe((user: any) => {
    //   if (user) this.route.navigateByUrl('dashboard');
    // });
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
      this.loading = false;
      return;
    }

    this.loading = true;
    this.state.login({
      email:       this.loginform.value.email,
      password:    this.loginform.value.password,
      access_type: this.accessType,
    });
  }


}