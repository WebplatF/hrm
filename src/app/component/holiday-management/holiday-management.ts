import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Holiday {
  date: string;
  name: string;
  type: 'National' | 'Regional' | 'Optional';
}

@Component({
  selector: 'app-holiday-management',
  imports: [CommonModule, FormsModule],
  templateUrl: './holiday-management.html',
  styleUrl: './holiday-management.scss',
})
export class HolidayManagement {
  today = new Date();

  selectedYear = this.today.getFullYear();
  selectedMonth = this.today.getMonth();
  selectedDate: string | null = null;

  years = [2024, 2025, 2026];

  months = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];

  weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  holidays: Holiday[] = [
    { date: '2026-01-01', name: 'New Year\'s Day',   type: 'National' },
    { date: '2026-01-14', name: 'Pongal',            type: 'Regional' },
    { date: '2026-01-15', name: 'Thiruvalluvar Day', type: 'Regional' },
    { date: '2026-01-26', name: 'Republic Day',      type: 'National' },
    { date: '2026-03-30', name: 'Holi',              type: 'National' },
    { date: '2026-04-02', name: 'Good Friday',       type: 'National' },
    { date: '2026-04-14', name: 'Tamil New Year',    type: 'Regional' },
    { date: '2026-05-01', name: 'Labour Day',        type: 'National' },
    { date: '2026-08-15', name: 'Independence Day',  type: 'National' },
    { date: '2026-10-02', name: 'Gandhi Jayanti',    type: 'National' },
    { date: '2026-10-20', name: 'Dussehra',          type: 'National' },
    { date: '2026-11-05', name: 'Diwali',            type: 'National' },
    { date: '2026-12-25', name: 'Christmas Day',     type: 'National' },
    { date: '2025-01-01', name: 'New Year\'s Day',   type: 'National' },
    { date: '2025-01-14', name: 'Pongal',            type: 'Regional' },
    { date: '2025-01-26', name: 'Republic Day',      type: 'National' },
    { date: '2025-05-01', name: 'Labour Day',        type: 'National' },
    { date: '2025-08-15', name: 'Independence Day',  type: 'National' },
    { date: '2025-10-02', name: 'Gandhi Jayanti',    type: 'National' },
    { date: '2025-10-23', name: 'My Birthday',       type: 'National' },
    { date: '2025-12-25', name: 'Christmas Day',     type: 'National' },

  ];

  get calendarDays(): (number | null)[] {
    const firstDay = new Date(this.selectedYear, this.selectedMonth, 1).getDay();
    const daysInMonth = new Date(this.selectedYear, this.selectedMonth + 1, 0).getDate();
    const days: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let d = 1; d <= daysInMonth; d++) days.push(d);
    return days;
  }

  get monthHolidays(): Holiday[] {
    const prefix = `${this.selectedYear}-${String(this.selectedMonth + 1).padStart(2, '0')}`;
    return this.holidays.filter(h => h.date.startsWith(prefix));
  }

  get isFutureMonth(): boolean {
    const selected = new Date(this.selectedYear, this.selectedMonth, 1);
    const current = new Date(this.today.getFullYear(), this.today.getMonth(), 1);
    return selected > current;
  }

  get selectedHoliday(): Holiday | null {
    if (!this.selectedDate) return null;
    return this.holidays.find(h => h.date === this.selectedDate) || null;
  }

  getDateString(day: number): string {
    return `${this.selectedYear}-${String(this.selectedMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  }

  isHolidayDay(day: number): boolean {
      // const dateStr = this.getDateString(day);
      // console.log('checking:', dateStr);
    return this.holidays.some(h => h.date === this.getDateString(day));
  }

  isToday(day: number): boolean {
    return (
      day === this.today.getDate() &&
      this.selectedMonth === this.today.getMonth() &&
      this.selectedYear === this.today.getFullYear()
    );
  }

  isSelected(day: number): boolean {
    return this.selectedDate === this.getDateString(day);
  }

  selectDate(day: number | null): void {
    if (!day) return;
    this.selectedDate = this.getDateString(day);
  }

  onMonthChange(): void {
    this.selectedDate = null;
    this.selectedYear = Number(this.selectedYear);
    this.selectedMonth = Number(this.selectedMonth);
  }

  getTypeClass(type: string): string {
    if (type === 'National') return 'national';
    if (type === 'Regional') return 'regional';
    return 'optional';
  }

  formatDate(dateStr: string): string {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  }
}