import { Component, Input } from '@angular/core';
import { UserComment } from './types/comments';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent {
  @Input() comment: UserComment | null = null;

  constructor(private datePipe: DatePipe) {}

  formatDate(date: Date) {
    return this.datePipe.transform(date, 'yyyy-MM-ddTHH:mm:ss.SSSZ', 'UTC');
  }
}
