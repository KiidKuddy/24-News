import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Article } from '../../_models/article.model';
import { ArticleService } from '../article.service';

@Injectable({ providedIn: 'root' })
export class ArticleResolver implements Resolve<Article> {
  constructor(private _articleService: ArticleService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Article> {
    return this._articleService.getArticle(route.paramMap.get('id'));
  }
}
