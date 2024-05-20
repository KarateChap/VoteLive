import { Injectable } from '@angular/core';
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from '@microsoft/signalr';
import { Store } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { PersistenceService } from './persistence.service';
import { commentActions } from '../../pages/topics-list/topic-detail/comments/store/comment.action';
import { CommentPayload } from '../../pages/topics-list/topic-detail/comments/types/comment-payload.interface';
import { UserComment } from '../../pages/topics-list/topic-detail/comments/types/comments';
import { Topic } from '../../pages/topics-list/types/topic.interface';
import { VotePayload } from '../../pages/topics-list/types/vote-payload.interface';
import { topicActions } from '../../pages/topics-list/store/topic.actions';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private hubConnections: { [key: string]: HubConnection | null } = {
    chat: null,
    vote: null,
  };

  baseUrl = environment.baseUrl;

  constructor(
    private store: Store,
    private persistenceService: PersistenceService
  ) {}

  private createConnection(hub: string, url: string, accessToken: string) {
    return new HubConnectionBuilder()
      .withUrl(url, {
        accessTokenFactory: () => accessToken,
      })
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();
  }

  startConnection(groupName: string, hub: string, id: string) {
    const accessToken = this.persistenceService.get('accessToken');
    if (!accessToken) return;

    const url = `${this.baseUrl}${hub}?${groupName}=${id}`;
    this.hubConnections[hub] = this.createConnection(hub, url, accessToken);

    this.hubConnections[hub]
      ?.start()
      .then(() => console.log(`${hub} connection started`))
      .catch((err) =>
        console.error(`Error while starting ${hub} connection: `, err)
      );
  }

  stopConnection(hub: string) {
    this.hubConnections[hub]
      ?.stop()
      .then(() => console.log(`${hub} connection stopped`))
      .catch((err) =>
        console.error(`Error while stopping ${hub} connection: `, err)
      );
  }

  stopAllConnections() {
    Object.keys(this.hubConnections).forEach((hub) => this.stopConnection(hub));
  }

  loadComments() {
    this.hubConnections['chat']?.on(
      'LoadComments',
      (comments: UserComment[]) => {
        this.store.dispatch(commentActions.loadComments({ comments }));
      }
    );
  }

  receiveComment() {
    this.hubConnections['chat']?.on(
      'ReceiveComment',
      (comment: UserComment) => {
        this.store.dispatch(commentActions.receiveComment({ comment }));
      }
    );
  }

  postComment(commentPayload: CommentPayload) {
    this.invokeHubMethod('chat', 'SendComment', commentPayload);
  }

  loadTopic() {
    this.hubConnections['vote']?.on('LoadTopic', (topic: Topic) => {
      this.store.dispatch(topicActions.getCurrentTopic({ topic }));
    });
  }

  receiveVote() {
    this.hubConnections['vote']?.on('ReceiveVote', (topic: Topic) => {
      this.store.dispatch(topicActions.getCurrentTopic({ topic }));
    });
  }

  updateVote(votePayload: VotePayload) {
    this.invokeHubMethod('vote', 'UpdateVote', votePayload);
  }

  private invokeHubMethod(hub: string, method: string, payload: any) {
    try {
      this.hubConnections[hub]?.invoke(method, payload);
    } catch (error) {
      console.error(`Error invoking ${method} on ${hub} hub: `, error);
    }
  }
}
