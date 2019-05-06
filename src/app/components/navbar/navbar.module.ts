import { NgModule } from '@angular/core';

import { NavbarComponent } from './navbar.component';
import { AvatarModule } from '../avatar/avatar.module';
import { BrandModule } from '../brand/brand.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,

    AvatarModule,
    BrandModule
  ],
  exports: [
    NavbarComponent
  ]
})
export class NavbarModule {
}