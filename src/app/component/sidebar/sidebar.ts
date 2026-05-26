import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { routes } from '../../app.routes';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  standalone: true,
  imports: [CommonModule,RouterModule],
})

export class Sidebar {

  // Active menu
  activeMenu: string = 'Dashboard';

  // Mobile sidebar state
  isSidebarOpen: boolean = false;

  // Sidebar menus
  subMenus = [

    {
      name: 'Dashboard',
      icon: 'bi bi-columns-gap',
      route: '/main/dashboard',
    },

    {
      name: 'Employee Management',
      icon: 'bi bi-people',
      route: '/main/employees',
    },

    {
    name: 'Attendance Management',
    icon:"bi bi-journal-text",
    route: '/main/attendance',
   },

   {
      name: 'Permissions Management',
      icon: 'bi bi-calendar2-x',
      route: '/permissions',
    },

    {
      name: 'Leave Management',
      icon:'bi bi-calendar4-week',
      route:'/main/leaves'
    },
    
    {
      name: 'Holiday Management',
      icon: 'bi bi-calendar4',
      route: '/holidays',
    },
    

  ];


  // Toggle sidebar
  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }


  // Close sidebar
  closeSidebar(): void {
    this.isSidebarOpen = false;
  }


  // Active menu
  setActive(name: string): void {
    this.activeMenu = name;

    // Auto close mobile sidebar after click
    if (window.innerWidth <= 768) {
      this.closeSidebar();

    }

  }


  // ESC key close
  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    this.closeSidebar();

  }


  // Desktop resize close
  @HostListener('window:resize')
  onResize(): void {
    if (window.innerWidth > 768) {
      this.isSidebarOpen = false;

    } 

  }

}