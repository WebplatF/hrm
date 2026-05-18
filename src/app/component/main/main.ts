import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Sidebar } from '../sidebar/sidebar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main',
  imports: [RouterOutlet,Sidebar,CommonModule],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main {



}
