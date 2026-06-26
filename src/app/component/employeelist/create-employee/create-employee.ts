import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './view/create-employee.html',
  styleUrl: './view/create-employee.scss',
})


export class CreateEmployee implements OnInit {

  previewUrl: string | ArrayBuffer | null =null; //Stores image preview URL.
  showPreview = false; //Controls image preview modal open/close.
  employeeForm!: FormGroup; //Stores entire form. etc. fullname,
selectedFile: File | null = null;   //Stores uploaded image file.
selectedFileName: string = ''; //Stores uploaded file name. ex.(myphoto).png
  selectedFileSize: string = ''; 
  imageError:boolean = false; 
  isEditMode: boolean = false;  
  editData: any = null;       

  //  CONSTRUCTOR

  constructor(private fb: FormBuilder,private location:Location) {

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

  ngOnInit() {  
    const state = history.state;
    if (state?.isEdit && state?.employeeData) {
      this.isEditMode = true;
      this.editData = state.employeeData;
      this.prefillForm(this.editData);
    }
  }

    prefillForm(data: any) { 
    
    const parsedDate = data.dateOfJoin ? this.convertToInputDate(data.dateOfJoin) : '';
    this.employeeForm.patchValue({
      fullName: data.name || '',
      email: data.email || '',
      employeeId: data.employeeCode || '',
      department: data.department || '',
      desigination: data.role || '',
      joinDate: parsedDate || '',
    });
  

    if (data.profileImg) {
      this.previewUrl = data.profileImg;
      this.selectedFileName = 'Current Photo';
    }
  }

  convertToInputDate(dateStr: string): string {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return '';
  return date.toISOString().split('T')[0];
}

// FORM FIELDS

  employeeFields = [

    {
      label: 'Full Name',
      type: 'text',
      placeholder: 'e.g.Jonathan Doe ',
      model: 'fullName'
    },

    {
      label: 'Email Address',
      type: 'email',
      placeholder: 'j.doe@company.com',
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

//   get visibleFields() {
//   return this.employeeFields.filter(field => 
//     this.isEditMode ? field.model !== 'email' && field.model !== 'department' : true
//   );
// }

  // SAVE EMPLOYEE

saveEmployee(){

  // IMAGE VALIDATION

   if (!this.isEditMode && !this.selectedFile) {
    this.imageError = false;
  }

  // FORM VALIDATION

  if (this.employeeForm.invalid || (!this.isEditMode && !this.selectedFile)) {
    this.employeeForm.markAllAsTouched();
    return;
  }

  // FINAL DATA

  const employeeData = {
      ...this.employeeForm.value,
      profileImg: this.selectedFile ? this.selectedFile.name : (this.editData?.profileImg || '')
    };

  if (this.isEditMode) {
      console.log('Updated:', employeeData);  
    } else {
      console.log('Created:', employeeData); 
    }

     this.resetForm();
    this.location.back();


  // RESET EVERYTHING

  this.employeeForm.reset({
     fullName: '',

  email: '',

  employeeId: '',

  department: '',

  desigination: '',

  joinDate: '',

  profileImg: ''
  })

  this.previewUrl = null;

  this.selectedFile = null;

  this.imageError = false;

}

  resetForm() {

  this.employeeForm.reset({
     fullName: '',

  email: '',

  employeeId: '',

  department: '',

  desigination: '',

  joinDate: '',

  profileImg: ''
  })
  this.previewUrl = null;
this.selectedFile = null;
this.imageError = false;
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
goBack(){
  this.location.back();
}
    
  // removeImage(){
  //   this.previewUrl = null;
  //   this.selectedFile = null as any;
  // }
    


}