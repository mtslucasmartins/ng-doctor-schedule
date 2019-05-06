import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { User } from 'src/app/models/User';
import { Clinic } from 'src/app/models/Clinic';
import { SignUpService } from 'src/app/services/signup/signup.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up-component',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  public formSignUp: FormGroup;

  public organizationName: string;
  public organizationCNPJ: string;
  public organizationCNPJWarning: string;

  public fullname: string;
  public email: string;

  public firstName: string;
  public lastName: string;

  public password: string;
  public passwordConfirm: string;

  constructor(private fb: FormBuilder, private router: Router, private signupService: SignUpService) {
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
          clinic: new Clinic({
            cnpj: that.formSignUp.get(['clinic', 'cnpj']).value,
            description: that.formSignUp.get(['clinic', 'description']).value
          })
        });
        that.signupService.signup(user).subscribe(
          (response: any) => {
            if (response.status === 'success') {
              // this.router.navigate(['/sign-in', user.email]);
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
                if (body.field) {
                  switch (body.field) {
                    case 'clinic.cnpj':
                      that.formSignUp.get(['clinic', 'cnpj']).setErrors({ incorrect: body.message });
                      break;
                  }
                }
                console.log(JSON.stringify(error.error));
              }
            }
          });
      } else {
        reject('As senhas não coincidem!');
      }
    });
  }

  ngOnInit() {
    this.formSignUp = this.fb.group({
      clinic: this.fb.group({
        cnpj: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
      }),
      fullname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(6)
      ]))
    });
  }

}
