import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from './toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (toastService.toast()?.length) {
      <div class="toast-wrapper">
        @for (toast of toastService.toast(); track toast.id) {
          <div class="toast" [ngClass]="toast.type">

            <div class="icon-pill">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor"
                   stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                   width="14" height="14">
                <ng-container [ngSwitch]="toast.type">
                  <ng-container *ngSwitchCase="'success'">
                    <path d="M3 8l3.5 3.5L13 4"/>
                  </ng-container>
                  <ng-container *ngSwitchCase="'error'">
                    <circle cx="8" cy="8" r="6"/>
                    <path d="M8 5v3.5M8 10.5v.5"/>
                  </ng-container>
                  <ng-container *ngSwitchCase="'warning'">
                    <path d="M8 2L1.5 13h13L8 2z"/>
                    <path d="M8 7v2.5M8 11v.5"/>
                  </ng-container>
                  <ng-container *ngSwitchDefault>
                    <circle cx="8" cy="8" r="6"/>
                    <path d="M8 7v4M8 5v.5"/>
                  </ng-container>
                </ng-container>
              </svg>
            </div>

            <span class="toast-message">{{ toast.message }}</span>

            <button class="close-btn" (click)="toastService.remove(toast.id)">
              <svg viewBox="0 0 10 10" fill="none" stroke="currentColor"
                   stroke-width="1.8" stroke-linecap="round" width="10" height="10">
                <path d="M1 1l8 8M9 1L1 9"/>
              </svg>
            </button>

          </div>
        }
      </div>
    }
  `,
  styles: [`
    .toast-wrapper {
      position: fixed;
      top: 20px;
      right: 20px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      z-index: 2147483647;
      pointer-events: none;
    }

    .toast {
      pointer-events: auto;
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 13px 16px;
      min-width: 300px;
      max-width: 380px;
      border-radius: 10px;
      background: white;
      color: #111214;
      font-size: 13.5px;
      font-weight: 400;
      position: relative;
      overflow: hidden;
      animation: slideIn 0.35s cubic-bezier(0.22, 1, 0.36, 1) both;
    }

    /* Left accent bar */
    .toast::before {
      content: '';
      position: absolute;
      left: 0; top: 0; bottom: 0;
      // width: 8px;
    }
    .toast.success::before { background: #22c55e; }
    .toast.error::before   { background: #ef4444; }
    .toast.warning::before { background: #f59e0b; }
    .toast.info::before    { background: #3b82f6; }

    /* Progress bar */
    .toast::after {
      content: '';
      position: absolute;
      bottom: 0; left: 0;
      height: 2px;
      animation: shrink 4s linear forwards;
    }
    .toast.success::after { background: #22c55e; }
    .toast.error::after   { background: #ef4444; }
    .toast.warning::after { background: #f59e0b; }
    .toast.info::after    { background: #3b82f6; }

    /* Icon pill */
    .icon-pill {
      width: 28px;
      height: 28px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .success .icon-pill { background: rgba(34, 197, 94, 0.15); color: #22c55e; }
    .error   .icon-pill { background: rgba(239, 68,  68, 0.15); color: #ef4444; }
    .warning .icon-pill { background: rgba(245,158, 11, 0.15); color: #f59e0b; }
    .info    .icon-pill { background: rgba(59, 130,246, 0.15); color: #3b82f6; }

    .toast-message {
      flex: 1;
      line-height: 1.45;
      letter-spacing: -0.01em;
    }

    .close-btn {
      width: 24px;
      height: 24px;
      border-radius: 6px;
      background: rgba(255,255,255,0.07);
      border: none;
      color: #666;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: background 0.15s, color 0.15s;
    }
    .close-btn:hover {
      background: rgba(255,255,255,0.13);
      color: #ccc;
    }

    @keyframes slideIn {
      from { transform: translateX(110%); opacity: 0; }
      to   { transform: translateX(0);    opacity: 1; }
    }
    @keyframes shrink {
      from { width: 100%; }
      to   { width: 0; }
    }
  `]
})
export class ToastComponent {
  toastService = inject(ToastService);
}