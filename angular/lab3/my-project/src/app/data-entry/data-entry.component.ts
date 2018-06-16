import { Component, OnInit } from '@angular/core';
import { Post } from '../post';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';
declare var toastr;
@Component({
  selector: 'app-data-entry',
  templateUrl: './data-entry.component.html',
  styleUrls: ['./data-entry.component.css']
})
export class DataEntryComponent implements OnInit {
  post: Post = new Post();
  editMode = false;
  constructor(
    private dataService: DataService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(res => {
      if (res.id) {
        this.dataService.postById(res.id).subscribe(p => {
          this.post = p;
          this.editMode = true;
        }, () => toastr.error(`Error Occurred`));
      }
    });
  }

  onSubmit() {
    if (this.editMode) {
      this.dataService.updatePost(this.post).subscribe(() => toastr.success(`Record Updated`), () => toastr.error(`Error Occurred`));
    } else {
      this.dataService.addPost(this.post).subscribe(() => toastr.success(`Record saved`), () => toastr.error(`Error Occurred`));
    }
  }
}
