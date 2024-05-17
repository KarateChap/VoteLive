import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { commonActions } from './common.action';
import { catchError, of, tap } from 'rxjs';
import { ServerError } from '../types/server-error.interface';

export const setServerError = createEffect(
  (actions$ = inject(Actions)) =>
    actions$.pipe(
      ofType(commonActions.setServerError),
      tap((action) => {
        return commonActions.setServerError({ error: action.error });
      })
    ),
  {
    functional: true,
    dispatch: false,
  }
);
