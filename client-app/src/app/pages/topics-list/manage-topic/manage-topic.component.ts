import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Topic } from '../types/topic.interface';
import { Store } from '@ngrx/store';
import { topicActions } from '../store/topic.actions';

import { selectIsSubmitting } from '../store/topic.reducers';
import { Option } from '../types/option.interface';

@Component({
  selector: 'app-manage-topic',
  templateUrl: './manage-topic.component.html',
  styleUrl: './manage-topic.component.scss',
})
export class ManageTopicComponent implements OnInit {
  isAdd = false;
  topic: Topic | null = null;

  topicForm: FormGroup = new FormGroup({});
  isSubmitting$ = this.store.select(selectIsSubmitting);

  constructor(
    private config: DynamicDialogConfig,
    private fb: FormBuilder,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.isAdd = this.config.data.isAdd;
    this.topic = this.config.data.topic;

    this.initializeForm();
  }

  initializeForm() {
    if (this.isAdd) {
      this.topicForm = this.fb.group({
        title: ['', Validators.required],
        topicDescription: ['', Validators.required],
        options: this.fb.array([]),
      });
      this.addOption();
    } else {
      if (this.topic) {
        this.topicForm = this.fb.group({
          title: [this.topic.title, Validators.required],
          topicDescription: [this.topic.topicDescription, Validators.required],
          options: this.fb.array([]),
        });
        this.setOptions(this.topic.options);
      }
    }
  }

  get options() {
    return this.topicForm.get('options') as FormArray;
  }

  addOption(optionDescription: string = '') {
    const optionGroup1 = this.fb.group({
      optionDescription: [optionDescription, Validators.required],
    });
    this.options.push(optionGroup1);
  }

  removeOption(index: number) {
    this.options.removeAt(index);
  }

  setOptions(options: { optionDescription: string }[]) {
    options.forEach((option) => this.addOption(option.optionDescription));
  }

  onSubmit() {
    if (this.isAdd) {
      const topic: Topic = {
        ...this.topicForm.value,
        createdAt: new Date(),
      };
      this.store.dispatch(topicActions.createTopic({ topic }));
    } else {
      if (this.topic) {
        let topic: Topic = {
          ...this.topicForm.value,
          id: this.topic.id,
          createdAt: this.topic.createdAt,
          creator: this.topic.creator,
        };

        this.store.dispatch(topicActions.updateTopic({ topic }));
      }
    }
  }
}
