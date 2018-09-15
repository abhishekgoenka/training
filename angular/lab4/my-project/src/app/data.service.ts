import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Post } from './model/post';
import { Observable, throwError, of } from 'rxjs';
import { ApplicationError } from './model/application-error';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private URL = 'http://localhost:3000';
  constructor(private http: HttpClient) {
  }

  posts(): Observable<Array<Post> | ApplicationError> {
    return this.http.get<Array<Post>>(`${this.URL}/posts`)
    .pipe(catchError(error => this.HandleHTTPError(error)));
  }

  addPost(newPost: Post): Observable<Post | ApplicationError> {
    return this.http.post<Post>(`${this.URL}/posts`, newPost)
    .pipe(catchError(error => this.HandleHTTPError(error)));
  }

  postById(id: number): Observable<Post | ApplicationError> {
    return this.http.get<Post>(`${this.URL}/posts/${id}`)
    .pipe(catchError(error => this.HandleHTTPError(error)));
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete(`${this.URL}/posts/${id}`)
    .pipe(catchError(error => this.HandleHTTPError(error)));
  }

  updatePost(post: Post): Observable<any> {
    return this.http.put(`${this.URL}/posts/${post.id}`, post)
    .pipe(catchError(error => this.HandleHTTPError(error)));
  }

  private HandleHTTPError(error: HttpErrorResponse): Observable<ApplicationError> {
    const appError = new ApplicationError();
    appError.errorNumber = 100;
    appError.errorMsg = error.statusText;
    return throwError(appError);
  }
}

