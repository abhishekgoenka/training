import { Component, OnInit } from '@angular/core';
import { Post } from '../model/post';
import { DataService } from 'src/app/data.service';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-data-entry-reactive',
  templateUrl: './data-entry-reactive.component.html',
  styles: []
})
export class DataEntryReactiveComponent implements OnInit {
  isSuccess = false;
  postForm: FormGroup;
  constructor(private dataService: DataService, private fb: FormBuilder) {
    this.createForm();
   }

  ngOnInit() {
  }

  createForm() {
    this.postForm = this.fb.group({
      userId: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      body: new FormControl()
    });
  }

  onSubmit() {
    const newPost: Post = this.postForm.value;
    this.dataService.addPost(newPost).subscribe(post => {
      if (post) {
        this.isSuccess = true;
      }
    });
  }
}
