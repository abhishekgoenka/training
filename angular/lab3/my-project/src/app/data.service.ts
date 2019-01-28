import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Post } from './post';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private URL = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  posts(): Observable<Array<Post>> {
    return this.http.get<Array<Post>>(`${this.URL}/posts`);
  }

  postById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.URL}/posts/${id}`);
  }

  addPost(newPost: Post): Observable<Post> {
    return this.http.post<Post>(`${this.URL}/posts`, newPost);
  }

  deletePost(post: Post): Observable<any> {
    return this.http.delete(`${this.URL}/posts/${post.id}`);
  }

  updatePost(post: Post): Observable<any> {
    return this.http.put(`${this.URL}/posts/${post.id}`, post);
  }
}
