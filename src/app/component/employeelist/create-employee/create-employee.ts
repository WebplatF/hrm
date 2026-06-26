import { CommonModule, Location } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeUseCase } from './usecase/employee.usecase';
import { EmployeeRepository } from './repositories/employee.repository';
import { EmployeeRepositoryImpl } from './repositories/employee.repository.impl';
import { EmployeeService } from './services/employee.service';
import { EmployeeState } from './state/employee.state';
import { ToastService } from '../../../../service/toast/toast.service';

@Component({
  selector: 'app-create-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './view/create-employee.html',
  styleUrl: './view/create-employee.scss',
  providers: [
    EmployeeUseCase,
    EmployeeService,
    { provide: EmployeeRepository, useClass: EmployeeRepositoryImpl },
  ],
})
export class CreateEmployee implements OnInit {
  private fb       = inject(FormBuilder);
  private location = inject(Location);
  private usecase  = inject(EmployeeUseCase);
  private state    = inject(EmployeeState);
  private toast    = inject(ToastService);


  loading$ = this.state.loading$;
  error$   = this.state.error$;

  // Image
  previewUrl: string | ArrayBuffer | null = null;
  showPreview    = false;
  selectedFile: File | null = null;
  selectedFileName: string = '';
  selectedFileSize: string = '';
  imageError: boolean = false;

  // Edit mode
  isEditMode: boolean = false;
  editData: any = null;

  employeeForm!: FormGroup;

  employeeFields = [
    { label: 'Full Name',     type: 'text',   placeholder: 'e.g. Jonathan Doe',       model: 'fullName'    },
    { label: 'Email Address', type: 'email',  placeholder: 'j.doe@company.com',        model: 'email'       },
    { label: 'Employee ID',   type: 'text',   placeholder: 'EMP-2024-001',             model: 'employeeId'  },
    { label: 'Department',    type: 'select', placeholder: '',                          model: 'department',
      options: [
    { id: 1, name: 'HR' },
    { id: 2, name: 'Development' },
  ]},
    { label: 'Designation',   type: 'text',   placeholder: 'e.g. Senior Software Eng', model: 'desigination'},
    { label: 'Date Of Join',  type: 'date',   placeholder: '',                          model: 'joinDate'    },
  ];

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      fullName:    ['', Validators.required],
      email:       ['', [Validators.required, Validators.email]],
      employeeId:  ['', Validators.required],
      department:  ['', Validators.required],
      desigination:['', Validators.required],
      joinDate:    ['', Validators.required],
      profileImg:  [''],
    });

    // Edit mode check
    const state = history.state;
    if (state?.isEdit && state?.employeeData) {
      this.isEditMode = true;
      this.editData   = state.employeeData;
      this.prefillForm(this.editData);
    }
  }

  prefillForm(data: any): void {
    this.employeeForm.patchValue({
      fullName:    data.name          || '',
      email:       data.email         || '',
      employeeId:  data.emp_code      || '', 
      department:  data.department_id || '',
      desigination:data.desigination  || '',
      joinDate:    data.date_of_join  ? this.convertToInputDate(data.date_of_join) : '',
    });

    if (data.image) {
      this.previewUrl      = data.image;
      this.selectedFileName = 'Current Photo';
    }
  }

  convertToInputDate(dateStr: string): string {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return '';
    return date.toISOString().split('T')[0];
  }

  saveEmployee(): void {
    if (!this.isEditMode && !this.selectedFile) {
      this.imageError = false;
    }

    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    const payload = {
      name:          this.employeeForm.value.fullName,
      email:         this.employeeForm.value.email,
      department_id: Number(this.employeeForm.value.department),
      desigination:  this.employeeForm.value.desigination,
      date_of_join:  this.employeeForm.value.joinDate,
      image:         null as string | null,
    };

    this.state.loading$.next(true); 
    this.state.error$.next(null);

    this.usecase.createEmployee(payload).subscribe({
      next: (res) => {
        if (res.status === 200) {
          this.toast.success(res.message || 'Employee Created Successfully');
          this.resetForm();
          this.location.back();
        } else {
          this.state.error$.next(res.message);
          this.toast.error(res.message);
        }
        this.state.loading$.next(false);
      },
      error: (err) => {
        const msg = err?.error?.message || 'Something went wrong';
        this.state.error$.next(msg);
        this.toast.error(msg);
        this.state.loading$.next(false);
      }
    });
  }

  resetForm(): void {
    this.employeeForm.reset({
      fullName: '', email: '', employeeId: '',
      department: '', desigination: '', joinDate: '', profileImg: ''
    });
    this.previewUrl   = null;
    this.selectedFile = null;
    this.imageError   = false;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile     = input.files[0];
      this.imageError       = false;
      this.previewUrl       = URL.createObjectURL(this.selectedFile);
      this.selectedFileName = this.selectedFile.name;
      this.selectedFileSize = (this.selectedFile.size / 1024 / 1024).toFixed(2) + ' MB';
    }
  }

  goBack(): void {
    this.location.back();
  }
}