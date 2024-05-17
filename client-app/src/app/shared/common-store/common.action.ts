import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ServerError } from '../types/server-error.interface';

export const commonActions = createActionGroup({
  source: 'common',
  events: {
    'set server error': props<{ error: ServerError }>(),
  },
});
