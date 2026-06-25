import { CommonModule} from '@angular/common';
import { Component, HostListener ,inject} from '@angular/core';
import { routes } from '../../app.routes';
import { Router, RouterModule } from '@angular/router';
import { StorageEngine } from '../../../service/interceptor/storage';
import { LoginState } from '../login/state/login.state';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class Sidebar {
  private _activeMenu: string = 'Dashboard';
  private storage = inject(StorageEngine);
  private state   = inject(LoginState);

  get activeMenu(): string {
    return this._activeMenu;
  }

  set activeMenu(value: string) {
    if (value === 'logout') {
      // localStorage.removeItem('token');
      this.storage.clear();
      this.state.isLoggedIn$.next(false); 
      this.router.navigate(['/login']);
      return;
    }
    this._activeMenu = value;
  }

  isSidebarOpen: boolean = false;

  subMenus = [
    { name: 'Dashboard', icon: 'bi bi-columns-gap', route: '/main/dashboard' },
    { name: 'Employee Management', icon: 'bi bi-people', route: '/main/employees' },
    { name: 'Attendance Management', icon: 'bi bi-journal-text', route: '/main/attendance' },
    { name: 'Permissions Management', icon: 'bi bi-calendar2-x', route: '/main/permission' },
    { name: 'Leave Management', icon: 'bi bi-calendar4-week', route: '/main/leaves' },
    { name: 'Holiday Management', icon: 'bi bi-calendar4', route: '/main/holiday' },
  ];

  constructor(private router: Router) {}

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  closeSidebar(): void {
    this.isSidebarOpen = false;
  }

  setActive(name: string): void {
    this.activeMenu = name;
    if (window.innerWidth <= 768) this.closeSidebar();
  }

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    this.closeSidebar();
  }

  @HostListener('window:resize')
  onResize(): void {
    if (window.innerWidth > 768) this.isSidebarOpen = false;
  }
}
