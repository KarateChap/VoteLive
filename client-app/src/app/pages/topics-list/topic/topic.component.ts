import { Component, Input, OnInit } from '@angular/core';
import { Topic } from '../types/topic.interface';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { topicActions } from '../store/topic.actions';
import { Option } from '../types/option.interface';
import { UtilityService } from '../../../shared/services/utility.service';
import { User } from '../../auth/types/user.interface';
import { selectIsSubmitting } from '../store/topic.reducers';
import { SignalRService } from '../../../shared/services/signalr.service';
import { VotePayload } from '../types/vote-payload.interface';

interface Category {
  name: string;
  key: string;
}

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrl: './topic.component.scss',
})
export class TopicComponent implements OnInit {
  @Input() topic: Topic | null = null;
  @Input() currentUser: User | null = null;

  selectedCategory: Category | null = null;
  initialSelectedVote: Category | null = null;

  isVoteSubmitting = false;

  categories: Category[] = [
    { name: 'Accounting', key: 'A' },
    { name: 'Marketing', key: 'M' },
    { name: 'Production', key: 'P' },
    { name: 'Research', key: 'R' },
  ];

  items: { label?: string; icon?: string; separator?: boolean }[] = [];

  constructor(
    private store: Store,
    public utilityService: UtilityService,
    private signalRService: SignalRService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initializeRadioButtons();

    this.items = [
      {
        label: 'Edit',
        icon: 'pi pi-file-edit',
      },
      {
        label: 'Delete',
        icon: 'pi pi-times',
      },
    ];

    this.store.select(selectIsSubmitting).subscribe({
      next: (isSubmitting) => {
        if (isSubmitting === false) {
          this.isVoteSubmitting = isSubmitting;
        }
      },
    });
  }

  createSignalRVoteConnection(topicId: string) {
    this.signalRService.startConnection('topicId', 'vote', topicId);
    this.signalRService.loadTopic();
    this.signalRService.receiveVote();
  }

  private initializeRadioButtons() {
    if (this.topic) {
      this.categories = this.topic.options.map((item) => {
        return {
          name: item.optionDescription,
          key: item.id,
        };
      });

      this.topic.options.map((item: Option) => {
        item.voters.map((vote) => {
          if (vote.username === this.currentUser?.username) {
            this.initialSelectedVote = {
              name: item.optionDescription,
              key: item.id,
            };
          }
        });
      });

      if (this.initialSelectedVote && this.initialSelectedVote) {
        const index = this.categories.findIndex(
          (category: Category) => category.key === this.initialSelectedVote!.key
        );
        this.selectedCategory = this.categories[index];
      }
    }
  }

  navigateToTopicDetails() {
    if (this.topic) {
      this.store.dispatch(topicActions.setCurrentTopic({ topic: this.topic }));
    }
  }

  submitVote() {
    this.isVoteSubmitting = true;
    if (
      this.topic &&
      this.selectedCategory &&
      this.topic.id !== undefined &&
      this.currentUser
    ) {
      const votePayload: VotePayload = {
        topicId: this.topic.id,
        optionId: this.selectedCategory?.key,
      };

      // this.signalRService.updateVote(votePayload);
      // this.router.navigateByUrl(`/app/topics-list/${this.topic.id}`);

      this.store.dispatch(
        topicActions.updateVote({ votePayload, currentUser: this.currentUser })
      );
    }
  }

  optionSelected() {
    this.signalRService.stopConnection('vote');
    if (this.topic && this.topic.id) {
      this.createSignalRVoteConnection(this.topic.id);
    }
  }
}
