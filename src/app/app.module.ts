import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';

import { HttpClientModule } from '@angular/common/http';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';

import { SignInModule } from './views/sign-in/sign-in.module';
import { SignUpModule } from './views/sign-up/sign-up.module';
import { AuthGuard } from './guards/auth/auth.guard';
import { AuthService } from './services/auth/auth.service';
import { WelcomeModule } from './views/welcome/welcome.module';
import { SidebarModule } from './components/sidebar/sidebar.module';
import { NavbarModule } from './components/navbar/navbar.module';
import { DashboardModule } from './views/dashboard/dashboard.module';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { UserModule } from './views/dashboard/users/users.module';

export function jwtTokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),

    HttpClientModule,

    JwtModule.forRoot({
      config: {
        tokenGetter: jwtTokenGetter
      }
    }),

    DashboardModule,

    SignInModule,
    SignUpModule,
    WelcomeModule,
    UserModule,
    SidebarModule,
    NavbarModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
