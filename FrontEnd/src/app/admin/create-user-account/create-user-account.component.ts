import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminService } from 'src/app/_services/admin.service';
import { FileValidator } from 'src/app/_helpers/file-input.validator';
import { User } from 'src/app/_models/user.model';

@Component({
  selector: 'create-user-account',
  templateUrl: './create-user-account.component.html',
  styleUrls: ['./create-user-account.component.css']
})
export class CreateUserAccountComponent implements OnInit {
  selectedFile: File;
  createUserForm: FormGroup;
  submitted = false;
  usernameExists = false;

  @ViewChild('fileName') fileName: ElementRef;
  @ViewChild('notiflix') notiflix: ElementRef;

  constructor(
    private _formBuilder: FormBuilder,
    private _adminService: AdminService
  ) {}

  ngOnInit() {
    this.createUserForm = this._formBuilder.group({
      username: ['', Validators.required],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(8)])
      ],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      profilePicture: ['', FileValidator.validate]
    });
  }

  get form() {
    return this.createUserForm.controls;
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
    this.fileName.nativeElement.innerHTML = this.selectedFile.name;
  }

  onSubmit() {
    this.submitted = true;
    if (this.createUserForm.invalid) {
      this.displayErrorMessages();
      return;
    }

    const newUser = new User({
      username: this.createUserForm.controls.username.value as string,
      password: this.createUserForm.controls.password.value,
      firstName: this.createUserForm.controls.firstName.value,
      lastName: this.createUserForm.controls.lastName.value,
      profilePicture: this.selectedFile
    });

    this._adminService.createUserAccount(newUser).subscribe(
      next => {
        this.submitted = false;
        this.createUserForm.reset();
        this.fileName.nativeElement.innerHTML = 'Choose a file&hellip;';
        this.notiflix.nativeElement.click();
      },
      error => {
        if (error.error.error.details === 'Username already exists.') {
          this.usernameExists = true;
          document
            .getElementById('usernameAlertValidate')
            .setAttribute('data-validate', 'Username already exists');
        }
      }
    );
  }

  displayErrorMessages() {
    if (this.createUserForm.get('username').hasError('required')) {
      document
        .getElementById('usernameAlertValidate')
        .setAttribute('data-validate', 'Username required');
    }
    if (this.createUserForm.get('password').hasError('required')) {
      document
        .getElementById('passwordAlertValidate')
        .setAttribute('data-validate', 'Password required');
    } else if (this.createUserForm.get('password').hasError('minlength')) {
      document
        .getElementById('passwordAlertValidate')
        .setAttribute(
          'data-validate',
          'Password must have 8 characters minimum'
        );
    }
  }
}
