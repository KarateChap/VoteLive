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

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private hubConnection: HubConnection | null = null;
  baseUrl = environment.baseUrl;

  constructor(
    private store: Store,
    private persistenceService: PersistenceService
  ) {}

  startConnection(groupName: string, id: string) {
    const accessToken = this.persistenceService.get('accessToken');

    if (accessToken) {
      this.hubConnection = new HubConnectionBuilder()
        .withUrl(`${this.baseUrl}chat?${groupName}=${id}`, {
          accessTokenFactory: () => accessToken,
        })
        .withAutomaticReconnect()
        .configureLogging(LogLevel.Information)
        .build();

      this.hubConnection
        .start()
        .then(() => console.log('Connection started'))
        .catch((err) => console.log('Error while starting connection: ' + err));
    }
  }

  stopConnection() {
    this.hubConnection
      ?.stop()
      .then(() => console.log('Connection stopped'))
      .catch((err) => console.log('Error while stopping connection: ' + err));
  }

  loadComments() {
    this.hubConnection?.on('LoadComments', (comments: UserComment[]) => {
      this.store.dispatch(commentActions.loadComments({ comments }));
    });
  }

  receiveComment() {
    this.hubConnection?.on('ReceiveComment', (comment: UserComment) => {
      this.store.dispatch(commentActions.receiveComment({ comment }));
    });
  }

  postComment(commentPayload: CommentPayload) {
    try {
      this.hubConnection?.invoke('SendComment', commentPayload);
    } catch (error) {
      console.log(error);
    }
  }
}
