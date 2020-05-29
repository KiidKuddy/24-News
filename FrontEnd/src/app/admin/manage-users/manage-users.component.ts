import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { User } from 'src/app/_models/user.model';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  static page = 1;
  static usersPerPage = 3;
  
  pages: number[] = [];
  totalUsers: number;

  editForm: FormGroup;
  users: User[];
  selectedUser: User;
  @ViewChild('notiflix') notiflix: ElementRef;

  constructor(
    private _formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _adminService: AdminService
  ) {
    this.editForm = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(8)])
      ]
    });
  }

  ngOnInit() {
    const s1 = document.createElement('script');
    s1.setAttribute(
      'src',
      '../../../assets/manage-users/js/plugins/bootstrap/dist/js/bootstrap.bundle.min.js'
    );
    document.body.appendChild(s1);

    this._activatedRoute.data.subscribe(data => {
      this.users = data.users.users;
      this.totalUsers = data.users.totalUsers;
      for (let i = 0; i < this.totalUsers / ManageUsersComponent.usersPerPage; i++) {
        this.pages.push(i + 1);
      }
    });
  }

  selectUser(user: User) {
    this.selectedUser = user;
  }

  deleteSelectedUser() {
    if (this.selectedUser) {
      this._adminService.deleteUserAccount(this.selectedUser._id).subscribe(() => {
        this.users.splice(this.users.indexOf(this.selectedUser), 1);
        this.notiflix.nativeElement.click();
      });
    }
  }

  editUserAccount() {
    if (
      this.selectedUser.firstName !== this.editForm.get('firstName').value ||
      this.selectedUser.lastName !== this.editForm.get('lastName').value ||
      this.selectedUser.username !== this.editForm.get('username').value
    ) {
      this._adminService.updateUserAccount(new User({
        username: this.editForm.get('username').value,
        password: this.editForm.get('password').value,
        firstName: this.editForm.get('firstName').value,
        lastName: this.editForm.get('lastName').value,
        profilePicture: this.selectedUser.profilePicture
      })).subscribe(() => this.notiflix.nativeElement.click());
    }
  }
}
