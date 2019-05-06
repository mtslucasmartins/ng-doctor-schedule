import { NgModule } from '@angular/core';
import { SidebarComponent } from './sidebar.component';
import { BrandModule } from '../brand/brand.module';
import { AvatarModule } from '../avatar/avatar.module';

@NgModule({
  declarations: [
    SidebarComponent
  ],
  exports: [
    SidebarComponent
  ],
  imports: [
    AvatarModule,
    BrandModule
  ]
})
export class SidebarModule {
}