import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { commentActions } from './comment.action';
import { map } from 'rxjs';

export const loadCommentsEffect = createEffect(
  (action$ = inject(Actions)) => {
    return action$.pipe(
      ofType(commentActions.loadComments),
      map(({ comments }) => commentActions.loadCommentsSuccess({ comments }))
    );
  },
  { functional: true }
);

export const receiveCommentEffect = createEffect(
  (action$ = inject(Actions)) => {
    return action$.pipe(
      ofType(commentActions.receiveComment),
      map(({ comment }) => commentActions.receiveCommentSuccess({ comment }))
    );
  },
  { functional: true }
);

export const clearCommentsEffect = createEffect(
  (action$ = inject(Actions)) => {
    return action$.pipe(
      ofType(commentActions.clearComments),
      map(() => commentActions.clearCommentsSuccess())
    );
  },
  { functional: true }
);
