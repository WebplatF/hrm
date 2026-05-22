import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-create-employee',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-employee.html',
  styleUrl: './create-employee.scss',
})


export class CreateEmployee {

  previewUrl: string | ArrayBuffer | null =null;
  showPreview = false;
  employeeForm!: FormGroup;
selectedFile: File | null = null;  selectedFileName: string = '';
  selectedFileSize: string = '';
  imageError:boolean = false;

  //  CONSTRUCTOR

  constructor(private fb: FormBuilder) {

  this.employeeForm = this.fb.group({

    fullName: ['', Validators.required],

    email: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],

    employeeId: ['', Validators.required],

    department: ['', Validators.required],

    desigination: ['', Validators.required],

    joinDate: ['', Validators.required],

    profileImg: ['']

  });
 
}

// FORM FIELDS

  employeeFields = [

    {
      label: 'Full Name',
      type: 'text',
      placeholder: 'Enter full name',
      model: 'fullName'
    },

    {
      label: 'Email Address',
      type: 'email',
      placeholder: 'Enter email',
      model: 'email'
    },

    {
      label: 'EmployeeId',
      type: 'text',
      placeholder: 'EMP-2024-001',
      model: 'employeeId'
    },

    {
      label: 'Department',
      type: 'select',
      // placeholder: 'Select Department',
      model: 'department',

      options: [
        'HR',
        'Development'
      ]
    },

    {
      label: 'Desigination',
      type: 'text',
      placeholder: 'eg: Senior software Engineer',
      model: 'desigination'
    },

    {
      label: 'Date Of Join',
      type: 'date',
      placeholder: '',
      model: 'joinDate'
    }

  ];

  // SAVE EMPLOYEE

saveEmployee(){

  // IMAGE VALIDATION

  if(!this.selectedFile){

    this.imageError = true;

  }

  // FORM VALIDATION

  if(this.employeeForm.invalid || !this.selectedFile){

    this.employeeForm.markAllAsTouched();

    return;

  }

  // FINAL DATA

  const employeeData = {

    ...this.employeeForm.value,

    profileImg : this.selectedFile.name

  };

  console.log(employeeData);

  // RESET EVERYTHING

  this.employeeForm.reset();

  this.previewUrl = null;

  this.selectedFile = null;

  this.imageError = false;

}

  resetForm() {

  this.employeeForm.reset();
  this.previewUrl = null;
this.selectedFile = null;
}

  
  // FILE FUNCTION

 

  onFileSelected(event: Event){

  const input = event.target as HTMLInputElement;

  if(input.files && input.files.length > 0){

    this.selectedFile = input.files[0];
    this.imageError = false;

    this.previewUrl = URL.createObjectURL(this.selectedFile);

    this.selectedFileName = this.selectedFile.name;

    this.selectedFileSize =
      (this.selectedFile.size / 1024 / 1024).toFixed(2) + ' MB';

  }

}
    
  // removeImage(){
  //   this.previewUrl = null;
  //   this.selectedFile = null as any;
  // }
    


}