import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { Topic } from '../types/topic.interface';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ManageTopicComponent } from '../manage-topic/manage-topic.component';
import { ModalService } from '../../../shared/services/modal.service';
import { Store } from '@ngrx/store';
import { topicActions } from '../store/topic.actions';
import { combineLatest } from 'rxjs';
import { selectIsLoading, selectSelectedTopic } from '../store/topic.reducers';
import { UtilityService } from '../../../shared/services/utility.service';
import { Option } from '../types/option.interface';
import { selectCurrentUser } from '../../auth/store/auth.reducers';
import { User } from '../../auth/types/user.interface';
import { commentActions } from './comments/store/comment.action';
import { SignalRService } from '../../../shared/services/signalr.service';
import { selectComments } from './comments/store/comment.reducers';

@Component({
  selector: 'app-topic-detail',
  templateUrl: './topic-detail.component.html',
  styleUrl: './topic-detail.component.scss',
})
export class TopicDetailComponent implements OnInit, OnDestroy {
  topic: Topic | null = null;
  items: MenuItem[] | undefined;
  breadCrumbItems: MenuItem[] | undefined;
  home: MenuItem | undefined;
  topicId: string | null = null;
  ref: DynamicDialogRef | undefined;
  comment = '';

  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    selectedTopic: this.store.select(selectSelectedTopic),
    userComments: this.store.select(selectComments),
  });

  currentUser$ = this.store.select(selectCurrentUser);
  isSignalRConnectionInitialized = false;

  constructor(
    private route: ActivatedRoute,
    public dialogService: DialogService,
    private modalService: ModalService,
    private store: Store,
    private confirmationService: ConfirmationService,
    public utilityService: UtilityService,
    private signalRService: SignalRService
  ) {}

  ngOnInit(): void {
    this.items = [
      {
        label: 'Edit',
        icon: 'pi pi-file-edit',
        command: (event: any) => this.editOrDelete(event),
      },
      {
        label: 'Delete',
        icon: 'pi pi-times',
        command: (event: any) => this.editOrDelete(event),
      },
    ];

    this.breadCrumbItems = [{ label: 'Topic Details' }];
    this.home = {
      icon: 'pi pi-home',
      routerLink: '/app/topics-list',
    };

    this.route.params.subscribe((params: Params) => {
      this.topicId = params['id'];
      if (this.topicId) {
        this.createSignalRChatConnection(this.topicId);
        this.createSignalRVoteConnection(this.topicId);
      }
    });

    this.data$.subscribe((data) => {
      this.topic = data.selectedTopic;
    });
  }

  createSignalRChatConnection(topicId: string) {
    this.signalRService.startConnection('topicId', 'chat', topicId);
    this.signalRService.loadComments();
    this.signalRService.receiveComment();
  }

  createSignalRVoteConnection(topicId: string) {
    this.signalRService.startConnection('topicId', 'vote', topicId);
    this.signalRService.loadTopic();
    this.signalRService.receiveVote();
  }

  editOrDelete(event: any) {
    if (event.item.label === 'Edit') {
      this.ref = this.dialogService.open(ManageTopicComponent, {
        header: 'Update poll',
        data: {
          isAdd: false,
          topic: this.topic,
        },
      });

      this.modalService.setModalRef(this.ref);
    } else {
      this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Do you want to delete this record?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass: 'p-button-danger p-button-text',
        rejectButtonStyleClass: 'p-button-text p-button-text',
        acceptIcon: 'none',
        rejectIcon: 'none',

        accept: () => {
          if (this.topicId)
            this.store.dispatch(topicActions.deleteTopic({ id: this.topicId }));
        },
        reject: () => {},
      });
    }
  }

  calculateProgressPercentage(
    options: Option[],
    currentOption: Option
  ): number {
    let totalVoteCount = this.utilityService.getTotalVoteCounts(options);
    let percentage = (currentOption.voters.length / totalVoteCount) * 100;
    return parseFloat(percentage.toFixed(2));
  }

  checkIfAllowedToEdit(currentUser: User): boolean {
    if (this.topic?.creator.username === currentUser.username) {
      return true;
    }
    return false;
  }

  postComment() {
    if (this.topic && this.topic.id) {
      const commentPayload = {
        body: this.comment,
        topicId: this.topic.id,
      };
      this.signalRService.postComment(commentPayload);
      this.comment = '';
    }
  }

  ngOnDestroy(): void {
    this.signalRService.stopConnection('chat');
    this.signalRService.stopConnection('vote');
    this.store.dispatch(commentActions.clearComments());
  }
}
