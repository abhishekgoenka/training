import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Post } from '../post';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  posts: Post[];
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.posts().subscribe((data: Array<Post>) => this.posts = data);
  }

}
