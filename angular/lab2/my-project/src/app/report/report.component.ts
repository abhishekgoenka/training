import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { Post } from '../post';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  posts: Array<Post>;
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.posts().subscribe((data: Array<Post>) => this.posts = data);
  }
}
