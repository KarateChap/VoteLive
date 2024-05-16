import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  topics = [];

  constructor(private primengConfig: PrimeNGConfig, private http: HttpClient) {}

  ngOnInit() {
    this.primengConfig.ripple = true;

    this.http.get('http://localhost:5000/api/topics').subscribe({
      next: (topics: any) => {
        this.topics = topics;
        console.log(this.topics);
      },
      error: (error) => console.log(error),
    });
  }
}
