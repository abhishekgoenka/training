import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Post } from '../model/post';
import { Router } from '@angular/router';

declare var toastr;
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  constructor(private dataService: DataService, private router: Router) {
  }
  posts: Array<Post>;

  ngOnInit() {
    this.dataService.posts().subscribe(data => {
      this.posts = data;
    });
  }

  delete(post: Post) {
    this.dataService.deletePost(post.id).subscribe(() => toastr.success(`Record deleted`), () => toastr.error(`Error Occurred`));
  }

  edit(post: Post) {
    this.router.navigate(['entry', post.id]);
  }
}
