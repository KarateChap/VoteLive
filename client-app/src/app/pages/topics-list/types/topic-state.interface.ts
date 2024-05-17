import { Topic } from './topic.interface';

export interface TopicState {
  topics: Topic[] | null;
  selectedTopic: Topic | null;
  isLoading: boolean;
  isSubmitting: boolean;
}
