import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Topic } from '../types/topic.interface';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { UpdateVote } from '../types/update-vote';
import { User } from '../../auth/types/user.interface';

export const topicActions = createActionGroup({
  source: 'topic',
  events: {
    'Get topics': emptyProps(),
    'Get topics success': props<{ topics: Topic[] }>(),
    'Get topics failure': emptyProps(),

    'Create topic': props<{ topic: Topic }>(),
    'Create topic success': props<{ topic: Topic }>(),
    'Create topic failure': emptyProps(),

    'Update topic': props<{ topic: Topic }>(),
    'Update topic success': props<{ topic: Topic }>(),
    'Update topic failure': emptyProps(),

    'Delete topic': props<{ id: string }>(),
    'Delete topic success': props<{ id: string }>(),
    'Delete topic failure': emptyProps(),

    'Get current topic': props<{ id: string }>(),
    'Get current topic success': props<{ topic: Topic }>(),
    'Get current topic failure': emptyProps(),

    'Set current topic': props<{ topic: Topic }>(),
    'Set current topic success': props<{ topic: Topic }>(),

    'Update vote': props<{ updateVote: UpdateVote; currentUser: User }>(),
    'Update vote success': props<{
      updateVote: UpdateVote;
      currentUser: User;
    }>(),
    'Update vote failure': emptyProps(),
  },
});
