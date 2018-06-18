import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Post } from './post';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {
  private URL = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  posts(): Observable<Array<Post>> {
    return this.http.get<Array<Post>>(`${this.URL}/posts`);
  }

  postById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.URL}/posts/${id}`);
  }

  addPost(post: Post): Observable<Post> {
    return this.http.post<Post>(`${this.URL}/posts`, post);
  }

  deletePost(post: Post): Observable<any> {
    return this.http.delete(`${this.URL}/posts/${post.id}`);
  }

  updatePost(post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.URL}/posts/${post.id}`, post);
  }
}
