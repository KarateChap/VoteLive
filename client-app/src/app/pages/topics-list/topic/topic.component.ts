import { Component, Input, OnInit } from '@angular/core';
import { Topic } from '../types/topic.interface';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { topicActions } from '../store/topic.actions';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrl: './topic.component.scss',
})
export class TopicComponent implements OnInit {
  @Input() topic: Topic | null = null;

  selectedCategory: any = null;

  categories: any[] = [
    { name: 'Accounting', key: 'A' },
    { name: 'Marketing', key: 'M' },
    { name: 'Production', key: 'P' },
    { name: 'Research', key: 'R' },
  ];

  items: { label?: string; icon?: string; separator?: boolean }[] = [];

  constructor(private store: Store) {}

  ngOnInit() {
    if (this.topic) {
      this.categories = this.topic?.options.map((item) => {
        return {
          name: item.optionDescription,
          key: item.id,
        };
      });
    }

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
  }

  navigateToTopicDetails() {
    if (this.topic) {
      this.store.dispatch(topicActions.setCurrentTopic({ topic: this.topic }));
    }
  }
}
