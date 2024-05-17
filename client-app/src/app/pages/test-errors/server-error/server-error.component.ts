import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectError } from '../../../shared/common-store/common.reducers';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrl: './server-error.component.scss',
})
export class ServerErrorComponent {
  error$ = this.store.select(selectError);

  constructor(private store: Store) {}
}
