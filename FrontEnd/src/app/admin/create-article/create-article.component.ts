import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Article } from 'src/app/_models/article.model';
import { FileValidator } from '../../_helpers/file-input.validator';
import { AuthService } from 'src/app/_services/auth.service';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css']
})
export class CreateArticleComponent implements OnInit {
  private _selectedFile: File;

  submitted = false;
  createArticleForm: FormGroup;

  @ViewChild('fileName') fileName: ElementRef;
  @ViewChild('notiflix') notiflix: ElementRef;

  editorConfig = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      ['link', 'clean']
    ]
  };

  constructor(
    private _formBuilder: FormBuilder,
    private _adminService: AdminService,
    private _authService: AuthService
  ) {}

  ngOnInit() {
    this.createArticleForm = this._formBuilder.group({
      title: ['', Validators.required],
      tags: ['', Validators.required],
      image: ['', FileValidator.validate],
      content: ['', Validators.required]
    });
  }

  get form() {
    return this.createArticleForm.controls;
  }

  onFileSelected(event: any) {
    this._selectedFile = event.target.files[0] as File;
    this.fileName.nativeElement.innerHTML = this._selectedFile.name;
  }

  onSubmit() {
    this.submitted = true;
    if (this.createArticleForm.invalid) {
      return;
    }

    const newArticle = new Article({
      title: this.createArticleForm.controls.title.value,
      tags: this.createArticleForm.controls.tags.value,
      content: this.createArticleForm.controls.content.value,
      creatorId: this._authService.getLoggedUserId(),
      creatorName: this._authService.getLoggedUserName(),
      image: this._selectedFile
    });

    this._adminService.createArticle(newArticle).subscribe(
      next => {
        this.submitted = false;
        this.createArticleForm.reset();
        this.fileName.nativeElement.innerHTML = 'Choose a file&hellip;';
        this.notiflix.nativeElement.click();
      },
      error => {
        console.error(error);
      }
    );
  }
}
