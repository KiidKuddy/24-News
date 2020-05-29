import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Article } from '../_models/article.model';
import { ImageCreator } from '../_helpers/image-creator';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private readonly BASE_URL = 'http://localhost:3000/api/articles/';
  private _headers: HttpHeaders;

  constructor(private _http: HttpClient) {
    this._headers = new HttpHeaders().append(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );
  }

  getArticles(): Observable<Article[]> {
    return this._http.get<Article[]>(`${this.BASE_URL}getArticles`, {
      headers: this._headers
    });
  }

  getArticle(articleId: string): Observable<Article> {
    return this._http.get<Article>(`${this.BASE_URL}getArticle/${articleId}`, {
      headers: this._headers
    });
  }

  getArticleImage(articleId: string): Observable<Blob> {
    return this._http.get(`${this.BASE_URL}getArticleImage/${articleId}`, {
      headers: this._headers,
      responseType: 'blob'
    });
  }

  getImage(articleId: string) {
    let img: any;
    this._http
      .get(`${this.BASE_URL}get-article-image/${articleId}`, {
        responseType: 'blob'
      })
      .subscribe(image =>
        ImageCreator.createImageFromBlob(
          image,
          (createdImage: any) => (img = createdImage)
        )
      );
    console.log(img);
    return img;
  }
}
