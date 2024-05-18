import { User } from './user.interface';

export interface AuthState {
  isLoading: boolean;
  isSubmitting: boolean;
  currentUser: User | null;
}
