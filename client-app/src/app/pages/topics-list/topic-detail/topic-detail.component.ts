import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Topic } from '../types/topic.interface';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ManageTopicComponent } from '../manage-topic/manage-topic.component';
import { ModalService } from '../../../shared/services/modal.service';
import { Store } from '@ngrx/store';
import { topicActions } from '../store/topic.actions';
import { combineLatest } from 'rxjs';
import { selectIsLoading, selectSelectedTopic } from '../store/topic.reducers';

@Component({
  selector: 'app-topic-detail',
  templateUrl: './topic-detail.component.html',
  styleUrl: './topic-detail.component.scss',
})
export class TopicDetailComponent implements OnInit {
  topic: Topic | null = null;
  items: MenuItem[] | undefined;
  breadCrumbItems: MenuItem[] | undefined;
  home: MenuItem | undefined;
  topicId: string | null = null;
  ref: DynamicDialogRef | undefined;

  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    selectedTopic: this.store.select(selectSelectedTopic),
  });

  constructor(
    private route: ActivatedRoute,
    public dialogService: DialogService,
    private modalService: ModalService,
    private store: Store
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
    this.home = { icon: 'pi pi-home', routerLink: '/app/topics-list' };

    this.route.params.subscribe((params: Params) => {
      this.topicId = params['id'];
    });

    this.data$.subscribe((data) => {
      this.topic = data.selectedTopic;
      if (this.topic == null && this.topicId) this.getTopic(this.topicId);
    });
  }

  getTopic(id: string) {
    this.store.dispatch(topicActions.getCurrentTopic({ id }));
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
      if (this.topicId)
        this.store.dispatch(topicActions.deleteTopic({ id: this.topicId }));
    }
  }
}
