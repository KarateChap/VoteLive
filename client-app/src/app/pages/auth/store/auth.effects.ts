import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../auth.service';
import { ToastService } from '../../../shared/services/toast.service';
import { authActions } from './auth.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { User } from '../types/user.interface';
import { Router } from '@angular/router';
import { PersistenceService } from '../../../shared/services/persistence.service';

export const loginEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    toastService = inject(ToastService),
    router = inject(Router),
    persistenceService = inject(PersistenceService)
  ) => {
    return actions$.pipe(
      ofType(authActions.login),
      switchMap(({ loginUser }) => {
        return authService.login(loginUser).pipe(
          map((user: User) => {
            toastService.fireToast('success', 'Success', 'Login successfully.');
            router.navigateByUrl('/app/topics-list');
            persistenceService.set('accessToken', user.token);
            return authActions.loginSuccess({ user });
          }),
          catchError((error) => {
            return of(authActions.loginFailure());
          })
        );
      })
    );
  },
  { functional: true }
);

export const registerEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    toastService = inject(ToastService),
    router = inject(Router),
    persistenceService = inject(PersistenceService)
  ) => {
    return actions$.pipe(
      ofType(authActions.register),
      switchMap(({ registerUser }) => {
        return authService.register(registerUser).pipe(
          map((user: User) => {
            toastService.fireToast('success', 'Success', 'Login successfully.');
            router.navigateByUrl('/app/topics-list');
            persistenceService.set('accessToken', user.token);
            return authActions.loginSuccess({ user });
          }),
          catchError((error) => {
            return of(authActions.registerFailure());
          })
        );
      })
    );
  },
  { functional: true }
);

export const getCurrentUserEffect = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) => {
    return actions$.pipe(
      ofType(authActions.getCurrentUser),
      switchMap(() => {
        return authService.getCurrentUser().pipe(
          map((user: User) => {
            return authActions.getCurrentUserSuccess({ user });
          }),
          catchError((error) => {
            return of(authActions.getCurrentUserFailure());
          })
        );
      })
    );
  },
  { functional: true }
);

export const logoutEffect = createEffect(
  (
    actions$ = inject(Actions),
    router = inject(Router),
    persistenceService = inject(PersistenceService),
    toastService = inject(ToastService)
  ) => {
    return actions$.pipe(
      ofType(authActions.logout),
      tap(() => {
        router.navigateByUrl(`/`);
      }),
      map(() => {
        persistenceService.removeToken('accessToken');
        toastService.fireToast('success', 'Success', 'Login successfully.');
        return authActions.logoutSuccess();
      })
    );
  },
  { functional: true }
);

export const updateUserImagerEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    toastService = inject(ToastService)
  ) => {
    return actions$.pipe(
      ofType(authActions.updateUserImage),
      switchMap(({ file }) => {
        return authService.uploadImage(file).pipe(
          map((user: User) => {
            toastService.fireToast(
              'success',
              'Success',
              'Image successfully updated.'
            );
            return authActions.updateUserImageSuccess({ user });
          }),
          catchError((error) => {
            return of(authActions.updateUserImageFailure());
          })
        );
      })
    );
  },
  { functional: true }
);
