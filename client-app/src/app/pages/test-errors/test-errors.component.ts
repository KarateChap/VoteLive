import { Component } from '@angular/core';
import { TestErrorsService } from './test-errors.service';

@Component({
  selector: 'app-test-errors',
  templateUrl: './test-errors.component.html',
  styleUrl: './test-errors.component.scss',
})
export class TestErrorsComponent {
  constructor(private testErrorsService: TestErrorsService) {}

  handleNotFound() {
    this.testErrorsService.handleNotFound();
  }
  handleBadRequest() {
    this.testErrorsService.handleBadRequest();
  }
  handleValidationError() {
    this.testErrorsService.handleValidationError();
  }
  handleServerError() {
    this.testErrorsService.handleServerError();
  }
  handleUnauthorised() {
    this.testErrorsService.handleUnauthorised();
  }
  handleBadGuid() {
    this.testErrorsService.handleBadGuid();
  }
}
