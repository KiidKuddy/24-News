import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { CKEditorModule } from 'ckeditor4-angular';
import { QuillModule } from 'ngx-quill';

import { AppComponent } from './app.component';
import { AdminNavbarComponent } from './admin/admin-navbar/admin-navbar.component';
import { ManageArticlesComponent } from './admin/manage-articles/manage-articles.component';
import { LoginComponent } from './admin/login/login.component';
import { CreateUserAccountComponent } from './admin/create-user-account/create-user-account.component';
import { CreateArticleComponent } from './admin/create-article/create-article.component';
import { ViewArticleComponent } from './admin/view-article/view-article.component';
import { ManageUsersComponent } from './admin/manage-users/manage-users.component';

import { AuthService } from './_services/auth.service';
import { FileValueAccessor } from './_helpers/file-control-value-accessor';
import { FileValidator } from './_helpers/file-input.validator';

@NgModule({
   declarations: [
      AppComponent,
      AdminNavbarComponent,
      ManageArticlesComponent,
      LoginComponent,
      CreateUserAccountComponent,
      CreateArticleComponent,
      ViewArticleComponent,
      ManageUsersComponent,
      FileValueAccessor,
      FileValidator
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      ReactiveFormsModule,
      HttpClientModule,
      CKEditorModule,
      QuillModule.forRoot()
   ],
   providers: [
      AuthService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
