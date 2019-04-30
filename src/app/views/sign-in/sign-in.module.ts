import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';


import { SignInComponent } from './sign-in.component';

@NgModule({
  declarations: [
    SignInComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    RouterModule,

    ButtonModule,
    InputTextModule
  ],
  exports: [
    SignInComponent
  ],
  providers: []
})
export class SignInModule { }
