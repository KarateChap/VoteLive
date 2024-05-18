import { Option } from './option.interface';
import { Voter } from './voter.interface';

export interface Topic {
  id?: string;
  title: string;
  topicDescription: string;
  createdAt?: Date;
  options: Option[];
  creator: Voter;
}
