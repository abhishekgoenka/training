import { Component, OnInit } from '@angular/core';
import { Post } from '../model/post';
import { DataService } from '../data.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-data-entry-reactive',
  templateUrl: './data-entry-reactive.component.html',
  styles: []
})
export class DataEntryReactiveComponent implements OnInit {
  isSuccess = false;
  postForm: FormGroup;
  constructor(private fb: FormBuilder,
    private dataService: DataService) {
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