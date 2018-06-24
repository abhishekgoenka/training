import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Post } from '../model/post';
import { Router } from '@angular/router';
import { ApplicationError } from '../model/ApplicationError';

declare var toastr;
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  posts: Array<Post>;
  constructor(
      private router: Router,
      private dataService: DataService) { }

  ngOnInit() {
    this.dataService.posts().subscribe((data: Array<Post>) => this.posts = data);
  }

  delete(post: Post) {
    this.dataService.deletePost(post).subscribe(() => toastr.success(`Record deleted`)
    , (error: ApplicationError) => toastr.error(`Error Occurred : ${error.errorMsg}`));
  }

  edit(post: Post) {
    this.router.navigate(['entry', post.id]);
  }
}
