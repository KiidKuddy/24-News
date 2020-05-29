import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { User } from 'src/app/_models/user.model';
import { AdminService } from '../admin.service';
import { Observable } from 'rxjs';
import { ManageUsersComponent } from 'src/app/admin/manage-users/manage-users.component';

@Injectable({
  providedIn: 'root'
})
export class UsersResolver implements Resolve<User[]> {
  constructor(private _adminService: AdminService) {}

  resolve(): Observable<User[]> {
    return this._adminService.getUsers(
      ManageUsersComponent.page,
      ManageUsersComponent.usersPerPage
    );
  }
}
