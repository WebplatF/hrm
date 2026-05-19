import { Component, input } from '@angular/core';
import { Tablebody } from '../tablebody/tablebody';

@Component({
  selector: 'app-employeelist',
  imports: [Tablebody],
  templateUrl: './employeelist.html',
  styleUrl: './employeelist.scss',
})
export class Employeelist {
  title = input<string>('Employee Management');
  subtitle = input<string>('Manage and monitor employee status and corporate records.');
}