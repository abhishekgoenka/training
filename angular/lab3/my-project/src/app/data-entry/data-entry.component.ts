import { Component, OnInit } from '@angular/core';
import { Post } from '../post';
import { Observable } from 'rxjs';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';
declare var toastr;

@Component({
  selector: 'app-data-entry',
  templateUrl: './data-entry.component.html',
  styleUrls: ['./data-entry.component.css']
})
export class DataEntryComponent implements OnInit {
  data: Post = new Post();
  editMode = false;
  constructor(private dataService: DataService, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    if (id) {
      this.dataService.postById(id).subscribe((p: Post) => {
        this.data = p;
        this.editMode = true;
      }, () => toastr.error(`Error Occurred`));
    }
  }

  onSubmit() {
    if (this.editMode) {
      this.dataService.updatePost(this.data).subscribe(() => toastr.success(`Record Updated`), () => toastr.error(`Error Occurred`));
    } else {
      this.dataService.addPost(this.data).subscribe(() => toastr.success(`Record saved`), () => toastr.error(`Error Occurred`));
    }
  }
}
