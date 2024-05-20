import { UserComment } from './comments';

export interface CommentState {
  comments: UserComment[] | null;
}
