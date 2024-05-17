import { ServerError } from './server-error.interface';

export interface CommonState {
  error: ServerError | null;
}
