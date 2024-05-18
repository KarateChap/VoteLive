import { Component, OnInit } from '@angular/core';
import { Topic } from './types/topic.interface';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ManageTopicComponent } from './manage-topic/manage-topic.component';
import { Store } from '@ngrx/store';
import { topicActions } from './store/topic.actions';
import { combineLatest } from 'rxjs';
import { selectIsLoading, selectTopics } from './store/topic.reducers';
import { ModalService } from '../../shared/services/modal.service';

@Component({
  selector: 'app-topics-list',
  templateUrl: './topics-list.component.html',
  styleUrl: './topics-list.component.scss',
})
export class TopicsListComponent implements OnInit {
  ref: DynamicDialogRef | undefined;
  isTopicRequest = false;

  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    topics: this.store.select(selectTopics),
  });

  constructor(
    private store: Store,
    public dialogService: DialogService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.data$.subscribe(({ topics }) => {
      // if (!topics || topics.length <= 1) {
      //   this.getTopics();
      // }
      if (topics === null && this.isTopicRequest === false) {
        this.getTopics();
        this.isTopicRequest = true;
      }
    });
  }

  getTopics() {
    this.store.dispatch(topicActions.getTopics());
  }

  openManageTopicModal() {
    this.ref = this.dialogService.open(ManageTopicComponent, {
      header: 'Create a new poll',
      data: {
        isAdd: true,
      },
    });

    this.modalService.setModalRef(this.ref);

    this.ref.onClose.subscribe({
      next: () => {},
      error: (error) => console.log(error),
    });
  }
}
