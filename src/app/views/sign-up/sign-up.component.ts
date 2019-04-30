import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-sign-up-component',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  public signUpForm: FormGroup;

  public organizationName: string;
  public organizationCNPJ: string;
  public organizationCNPJWarning: string;

  public fullname: string;
  public email: string;

  public firstName: string;
  public lastName: string;

  public password: string;
  public passwordConfirm: string;

  constructor(private fb: FormBuilder) {
  }

  public validateClinica(cnpj: string = this.organizationCNPJ) {
    if (cnpj === '') {
      // organizationCNPJWarning = 'Campo obrigatório!';
    }
  }

  ngOnInit() {
    this.signUpForm = this.fb.group({
      // user's fields
      fullname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(6)
      ]))
    });
  }

}
