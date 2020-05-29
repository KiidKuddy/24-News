import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { ArticleService } from '../article.service';

@Injectable({
  providedIn: 'root'
})
export class ImageResolver implements Resolve<any> {
  constructor(private _articleService: ArticleService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Blob> {
    return this._articleService.getArticleImage(route.paramMap.get('id'));
  }
}
