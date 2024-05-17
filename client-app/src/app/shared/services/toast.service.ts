import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private messageService: MessageService) {}

  fireToast(severity: string, summary: string, detail: string) {
    this.messageService.clear();
    this.messageService.add({
      severity,
      summary,
      detail,
      key: 'toast',
      life: 3000,
    });
  }
}
