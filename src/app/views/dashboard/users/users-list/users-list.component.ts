import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.services';

@Component({
  selector: 'app-users-list-component',
  templateUrl: './users-list.component.html'
  // styleUrls: ['./users-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

  public pageSize = 10;
  public pageIndex = 0;

  public tableItensLabel: string;

  public users: Array<User>;

  constructor(private userService: UserService) { }

  public getAllUsers() {
    this.userService.findUsers(['id', 'fullname', 'email']).subscribe((response: any) => {
      if (response.data && response.data.users) {
        // const users = 
        // } 
        // if (response.status === 'success') {
        this.users = response.data.users;

        let start = (this.pageIndex) * this.pageSize + 1;
        let end = +response.length;

        if (this.pageSize < response.length) {
          end = this.pageSize * (this.pageIndex + 1);
          if (end > response.count) {
            end = response.count;
          }
        }

        // e.g. "21-30 of 193 items"
        this.tableItensLabel = start + ' a ' + end + ' de ' + response.length;
      }
    });
  }

  ngOnInit() {
    this.getAllUsers();
  }

  ngOnDestroy() { }

}
