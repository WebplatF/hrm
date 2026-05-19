import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from '../service/toast/toast';
import { Sidebar } from './component/sidebar/sidebar';
import { Employeelist } from './component/employeelist/employeelist';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,ToastComponent,Sidebar,Employeelist],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Hrm-dashboard');
  
}
