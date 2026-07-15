import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class EmployeeState {
  loading = signal(false);

  setLoading(status: boolean) {
    this.loading.set(status);
  }
}