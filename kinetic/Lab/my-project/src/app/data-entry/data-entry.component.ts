import { Component, OnInit } from '@angular/core';
import { Post } from '../model/post';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationError } from '../model/application-error';
import { IEpViewModel, EpToastService } from '@epicor/kinetic';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-data-entry',
  templateUrl: './data-entry.component.html',
  styleUrls: ['./data-entry.component.css']
})
export class DataEntryComponent implements OnInit {
  viewModel: IEpViewModel = {
    navbar: {
      title: 'Data Entry'
    }
  };

  data: Post = new Post();
  editMode = false;
  constructor(private dataService: DataService, private route: ActivatedRoute, private router: Router, private toastr: ToastrService) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    if (id) {
      this.dataService.postById(id).subscribe(
        (p: Post) => {
          this.data = p;
          this.editMode = true;
        },
        () => this.toastr.error(`Error Occurred`)
      );
    }
  }

  onSubmit() {
    if (this.editMode) {
      this.dataService
        .updatePost(this.data)
        .subscribe(() => this.toastr.success(`Record Updated`),
        (error: ApplicationError) => this.toastr.error(`Error Occurred : ${error.errorMsg}`));
    } else {
      this.dataService
        .addPost(this.data)
        .subscribe(() => this.toastr.success(`Record saved`),
        (error: ApplicationError) => this.toastr.error(`Error Occurred : ${error.errorMsg}`));
    }
  }

  navigateToReport() {
    this.router.navigate(['report']);
  }
}
