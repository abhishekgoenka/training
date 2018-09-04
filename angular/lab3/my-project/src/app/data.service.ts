import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './model/post';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private URL = 'http://localhost:3000';
  constructor(private http: HttpClient) {
  }

  posts(): Observable<Array<Post>> {
    return this.http.get<Array<Post>>(`${this.URL}/posts`);
  }

  addPost(newPost: Post): Observable<Post> {
    return this.http.post<Post>(`${this.URL}/posts`, newPost);
  }

  postById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.URL}/posts/${id}`);
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete(`${this.URL}/posts/${id}`);
  }

  updatePost(post: Post): Observable<any> {
    return this.http.put(`${this.URL}/posts/${post.id}`, post);
  }
}

