import { BlogComment } from './../models/blog-comment.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BlogCommentService {
  private url = environment.uri + 'blogcomment';

  constructor(private http: HttpClient) {}

  get() {
    return this.http.get(this.url);
  }

  post(body: BlogComment) {
    return this.http.post(this.url, body);
  }

  put(body: BlogComment) {
    return this.http.put(`${this.url}/${body.blogCommentId}`, body);
  }

  delete(id) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
