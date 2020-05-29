import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageArticlesComponent } from './admin/manage-articles/manage-articles.component';
import { LoginComponent } from './admin/login/login.component';
import { CreateUserAccountComponent } from './admin/create-user-account/create-user-account.component';
import { CreateArticleComponent } from './admin/create-article/create-article.component';
import { ViewArticleComponent } from './admin/view-article/view-article.component';
import { ManageUsersComponent } from './admin/manage-users/manage-users.component';

import { AuthGuard } from './_guards/auth.guard';
import { ArticleResolver } from './_services/resolvers/article-resolver.service';
import { ImageResolver } from './_services/resolvers/image-resolver.service';
import { UsersResolver } from './_services/resolvers/users-resolver.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    children: [
      {
        path: 'manage-articles',
        component: ManageArticlesComponent,
      },
      {
        path: 'create-article',
        component: CreateArticleComponent,
      },
      {
        path: 'view-article/:id',
        component: ViewArticleComponent,
        resolve: {
          article: ArticleResolver,
          image: ImageResolver
        }
      },
      {
        path: 'create-user-account',
        component: CreateUserAccountComponent,
      },
      {
        path: 'manage-users',
        component: ManageUsersComponent,
        resolve: {
          users: UsersResolver
        }
      }
    ],
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
