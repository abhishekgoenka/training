import { Component, OnInit } from '@angular/core';
import { Post } from '../post';
import { Observable } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-data-entry',
  templateUrl: './data-entry.component.html',
  styleUrls: ['./data-entry.component.css']
})
export class DataEntryComponent implements OnInit {
  isSuccess = false;
  data: Post = new Post();
  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.dataService.addPost(this.data).subscribe(post => {
      this.data = post;
      this.isSuccess = true;
    });
  }
}
