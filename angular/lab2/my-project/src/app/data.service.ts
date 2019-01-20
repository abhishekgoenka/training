import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Post } from './post';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private URL = 'https://jsonplaceholder.typicode.com';
  constructor(private http: HttpClient) { }

  posts(): Observable<Array<Post>> {
    return this.http.get<Array<Post>>(`${this.URL}/posts`);
  }

  addPost(newPost: Post): Observable<Post> {
    return this.http.post<Post>(`${this.URL}/posts`, newPost);
  }
}
