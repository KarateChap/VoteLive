import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PrimeNGConfig } from 'primeng/api';
import { PersistenceService } from './shared/services/persistence.service';
import { authActions } from './pages/auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(
    private primengConfig: PrimeNGConfig,
    private store: Store,
    private persistenceService: PersistenceService
  ) {}

  ngOnInit() {
    this.primengConfig.ripple = true;

    if (this.persistenceService.get('accessToken')) {
      this.store.dispatch(authActions.getCurrentUser());
    }
  }
}
