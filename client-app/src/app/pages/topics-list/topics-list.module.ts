import { NgModule } from '@angular/core';
import { TopicsListComponent } from './topics-list.component';
import { CommonModule, DatePipe } from '@angular/common';
import { PrimeNgModule } from '../../shared/modules/primeng.module';
import { RouterModule, Routes } from '@angular/router';
import { TopicComponent } from './topic/topic.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TopicDetailComponent } from './topic-detail/topic-detail.component';
import { ManageTopicComponent } from './manage-topic/manage-topic.component';
import { SharedModule } from '../../shared/modules/shared.module';
import { CommentComponent } from './topic-detail/comments/comment.component';

const routes: Routes = [
  {
    path: '',
    component: TopicsListComponent,
  },
  {
    path: ':id',
    component: TopicDetailComponent,
  },
];

@NgModule({
  declarations: [
    TopicsListComponent,
    TopicComponent,
    TopicDetailComponent,
    ManageTopicComponent,
    CommentComponent,
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  providers: [DatePipe],
})
export class TopicsListModule {}
