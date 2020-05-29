import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Article } from '../_models/article.model';
import { User } from '../_models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private readonly BASE_URL = 'http://localhost:3000/api/admin/';
  private _headers: HttpHeaders = new HttpHeaders().append(
    'Authorization',
    `Bearer ${localStorage.getItem('token')}`
  );

  constructor(private _http: HttpClient) {}

  createArticle(model: Article) {
    const formData = new FormData();
    formData.append('title', model.title);
    formData.append('tags', model.tags);
    formData.append('content', model.content);
    formData.append('creatorId', model.creatorId);
    formData.append('creatorName', model.creatorName);
    formData.append('image', model.image);

    return this._http.post(`${this.BASE_URL}createArticle`, formData, {
      headers: this._headers
    });
  }

  createUserAccount(model: User) {
    const formData = new FormData();
    formData.append('username', model.username);
    formData.append('password', model.password);
    formData.append('firstName', model.firstName);
    formData.append('lastName', model.lastName);
    formData.append('image', model.profilePicture);

    return this._http.post(`${this.BASE_URL}createUserAccount`, formData, {
      headers: this._headers
    });
  }

  getUsers(page?: number, usersPerPage?: number): Observable<User[]> {
    return this._http.get<User[]>(
      `${this.BASE_URL}getUsers?page=${page}&perPage=${usersPerPage}`,
      {
        headers: this._headers
      }
    );
  }

  deleteUserAccount(userId: string) {
    return this._http.delete(`${this.BASE_URL}deleteUserAccount/${userId}`);
  }

  updateUserAccount(user: User) {
    return this._http.put(`${this.BASE_URL}updateUserAccount`, user, {
      headers: this._headers
    });
  }
}
