import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { UserComment } from '../types/comments';

export const commentActions = createActionGroup({
  source: 'comment',
  events: {
    'load comments': props<{ comments: UserComment[] }>(),
    'load comments success': props<{ comments: UserComment[] }>(),
    'receive comment': props<{ comment: UserComment }>(),
    'receive comment success': props<{ comment: UserComment }>(),
    'clear comments': emptyProps(),
    'clear comments success': emptyProps(),
  },
});
