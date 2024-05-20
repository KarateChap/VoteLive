import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TopicsListService } from '../topics-list.service';
import { topicActions } from './topic.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Topic } from '../types/topic.interface';
import { ToastService } from '../../../shared/services/toast.service';
import { ModalService } from '../../../shared/services/modal.service';
import { Router } from '@angular/router';

export const getTopicEffect = createEffect(
  (
    actions$ = inject(Actions),
    topicListService = inject(TopicsListService)
  ) => {
    return actions$.pipe(
      ofType(topicActions.getTopics),
      switchMap(() => {
        return topicListService.getTopics().pipe(
          map((topics: Topic[]) => {
            return topicActions.getTopicsSuccess({ topics });
          }),
          catchError(() => {
            return of(topicActions.getTopicsFailure());
          })
        );
      })
    );
  },
  { functional: true }
);

export const createTopicEffect = createEffect(
  (
    actions$ = inject(Actions),
    topicListService = inject(TopicsListService),
    toastService = inject(ToastService),
    modalService = inject(ModalService)
  ) => {
    return actions$.pipe(
      ofType(topicActions.createTopic),
      switchMap(({ topic }) => {
        return topicListService.createTopic(topic).pipe(
          map((newTopic: Topic) => {
            toastService.fireToast(
              'success',
              'Success',
              'The topic has been added successfully.'
            );
            modalService.closeModal();
            return topicActions.createTopicSuccess({ topic: newTopic });
          }),
          catchError((error) => {
            return of(topicActions.createTopicFailure());
          })
        );
      })
    );
  },
  { functional: true }
);

export const updateTopicEffect = createEffect(
  (
    actions$ = inject(Actions),
    topicListService = inject(TopicsListService),
    toastService = inject(ToastService),
    modalService = inject(ModalService)
  ) => {
    return actions$.pipe(
      ofType(topicActions.updateTopic),
      switchMap(({ topic }) => {
        return topicListService.updateTopic(topic).pipe(
          map((newTopic) => {
            toastService.fireToast(
              'success',
              'Success',
              'The topic has been updated successfully.'
            );
            modalService.closeModal();
            return topicActions.updateTopicSuccess({ topic: newTopic });
          }),
          catchError((error) => {
            return of(topicActions.updateTopicFailure());
          })
        );
      })
    );
  },
  { functional: true }
);

export const deleteTopicEffect = createEffect(
  (
    actions$ = inject(Actions),
    topicListService = inject(TopicsListService),
    toastService = inject(ToastService),
    router = inject(Router)
  ) => {
    return actions$.pipe(
      ofType(topicActions.deleteTopic),
      switchMap(({ id }) => {
        return topicListService.deleteTopic(id).pipe(
          map(() => {
            toastService.fireToast(
              'success',
              'Success',
              'The topic has been deleted successfully.'
            );
            router.navigateByUrl('/app/topics-list');
            return topicActions.deleteTopicSuccess({ id });
          }),
          catchError((error) => {
            return of(topicActions.deleteTopicFailure());
          })
        );
      })
    );
  },
  { functional: true }
);

export const getCurrentTopicEffect = createEffect(
  (
    actions$ = inject(Actions),
    topicListService = inject(TopicsListService)
  ) => {
    return actions$.pipe(
      ofType(topicActions.getCurrentTopic),
      switchMap(({ id }) => {
        return topicListService.getTopic(id).pipe(
          map((topic: Topic) => {
            return topicActions.getCurrentTopicSuccess({ topic });
          }),
          catchError((error) => {
            return of(topicActions.getCurrentTopicFailure());
          })
        );
      })
    );
  },
  { functional: true }
);

export const setCurrentTopicEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(topicActions.setCurrentTopic),
      tap(({ topic }) => {
        router.navigateByUrl(`/app/topics-list/${topic.id}`);
      }),
      map(({ topic }) => topicActions.setCurrentTopicSuccess({ topic }))
    );
  },
  { functional: true }
);

export const updateVoteEffect = createEffect(
  (
    actions$ = inject(Actions),
    topicListService = inject(TopicsListService),
    toastService = inject(ToastService)
  ) => {
    return actions$.pipe(
      ofType(topicActions.updateVote),
      switchMap(({ updateVote, currentUser }) => {
        return topicListService.updateVote(updateVote).pipe(
          map(() => {
            toastService.fireToast(
              'success',
              'Success',
              'Vote successfully submitted.'
            );

            return topicActions.updateVoteSuccess({ updateVote, currentUser });
          }),
          catchError((error) => {
            return of(topicActions.updateVoteFailure());
          })
        );
      })
    );
  },
  { functional: true }
);
