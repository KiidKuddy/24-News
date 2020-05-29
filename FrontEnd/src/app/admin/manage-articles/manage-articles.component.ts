import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { ArticleService } from 'src/app/_services/article.service';
import { Article } from 'src/app/_models/article.model';
import { ImageCreator } from 'src/app/_helpers/image-creator';

@Component({
  selector: 'app-manage-articles',
  templateUrl: './manage-articles.component.html',
  styleUrls: ['./manage-articles.component.css']
})
export class ManageArticlesComponent implements OnInit {
  articles: Article[] = [];

  constructor(
    private _articleService: ArticleService,
    private _sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this._articleService.getArticles().subscribe(
      articles => {
        this.articles = articles;

        for (const article of this.articles) {
          this._articleService.getArticleImage(article._id).subscribe(
            image => {
              ImageCreator.createImageFromBlob(image, (createdImage: any) => {
                article.date = new Date(article.date).toLocaleDateString(
                  'default',
                  {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  }
                );
                article.image = createdImage;
              });
            },
            error => console.error(error)
          );
        }
      },
      error => console.error(error)
    );
  }

  bypassHTML(html: string) {
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }
}
