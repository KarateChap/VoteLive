import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { TopicState } from '../types/topic-state.interface';
import { topicActions } from './topic.actions';

const initialState: TopicState = {
  topics: null,
  selectedTopic: null,
  isLoading: false,
  isSubmitting: false,
};

const topicFeature = createFeature({
  name: 'topic',
  reducer: createReducer(
    initialState,
    //get topics
    on(topicActions.getTopics, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(topicActions.getTopicsSuccess, (state, action) => ({
      ...state,
      topics: action.topics,
      isLoading: false,
    })),
    on(topicActions.getTopicsFailure, (state) => ({
      ...state,
      isLoading: false,
    })),
    //create topic
    on(topicActions.createTopic, (state) => ({
      ...state,
      isSubmitting: true,
    })),
    on(topicActions.createTopicSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
      topics: [...(state.topics ?? []), action.topic],
    })),
    on(topicActions.createTopicFailure, (state) => ({
      ...state,
      isSubmitting: false,
    })),
    //update topic
    on(topicActions.updateTopic, (state) => ({
      ...state,
      isSubmitting: true,
    })),
    on(topicActions.updateTopicSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
      topics: (state.topics || []).map((topic) =>
        topic.id === action.topic.id ? { ...topic, ...action.topic } : topic
      ),
      selectedTopic: action.topic,
    })),
    on(topicActions.updateTopicFailure, (state) => ({
      ...state,
      isSubmitting: false,
    })),
    //delete topic
    on(topicActions.deleteTopic, (state) => ({
      ...state,
      isSubmitting: true,
    })),
    on(topicActions.deleteTopicSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
      topics: (state.topics || []).filter((topic) => topic.id !== action.id),
    })),
    on(topicActions.deleteTopicFailure, (state) => ({
      ...state,
      isSubmitting: false,
    })),
    //get current topic
    on(topicActions.getCurrentTopic, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(topicActions.getCurrentTopicSuccess, (state, action) => ({
      ...state,
      selectedTopic: action.topic,
      isLoading: false,
    })),
    on(topicActions.getCurrentTopicFailure, (state) => ({
      ...state,
      selectedTopic: null,
      isLoading: false,
    })),
    //set current topic
    on(topicActions.setCurrentTopic, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(topicActions.setCurrentTopicSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      selectedTopic: action.topic,
    }))
  ),
});

export const {
  name,
  reducer: topicReducer,
  selectIsLoading,
  selectIsSubmitting,
  selectSelectedTopic,
  selectTopics,
} = topicFeature;
