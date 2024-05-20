import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from '../../pages/auth/store/auth.reducers';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PersistenceService } from '../services/persistence.service';

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);
  // const store = inject(Store);
  const persistenceService = inject(PersistenceService);

  const isAuthenticated = persistenceService.get('accessToken');

  if (isAuthenticated) {
    return isAuthenticated;
  } else {
    persistenceService.removeToken('accessToken');
    router.navigate(['']);
    return false;
  }
};
