import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Topic } from '../types/topic.interface';
import { User } from '../../auth/types/user.interface';
import { VotePayload } from '../types/vote-payload.interface';

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

    'Get current topic': props<{ topic: Topic }>(),
    'Get current topic success': props<{ topic: Topic }>(),

    'Set current topic': props<{ topic: Topic }>(),
    'Set current topic success': props<{ topic: Topic }>(),

    'Update vote': props<{ votePayload: VotePayload; currentUser: User }>(),
    'Update vote success': props<{
      votePayload: VotePayload;
      currentUser: User;
    }>(),
    'Update vote failure': emptyProps(),
  },
});
