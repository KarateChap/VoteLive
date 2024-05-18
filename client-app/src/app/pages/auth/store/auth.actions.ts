import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { LoginUser } from '../types/login-user.interface';
import { User } from '../types/user.interface';
import { RegisterUser } from '../types/register-user.interface';

export const authActions = createActionGroup({
  source: 'auth',
  events: {
    login: props<{ loginUser: LoginUser }>(),
    'login success': props<{ user: User }>(),
    'login failure': emptyProps(),

    register: props<{ registerUser: RegisterUser }>(),
    'register success': props<{ user: User }>(),
    'register failure': emptyProps(),

    'get current user': emptyProps(),
    'get current user success': props<{ user: User }>(),
    'get current user failure': emptyProps(),

    logout: emptyProps(),
    'logout success': emptyProps(),
  },
});
