import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { catchError } from 'rxjs';
import { Store } from '@ngrx/store';
import { commonActions } from '../common-store/common.action';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const store = inject(Store);
  const toastService = inject(ToastService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error) {
        switch (error.status) {
          case 400:
            if (error.error.errors) {
              const modelStateErrors = [];
              for (const key in error.error.errors) {
                if (error.error.errors[key]) {
                  modelStateErrors.push(error.error.errors[key]);
                }
              }
              throw modelStateErrors.flat();
            } else {
              toastService.fireToast('error', 'Error', 'Bad request');
            }
            break;
          case 401:
            toastService.fireToast('error', 'Error', 'Unauthorised');
            break;
          case 403:
            toastService.fireToast('error', 'Error', 'Forbidden');
            break;
          case 404:
            toastService.fireToast('error', 'Error', 'Not found');
            router.navigateByUrl('test-errors/not-found');
            break;
          case 500:
            store.dispatch(
              commonActions.setServerError({ error: error.error })
            );
            toastService.fireToast('error', 'Error', 'Server error');
            router.navigateByUrl('test-errors/server-error');
            break;
          default:
            break;
        }
      }
      throw error;
    })
  );
};
