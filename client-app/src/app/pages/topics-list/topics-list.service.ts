import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Topic } from './types/topic.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TopicsListService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getTopics(): Observable<Topic[]> {
    return this.http.get<Topic[]>(`${this.baseUrl}api/topics`);
  }

  getTopic(id: string): Observable<Topic> {
    return this.http.get<Topic>(`${this.baseUrl}api/topics/${id}`);
  }

  createTopic(topic: Topic): Observable<Topic> {
    return this.http.post<Topic>(`${this.baseUrl}api/topics`, topic);
  }

  updateTopic(topic: Topic) {
    return this.http.put(`${this.baseUrl}api/topics/${topic.id}`, topic);
  }

  deleteTopic(id: string) {
    return this.http.delete(`${this.baseUrl}api/topics/${id}`);
  }
}
