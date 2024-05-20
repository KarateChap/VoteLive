import { createFeature, createReducer, on } from '@ngrx/store';
import { CommentState } from '../types/comment-state.interface';
import { commentActions } from './comment.action';

const initialState: CommentState = {
  comments: null,
};

const commentFeature = createFeature({
  name: 'comment',
  reducer: createReducer(
    initialState,
    //load comments
    on(commentActions.loadComments, (state) => ({
      ...state,
    })),
    on(commentActions.loadCommentsSuccess, (state, action) => {
      const updatedComments = action.comments.map((comment) => ({
        ...comment,
        createdAt: new Date(comment.createdAt + 'Z'),
      }));

      return {
        ...state,
        comments: updatedComments,
      };
    }),
    on(commentActions.receiveComment, (state) => ({
      ...state,
    })),
    on(commentActions.receiveCommentSuccess, (state, action) => ({
      ...state,
      comments: [action.comment, ...(state.comments || [])],
    })),
    on(commentActions.clearComments, (state) => ({
      ...state,
    })),
    on(commentActions.clearComments, (state) => ({
      ...state,
      comments: [],
    }))
  ),
});

export const { name, reducer: commentReducer, selectComments } = commentFeature;
