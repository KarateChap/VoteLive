import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { UserAuth } from '../types/user-auth.interface';
import { User } from '../types/user.interface';
import { Error } from '../../../shared/types/error.interface';

export const authActions = createActionGroup({
  source: 'auth',
  events: {
    Register: props<{ request: UserAuth }>(),
    'Register success': props<{ currenUser: User }>(),
    'Register failure': props<{ errors: Error }>(),

    Login: props<{ request: UserAuth }>(),
    'Login success': props<{ currentUser: User }>(),
    'Login failure': props<{ errors: Error }>(),

    'Get current user': emptyProps(),
    'Get current user success': props<{ currentUser: User }>(),
    'Get current user failure': emptyProps(),
  },
});
