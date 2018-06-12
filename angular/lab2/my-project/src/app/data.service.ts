import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Post } from './post';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {
  private URL = 'https://jsonplaceholder.typicode.com';
  constructor(private http: HttpClient) { }

  posts(): Observable<Array<Post>> {
    return this.http.get<Array<Post>>(`${this.URL}/posts`);
  }

  addPost(post: Post): Observable<Post> {
    return this.http.post<Post>(`${this.URL}/posts`, post);
  }
}
