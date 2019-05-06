import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {

  @Input() sticky = false;

  public user = {
    username: 'mtslucasmartins',
    firstName: 'Lucas',
    lastName: 'Martins',
    avatar: 'https://lh3.googleusercontent.com/-ga-iIYiZm4Y/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3reQF0ebwHxJRXKxt36zWQWqljWPtQ/mo/photo.jpg?sz=46'
  };

  constructor() {
  }

}
