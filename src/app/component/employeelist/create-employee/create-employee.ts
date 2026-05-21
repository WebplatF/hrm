import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { email } from '@angular/forms/signals';

@Component({
  selector: 'app-create-employee',
  imports: [CommonModule,FormsModule],
  templateUrl: './create-employee.html',
  styleUrl: './create-employee.scss',
})
export class CreateEmployee {
  employeeData: {

  [key: string]: string

} = {

  fullName: '',

  email: '',

  employeeId: '',

  department: '',

  desigination: '',

  joinDate: '',

  profileImg: ''

};
getModelValue(model: keyof typeof this.employeeData ) {

  return this.employeeData[model];

}
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
    model: 'EmployeeID'
  },
  {
    label: 'Department',
    type: 'select',
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
    model: 'Desigination'
  },
  {
    label: 'Date Of Join',
    type: 'date',
    placeholder: '',
    model: 'email'
  },


];

}
