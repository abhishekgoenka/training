import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Post } from '../post';

declare var toastr;
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  posts: Array<Post>;
  constructor(
      private dataService: DataService) { }

  ngOnInit() {
    this.dataService.posts().subscribe((data: Array<Post>) => this.posts = data);
  }

  delete(post: Post) {
    this.dataService.deletePost(post).subscribe(() => toastr.success(`Record deleted`));
  }
}
