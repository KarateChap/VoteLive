import { Error } from '../../../shared/types/error.interface';
import { User } from './user.interface';

export interface AuthState {
  isSubmitting: boolean;
  currentUser: User | null | undefined;
  isLoading: boolean;
  validationErrors: Error | null;
}
