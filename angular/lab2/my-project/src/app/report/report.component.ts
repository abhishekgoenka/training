import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Post } from 'src/app/Post';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  constructor(private dataService: DataService) {
  }
  posts: Array<Post>;

  ngOnInit() {
    this.dataService.posts().subscribe(data => {
      this.posts = data;
    });
  }

}
