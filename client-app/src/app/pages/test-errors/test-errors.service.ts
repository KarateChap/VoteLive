import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TestErrorsService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  handleNotFound() {
    this.http.get(`${this.baseUrl}api/buggy/not-found`).subscribe({
      next: (response) => console.log(response),
      error: (error) => console.log(error),
    });
  }

  handleBadRequest() {
    this.http.get(`${this.baseUrl}api/buggy/bad-request`).subscribe({
      next: (response) => console.log(response),
      error: (error) => console.log(error),
    });
  }

  handleServerError() {
    this.http.get(`${this.baseUrl}api/buggy/server-error`).subscribe({
      next: (response) => console.log(response),
      error: (error) => console.log(error),
    });
  }

  handleUnauthorised() {
    this.http.get(`${this.baseUrl}api/buggy/unauthorised`).subscribe({
      next: (response) => console.log(response),
      error: (error) => console.log(error),
    });
  }

  handleBadGuid() {
    this.http.get(`${this.baseUrl}api/buggy/notaguid`).subscribe({
      next: (response) => console.log(response),
      error: (error) => console.log(error),
    });
  }

  handleValidationError() {
    this.http.post(`${this.baseUrl}api/topics`, {}).subscribe({
      next: (response) => console.log(response),
      error: (error) => console.log(error),
    });
  }
}
