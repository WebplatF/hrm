import { Component } from '@angular/core';
import { List } from '../list/list';

interface Employee {
  sno: number;
  name: string;
  role: string;
  email: string;
  dateOfJoin: string;
  isActive: boolean;
}

@Component({
  selector: 'app-tablebody',
  imports: [List],
  templateUrl: './tablebody.html',
  styleUrls: ['./tablebody.scss'],
})
export class Tablebody {

}