import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { SignUpComponent } from './sign-up.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,

    ButtonModule,
    InputTextModule
  ],
  exports: [
    SignUpComponent
  ],
  providers: []
})
export class SignUpModule { }
