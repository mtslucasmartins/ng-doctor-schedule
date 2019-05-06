import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.services';

@Component({
  selector: 'app-users-create-component',
  templateUrl: './users-create.component.html'
  // styleUrls: ['./users-list.component.scss']
})
export class UserCreateComponent implements OnInit, OnDestroy {

  public user: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.user = new User({ id: 1, email: 'sit.amet@dolorelitpellentesque.co.uk', fullname: 'Karina O. Maddox' });
  }

  ngOnDestroy() { }

}
