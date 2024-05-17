import { createFeature, createReducer, on } from '@ngrx/store';
import { CommonState } from '../types/common-state.interface';
import { commonActions } from './common.action';

const initialState: CommonState = {
  error: null,
};

const commonFeature = createFeature({
  name: 'common',
  reducer: createReducer(
    initialState,
    on(commonActions.setServerError, (state, action) => ({
      ...state,
      error: action.error,
    }))
  ),
});

export const { name, reducer: commonReducer, selectError } = commonFeature;
