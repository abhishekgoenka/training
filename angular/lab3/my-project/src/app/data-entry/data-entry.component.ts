import { Component, OnInit } from '@angular/core';
import { Post } from '../post';
import { DataService } from '../data.service';

@Component({
  selector: 'app-data-entry',
  templateUrl: './data-entry.component.html',
  styleUrls: ['./data-entry.component.css']
})
export class DataEntryComponent implements OnInit {
  post: Post = new Post();
  isSuccess = false;
  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.dataService.addPost(this.post).subscribe(post => {
      if (post) {
        this.isSuccess = true;
      }
    });
  }
}
