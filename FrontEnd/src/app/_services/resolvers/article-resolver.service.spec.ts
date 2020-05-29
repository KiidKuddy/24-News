/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ArticleResolverService } from './article-resolver.service';

describe('Service: ArticleResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArticleResolverService]
    });
  });

  it('should ...', inject([ArticleResolverService], (service: ArticleResolverService) => {
    expect(service).toBeTruthy();
  }));
});
