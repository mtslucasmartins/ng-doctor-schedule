import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { User } from 'src/app/models/User';
import { Clinic } from 'src/app/models/Clinic';
import { SignUpService } from 'src/app/services/signup/signup.service';

import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sign-up-component',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  public formSignUp: FormGroup;

  public email: string;
  public password: string;
  public passwordConfirm: string;
  public fullname: string;
  public cpf: string;

  public firstName: string;
  public lastName: string;


  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private router: Router, private signupService: SignUpService) {
  }

  public checkPassword(): boolean {
    return this.password === this.passwordConfirm;
  }

  public signup(): Promise<any> {
    const that = this;
    return new Promise<any>((resolve, reject) => {
      if (that.checkPassword()) {
        const user: User = new User({
          id: null,
          email: that.formSignUp.controls.email.value,
          fullname: that.formSignUp.controls.fullname.value,
          password: that.formSignUp.controls.password.value,
          cpf: that.formSignUp.controls.cpf.value,
        });
        that.signupService.signup(user).subscribe(
          (response: any) => {
            if (response.status === 'success') {
              this.router.navigate(['/sign-in']);
              // this.router.navigateByUrl('/sign-in', { state: { email: user.email } });
            }
          },
          (error: any) => {
            if (error.error instanceof ErrorEvent) {
              console.error('An error occurred:', error.error.message);
            } else {
              const body = error.error;
              const status = error.status;
              if (status === 400) {
                that.openSnackBar(error.error.error_description);
                console.log(JSON.stringify(error.error));
              }
            }
          });
      } else {
        reject('As senhas não coincidem!');
      }
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {});
  }

  ngOnInit() {
    this.formSignUp = this.fb.group({
      fullname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      cpf: new FormControl('', Validators.required),
      password: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(6)
      ]))
    });
  }

}
