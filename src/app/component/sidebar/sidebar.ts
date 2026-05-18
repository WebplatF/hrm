import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface NavSubItem {
  label: string;
  route: string;
  iconPath: string;
  hasChevron?: boolean;
   iconViewBox?: string;
   tag?:string | undefined;
}

export interface NavItem {
  key: string;
  label: string;
  iconSvg: SafeHtml;
  hasSubmenu: boolean;
  route?: string;
  exact?: boolean;
  children?: NavSubItem[];
}

// ─── Raw Nav Config (before sanitization) ────────────────────────────────────

interface RawNavItem {
  key: string;
  label: string;
  iconViewBox: string;
  iconMarkup: string;
  hasSubmenu: boolean;
  route?: string;
  exact?: boolean;
  children?: NavSubItem[];
}

const RAW_NAV_ITEMS: RawNavItem[] = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    iconViewBox: '0 0 24 24',
    iconMarkup: `
      <rect x="3"  y="3"  width="7" height="7" rx="1" fill="none" stroke="currentColor" stroke-width="1.8"/>
      <rect x="14" y="3"  width="7" height="7" rx="1" fill="none" stroke="currentColor" stroke-width="1.8"/>
      <rect x="3"  y="14" width="7" height="7" rx="1" fill="none" stroke="currentColor" stroke-width="1.8"/>
      <rect x="14" y="14" width="7" height="7" rx="1" fill="none" stroke="currentColor" stroke-width="1.8"/>
    `,
    hasSubmenu: false,
    route: '/dashboard',
    exact: true,
  },

  {
    key: 'vendors',
    label: 'Vendors',
    iconViewBox: '0 0 24 24',
    iconMarkup: `
      <path fill="none" stroke="currentColor" stroke-width="1.8"
        d="M6.123 7.25L6.914 2H2.8L1.081 6.5C1.028 6.66 1 6.826 1 7c0 1.104 1.15 2 2.571 2
           c1.31 0 2.393-.764 2.552-1.75zM10 9c1.42 0 2.571-.896 2.571-2
           c0-.041-.003-.082-.005-.121L12.057 2H7.943l-.51 4.875
           A2.527 2.527 0 0 0 7.429 7c0 1.104 1.151 2 2.571 2zm5 1.046V14H5v-3.948
           c-.438.158-.92.248-1.429.248c-.195 0-.384-.023-.571-.049V16.6
           c0 .77.629 1.4 1.398 1.4H15.6c.77 0 1.4-.631 1.4-1.4v-6.348
           a4.297 4.297 0 0 1-.571.049A4.155 4.155 0 0 1 15 10.046z
           M18.92 6.5L17.199 2h-4.113l.79 5.242C14.03 8.232 15.113 9 16.429 9
           C17.849 9 19 8.104 19 7c0-.174-.028-.34-.08-.5z"/>
    `,
    hasSubmenu: true,
    children: [
      {
        label: 'Vendor Creation',
        route: 'vendor-create',
        iconPath: 'M3 3h18v18H3V3zm9 5v8m-4-4h8',
        hasChevron: true,
      },
      {
        label: 'Vendor List',
        route: 'vendor-list',
        iconPath: 'M3 3h18v18H3V3zM7 8h10M7 12h10M7 16h6',
        hasChevron: false,
      },
    ],
  },

  {
    key: 'user-management',
    label: 'User Management',
    iconViewBox: '0 0 56 56',
    iconMarkup: `
      <path fill="none" stroke="currentColor" stroke-width="2.8" fill-rule="evenodd"
        d="M53.51 51H2a2 2 0 0 1-1.32-3.503c3.594-3.154 5.442-4.748 5.545-4.783
           c.194-.056.386-.115.572-.17c5.458-1.675 6.763-3.124 7.255-4.723
           c.904-.404 1.242-.682 1.422-1.643c.112-.61.2-2.66.114-3.37
           c-.517-.505-.798-1.804-1.048-2.323c-.58-1.201-.682-1.822-1.239-3.843
           c-.085-.27-.269-.287-.398-.34c-.194-.08-.363-.21-.542-.454
           c-.507-.686-.19-1.074-.665-2.377c-.605-1.482-.849-2.945-.388-3.383
           c.31-.278.52-.098.671-.042c.1.038.023-.215-.066-.58
           c-.365-1.492-.386-4.47-.386-4.47l.056-.001
           c-.187-1.245-.144-2.392.682-4.13c.813-1.777 1.54-1.385 1.95-1.841
           c1.723-1.941 3.308-1.991 4.498-2.504c2.675-1.155 4.93-.132 6.734.623
           c.76.327 2.971.58 3.71 2.212c.43.95.808 2.575.954 2.72
           c.154.701.238 1.831.158 3.07c-.098 1.53-.1 2.795-.462 4.288
           c-.092.363-.171.617-.07.578c.153-.057.343-.263.653.014
           c.459.438.365 1.964-.24 3.446c-.473 1.303-.212 1.543-.514 2.077
           c-.13.233-.22.548-.611.69c-.13.048-.288.163-.348.442
           c-.422 1.964-.528 2.322-.97 3.796c-.165.55-.542 1.737-1.04 2.204
           c-.104.844.142 3.01.283 3.498c.33 1.143.645 1.366 1.287 1.643
           c.758 1.585 1.35 3.634 6.758 4.647c.33-.372.51-.746.627-1.133
           c.652-.296.895-.5 1.024-1.204c.081-.448.144-1.951.083-2.472
           c-.373-.37-.576-1.323-.756-1.704c-.417-.88-.49-1.336-.892-2.817
           c-.061-.199-.194-.211-.287-.25a.91.91 0 0 1-.39-.333
           c-.365-.503-.137-.787-.48-1.743c-.435-1.087-.61-2.16-.278-2.481
           c.223-.203.373-.072.483-.03c.072.027.017-.158-.048-.426
           c-.263-1.094-.278-3.277-.278-3.277l.04-.002
           c-.134-.913-.103-1.754.492-3.029c.586-1.302 1.11-1.015 1.404-1.35
           c1.242-1.423 2.383-1.46 3.24-1.836c1.927-.847 3.552-.096 4.851.457
           c.547.24 2.14.425 2.672 1.622c.31.698.583 1.889.688 1.996
           c.11.513.171 1.342.114 2.25c-.07 1.122-.072 2.05-.333 3.145
           c-.067.266-.124.452-.05.423c.11-.04.246-.192.47.011
           c.33.321.263 1.44-.173 2.527c-.34.956-.153 1.132-.37 1.523
           c-.094.171-.158.402-.44.506c-.094.035-.208.12-.251.324
           c-.304 1.44-.38 1.703-.699 2.784c-.118.404-.39 1.274-.75 1.616
           c-.074.62.103 2.208.205 2.566c.237.838.464 1.001.927 1.204
           c.569 1.211 1.007 2.79 5.371 3.497c.199.032.404.063.62.092l2.98 2.558
           A2 2 0 0 1 53.51 51"/>
    `,
    hasSubmenu: true,
    exact: true,
    children: [
      {
        label: 'User Creation',
        route: 'user-create',
        iconPath: 'M3 3h18v18H3V3zm9 5v8m-4-4h8',
        hasChevron: true,
      },
      {
        label: 'User List',
        route: 'user-list',
        iconPath: 'M3 3h18v18H3V3zM7 8h10M7 12h10M7 16h6',
        hasChevron: false,
      },
        {
        label: 'Permission',
        route: 'permission',
        iconPath: 'M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4zm-2 10l2 2 4-4',
        hasChevron: false,
      }

    ]
  },

  {
    key: 'case',
    label: 'Case',
    iconViewBox: '0 0 24 24',
    iconMarkup: `
      <rect x="2"  y="5"  width="20" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/>
      <path d="M16 5V3a1 1 0 00-1-1H9a1 1 0 00-1 1v2" fill="none" stroke="currentColor" stroke-width="1.8"/>
      <line x1="7"  y1="11" x2="17" y2="11" stroke="currentColor" stroke-width="1.8"/>
      <line x1="7"  y1="15" x2="13" y2="15" stroke="currentColor" stroke-width="1.8"/>
    `,
    hasSubmenu: true,
    children: [
      {
        label: 'Case Creation',
        route: 'case-create',
        iconPath: 'M3 3h18v18H3V3zm9 5v8m-4-4h8',
        hasChevron: true,
      },
      {
        label: 'Case List',
        route: 'case',
        iconPath: 'M3 3h18v18H3V3zM7 8h10M7 12h10M7 16h6',
        hasChevron: false,
        tag:'case_list'
      },
      {
        label: 'QC Evaluation',
        route: 'case',
        iconPath: 'M3 3h18v18H3V3zM7 8h10M7 12h10M7 16h6',
        hasChevron: false,
        tag:'qc_valuation'

      },
      {
        label: 'Higher Evaluation',
        route: 'higher-evaluation',
        iconPath: 'M3 3h18v18H3V3zM7 8h10M7 12h10M7 16h6',
        hasChevron: false,
      },
    {
  label: 'Case Completed',
  route: 'case-completed',
  iconPath: 'M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm-1 13l-3-3 1.5-1.5L11 12l3.5-3.5L16 10z',
  hasChevron: false,
},
      {
  label: 'Case Rejected',
  route: 'case-rejected',
  iconPath: 'M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm3 13l-1.5 1.5L12 13.5l-1.5 1.5L9 15l1.5-1.5L9 12l1.5-1.5L12 12l1.5-1.5L15 12l-1.5 1.5z',
  hasChevron: false,
},
    ],
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLinkActive, RouterLink],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss'],
})
export class Sidebar {
  readonly navItems: NavItem[];

  openSection: string | null = null;

constructor(
  private sanitizer: DomSanitizer,
  private router: Router
) {
  this.navItems = RAW_NAV_ITEMS.map(item => ({
    ...item,
    iconSvg: this.sanitizer.bypassSecurityTrustHtml(
      `<svg width="20" height="20" viewBox="${item.iconViewBox}" fill="none">${item.iconMarkup}</svg>`
    ),
  }));

  this.setActiveMenu();
}

setActiveMenu() {
  const url = this.router.url;

  this.navItems.forEach(item => {
    if (item.children) {
      const found = item.children.find(c => url.includes(c.route));
      if (found) {
        this.openSection = item.key;
      }
    }
  });
}

  toggleSection(key: string): void {
    this.openSection = this.openSection === key ? null : key;
  }

  /** Returns true if the given section key is currently open. */
  isOpen(key: string): boolean {
    return this.openSection === key;
  }

  /** Closes all sections (used on direct nav-link click). */
  closeAll(): void {
    this.openSection = null;
  }
handleMenuClick(child: any, event: Event) {
  event.stopPropagation();

  const base = '/dashboard';

  //ONLY case-list should use tag
  if (child.route === 'case' && child.tag) {
    this.router.navigate([base, 'case', child.tag]);
  } else {
    this.router.navigate([base, child.route]);
  }
}
}