import { Data } from './../shared/models/data';
import { Component, OnInit } from '@angular/core';
import { Http } from '../../../node_modules/@angular/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  data: Data[] = [];

  constructor(private http: Http) { }

  ngOnInit() {
    this.http.get('https://jsonplaceholder.typicode.com/posts').subscribe(res => {
      const jsonResponse = res.json();
      for (let i = 0; i < jsonResponse.length; i++) {
        const data = new Data(jsonResponse[i]);
        this.data.push(data);
      }
    });
  }

}

