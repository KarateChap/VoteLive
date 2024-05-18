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

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);
  const store = inject(Store);

  return new Observable<boolean>((observer) => {
    const subscription = store
      .select(selectCurrentUser)
      .pipe(map((currentUser) => !!currentUser))
      .subscribe((isAuthenticated) => {
        if (!isAuthenticated) {
          router.navigate(['']);
        }
        observer.next(isAuthenticated);
        observer.complete();
      });

    return () => subscription.unsubscribe();
  });
};
