import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in-component',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  public hasError: boolean;
  public errorMessage: string;

  public email: string;
  public password: string;

  constructor(private router: Router, private authService: AuthService) {
  }

  public signin() {
    const that = this;
    return new Promise<any>((resolve, reject) => {
      that.authService.signin({ username: that.email, password: that.password }).subscribe(
        (response: any) => {
          const access_token = response.access_token;
          const refresh_token = response.refresh_token;
          const token_type = response.token_type;

          localStorage.setItem('access_token', access_token);
          localStorage.setItem('refresh_token', refresh_token);
          localStorage.setItem('token_type', token_type);

          this.router.navigate(['/']);
        },
        (error: any) => {
          console.log(error);
        }
      );
    });
  }

  ngOnInit(): void {
    this.email = '';
    this.password = '';
  }

}
