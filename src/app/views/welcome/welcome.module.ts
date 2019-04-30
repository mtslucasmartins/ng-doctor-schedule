import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { WelcomeModuleComponent } from './welcome.component';

@NgModule({
  declarations: [
    WelcomeModuleComponent
  ],
  imports: [
    BrowserModule,
  ],
  exports: [
    WelcomeModuleComponent
  ],
  providers: []
})
export class WelcomeModule { }
