import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { Article } from 'src/app/_models/article.model';
import { ActivatedRoute } from '@angular/router';
import { ImageCreator } from 'src/app/_helpers/image-creator';
import { CreateUserAccountComponent } from '../create-user-account/create-user-account.component';

@Component({
  selector: 'app-view-article',
  templateUrl: './view-article.component.html',
  styleUrls: ['./view-article.component.css']
})
export class ViewArticleComponent implements OnInit {
  article: Article;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    /*const s1 = document.createElement('script');
    s1.setAttribute('src', 'https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js');
    document.body.appendChild(s1);
    const s2 = document.createElement('script');
    s2.setAttribute('src', '../../../assets/home/js/owl.carousel.min.js');
    document.body.appendChild(s2);
    const s3 = document.createElement('script');
    s3.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js');
    s3.setAttribute('integrity', 'sha384-DztdAPBWPRXSA/3eYEEUWrWCy7G5KFbe8fFjk5JAIxUYHKkDx6Qin1DkWx51bBrb');
    s3.setAttribute('crossorigin', 'anonymous');
    document.body.appendChild(s3);
    const s4 = document.createElement('script');
    s4.setAttribute('src', '../../../assets/home/js/jquery.waypoints.min.js');
    document.body.appendChild(s4);
    const s5 = document.createElement('script');
    s5.setAttribute('src', '../../../assets/home/js/jquery.stellar.min.js');
    document.body.appendChild(s5);
    const s6 = document.createElement('script');
    s6.setAttribute('src', '../../../assets/home/js/main.js');
    document.body.appendChild(s6);
    const s7 = document.createElement('script');
    s7.innerHTML = 'if (!navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i)){$(window).stellar();}';
    document.body.appendChild(s7);*/

    this.createLinkElements();

    this._activatedRoute.data.subscribe(
      data => {
        this.article = data.article;
        this.article.date = new Date(this.article.date).toLocaleDateString(
          'default',
          {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          }
        );
        ImageCreator.createImageFromBlob(
          data.image,
          (createdImage: any) => (this.article.image = createdImage)
        );
      }
    );
  }

  bypassHTML(html: string) {
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }

  createLinkElements() {
    const l1 = document.createElement('link');
    l1.setAttribute('href', '../../../assets/home/css/media_query.css');
    l1.setAttribute('rel', 'stylesheet');
    l1.setAttribute('type', 'text/css');
    const l2 = document.createElement('link');
    l2.setAttribute('href', '../../../assets/home/css/bootstrap.css');
    l2.setAttribute('rel', 'stylesheet');
    l2.setAttribute('type', 'text/css');
    const l3 = document.createElement('link');
    l3.setAttribute(
      'href',
      'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'
    );
    l3.setAttribute('rel', 'stylesheet');
    l3.setAttribute(
      'integrity',
      'sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN'
    );
    l3.setAttribute('crossorigin', 'anonymous');
    const l4 = document.createElement('link');
    l4.setAttribute('href', '../../../assets/home/css/animate.css');
    l4.setAttribute('rel', 'stylesheet');
    l4.setAttribute('type', 'text/css');
    const l5 = document.createElement('link');
    l5.setAttribute('href', 'https://fonts.googleapis.com/css?family=Poppins');
    l5.setAttribute('rel', 'stylesheet');
    const l6 = document.createElement('link');
    l6.setAttribute('href', '../../../assets/home/css/owl.carousel.css');
    l6.setAttribute('rel', 'stylesheet');
    l6.setAttribute('type', 'text/css');
    const l7 = document.createElement('link');
    l7.setAttribute('href', '../../../assets/home/css/owl.theme.default.css');
    l7.setAttribute('rel', 'stylesheet');
    l7.setAttribute('type', 'text/css');
    const l8 = document.createElement('link');
    l8.setAttribute('href', '../../../assets/home/css/style_1.css');
    l8.setAttribute('rel', 'stylesheet');
    l8.setAttribute('type', 'text/css');
    const ls1 = document.createElement('script');
    ls1.setAttribute('src', '../../../assets/home/js/modernizr-3.5.0.min.js');

    document.head.appendChild(l1);
    document.head.appendChild(l2);
    document.head.appendChild(l3);
    document.head.appendChild(l4);
    document.head.appendChild(l5);
    document.head.appendChild(l6);
    document.head.appendChild(l7);
    document.head.appendChild(l8);
    document.head.appendChild(ls1);
  }
}
