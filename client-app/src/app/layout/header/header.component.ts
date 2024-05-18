import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { authActions } from '../../pages/auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] | undefined;
  menuItems: MenuItem[] | undefined;

  constructor(private router: Router, private store: Store) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        command: (event: any) => this.onNavClicked(event.item.label),
      },
      {
        label: 'Guide',
        icon: 'pi pi-book',
        command: (event: any) => this.onNavClicked(event.item.label),
      },
      {
        label: 'Test Errors',
        icon: 'pi pi-times-circle',
        command: (event: any) => this.onNavClicked(event.item.label),
      },
    ];

    this.menuItems = [
      {
        label: 'Profile Settings',
        icon: 'pi pi-cog',
        command: (event: any) => this.onMenuClicked(event.item.label),
      },
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: (event: any) => this.onMenuClicked(event.item.label),
      },
    ];
  }

  onNavClicked(option: string) {
    if (option === 'Home') {
      this.router.navigateByUrl('/app/topics-list');
    } else if (option === 'Guide') {
      this.router.navigateByUrl('/app/topics-list');
    } else {
      this.router.navigateByUrl('/test-errors');
    }
  }

  onMenuClicked(option: string) {
    if (option === 'Logout') {
      this.store.dispatch(authActions.logout());
    } else {
    }
  }
}
