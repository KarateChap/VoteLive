import { Option } from './option.interface';

export interface Topic {
  id?: string;
  title: string;
  topicDescription: string;
  isCompleted?: boolean;
  isMultiVote?: boolean;
  createdAt?: Date;
  options: Option[];
}
