import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { authActions } from '../../pages/auth/store/auth.actions';
import {
  selectCurrentUser,
  selectIsSubmitting,
} from '../../pages/auth/store/auth.reducers';
import { ConfirmPopup } from 'primeng/confirmpopup';
import { combineLatest } from 'rxjs';

interface FileUploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] | undefined;
  menuItems: MenuItem[] | undefined;
  visible: boolean = false;

  currentUser$ = this.store.select(selectCurrentUser);
  isSubmitting$ = this.store.select(selectIsSubmitting);

  data$ = combineLatest({
    currentUser: this.store.select(selectCurrentUser),
    isSubmitting: this.store.select(selectIsSubmitting),
  });

  uploadedFiles: any[] = [];

  @ViewChild(ConfirmPopup) confirmPopup!: ConfirmPopup;

  constructor(private router: Router, private store: Store) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        command: (event: any) => this.onNavClicked(event.item.label),
      },
      {
        label: 'Docs',
        icon: 'pi pi-book',
        command: (event: any) => this.onNavClicked(event.item.label),
      },
      // {
      //   label: 'Test Errors',
      //   icon: 'pi pi-times-circle',
      //   command: (event: any) => this.onNavClicked(event.item.label),
      // },
    ];

    this.menuItems = [
      {
        label: 'Profile Info',
        icon: 'pi pi-cog',
        command: (event: any) => this.onMenuClicked(event.item.label, event),
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
    } else if (option === 'Docs') {
      window.open(
        'https://ralphs-personal-organization.gitbook.io/vote-live/',
        '_blank'
      );
    } else {
      this.router.navigateByUrl('/test-errors');
    }
  }

  onMenuClicked(option: string, event?: any) {
    if (option === 'Logout') {
      this.store.dispatch(authActions.logout());
    } else {
      this.showDialog();
    }
  }

  showDialog() {
    this.visible = true;
  }

  onUpload(event: any) {
    this.store.dispatch(authActions.updateUserImage({ file: event.files[0] }));
  }
}
