import { createFeature, createReducer, on } from '@ngrx/store';
import { AuthState } from '../types/auth-state.interface';
import { authActions } from './auth.actions';

const initialState: AuthState = {
  isLoading: false,
  isSubmitting: false,
  currentUser: null,
};

const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    //login
    on(authActions.login, (state) => ({
      ...state,
      isSubmitting: true,
    })),
    on(authActions.loginSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
      currentUser: action.user,
    })),
    on(authActions.loginFailure, (state) => ({
      ...state,
      isSubmitting: false,
    })),

    //register
    on(authActions.register, (state) => ({
      ...state,
      isSubmitting: true,
    })),
    on(authActions.registerSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
      currentUser: action.user,
    })),
    on(authActions.registerFailure, (state) => ({
      ...state,
      isSubmitting: false,
    })),

    //get current user
    on(authActions.getCurrentUser, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(authActions.getCurrentUserSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      currentUser: action.user,
    })),
    on(authActions.getCurrentUserFailure, (state) => ({
      ...state,
      isSubmitting: false,
    })),

    //logout
    on(authActions.logout, (state) => ({
      ...state,
    })),
    on(authActions.logoutSuccess, (state) => ({
      ...state,
      currentUser: null,
      token: null,
    })),

    // update user image
    on(authActions.updateUserImage, (state) => ({
      ...state,
      isSubmitting: true,
    })),
    on(authActions.updateUserImageSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
      currentUser: action.user,
    })),
    on(authActions.updateUserImageFailure, (state) => ({
      ...state,
      isSubmitting: false,
    }))
  ),
});

export const {
  name,
  reducer: authReducer,
  selectCurrentUser,
  selectIsLoading,
  selectIsSubmitting,
} = authFeature;
